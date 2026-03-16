/*
  auth.js
  -------
  This file simulates authentication logic.

  In a REAL app:
  - login() would call a backend API
  - token/session would be returned
  - token would be stored securely
*/

const AUTH_KEY = "auth";

/* Fake credential check */
export function authenticate(username, password) {
  return username === "admin" && password === "password";
}

/* Persist auth */
export function saveAuth() {
  localStorage.setItem(AUTH_KEY, "true");
}

/* Clear auth */
export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

/* Read persisted auth */
export function getStoredAuth() {
  return localStorage.getItem(AUTH_KEY) === "true";
}
