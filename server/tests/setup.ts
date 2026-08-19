import "tsx/cjs";

/**
 * Runs once before every test file.
 *
 * Our server validates Supabase env vars at import time (config/env.ts).
 * Tests never hit the real database, but modules still load — so we provide
 * dummy values here.
 */
process.env.NODE_ENV = "test";
process.env.SUPABASE_URL ??= "http://127.0.0.1:54321";
process.env.SUPABASE_SECRET_KEY ??= "test-secret-key";
