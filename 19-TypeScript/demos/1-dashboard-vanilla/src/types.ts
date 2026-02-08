// src/types.ts
export type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  loginCount: number;
};

export type AccountStatus = "new" | "active" | "inactive";
