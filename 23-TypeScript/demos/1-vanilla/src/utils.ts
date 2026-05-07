// src/utils.ts
import { User, AccountStatus } from "./types";

export function getAccountStatus(user: User): AccountStatus {
  if (!user.isActive) return "inactive";
  if (user.loginCount < 5) return "new";
  return "active";
}

export function formatUser(user: User): string {
  return `${user.name} (${user.email})`;
}
