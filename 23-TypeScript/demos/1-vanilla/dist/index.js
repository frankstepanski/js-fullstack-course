"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const users_1 = require("./users");
const utils_1 = require("./utils");
for (const user of users_1.users) {
    const status = (0, utils_1.getAccountStatus)(user);
    const label = (0, utils_1.formatUser)(user);
    console.log(`${label} → ${status}`);
}
