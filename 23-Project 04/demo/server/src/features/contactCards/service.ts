/*
  features/contactCards/service.ts

  Column mapping (snake_case DB → camelCase API):
    address_lines → addressLines
    phone_display → phoneDisplay
    phone_href    → phoneHref
    email_display → emailDisplay
    email_href    → emailHref

  JSONB columns (address_lines, paragraphs, actions) are automatically
  parsed into JS arrays/objects by the pg driver.
*/

import pool from "../../db/pool.js";

type ContactCardRow = {
  id:            string;
  type:          string | null;
  title:         string | null;
  address_lines: string[] | null;
  phone_display: string | null;
  phone_href:    string | null;
  email_display: string | null;
  email_href:    string | null;
  paragraphs:    string[] | null;
  actions:       { kind: string; label: string; href: string }[] | null;
};

type ContactCard = {
  id:           string;
  type:         string | null;
  title:        string | null;
  addressLines: string[] | null;
  phoneDisplay: string | null;
  phoneHref:    string | null;
  emailDisplay: string | null;
  emailHref:    string | null;
  paragraphs:   string[] | null;
  actions:      { kind: string; label: string; href: string }[] | null;
};

function toApiShape(row: ContactCardRow): ContactCard {
  return {
    id:           row.id,
    type:         row.type,
    title:        row.title,
    addressLines: row.address_lines,
    phoneDisplay: row.phone_display,
    phoneHref:    row.phone_href,
    emailDisplay: row.email_display,
    emailHref:    row.email_href,
    paragraphs:   row.paragraphs,
    actions:      row.actions,
  };
}

export async function getAllContactCards() {
  const { rows } = await pool.query<ContactCardRow>("SELECT * FROM contact_cards ORDER BY id");
  return rows.map(toApiShape);
}