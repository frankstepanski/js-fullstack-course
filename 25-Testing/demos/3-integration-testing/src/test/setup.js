// src/test/setup.js
//
// Runs once before all tests.
//
// Three things happen here:
//
// 1. Import jest-dom — adds extra matchers like toBeInTheDocument()
//
// 2. server.listen() — starts the MSW server BEFORE any test runs
//    so that every fetch() your components make is intercepted
//
// 3. server.resetHandlers() — after each test, removes any per-test
//    handler overrides so they don't leak into the next test
//
// 4. server.close() — shuts the server down cleanly after all tests finish

import "@testing-library/jest-dom";
import { server } from "./server.js";

// Start intercepting requests before the first test
beforeAll(() => server.listen());

// Remove any per-test handler overrides after each test
// This ensures tests don't affect each other
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());
