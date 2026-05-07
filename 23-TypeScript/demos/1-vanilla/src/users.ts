// src/users.ts
import { User } from "./types";

export const users: User[] = [
  {
    id: 1,
    name: "Alex",
    email: "alex@email.com",
    isActive: true,
    loginCount: 42
  },
  {
    id: 2,
    name: "Sam",
    email: "sam@email.com",
    isActive: false,
    loginCount: 1
  }
];
