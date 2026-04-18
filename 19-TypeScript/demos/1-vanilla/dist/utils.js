"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountStatus = getAccountStatus;
exports.formatUser = formatUser;
function getAccountStatus(user) {
    if (!user.isActive)
        return "inactive";
    if (user.loginCount < 5)
        return "new";
    return "active";
}
function formatUser(user) {
    return `${user.name} (${user.email})`;
}
