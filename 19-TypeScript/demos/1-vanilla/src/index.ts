// src/index.ts
import { users } from "./users";
import { getAccountStatus, formatUser } from "./utils";

for (const user of users) {
  const status = getAccountStatus(user);
  const label = formatUser(user);

  console.log(`${label} → ${status}`);
}
