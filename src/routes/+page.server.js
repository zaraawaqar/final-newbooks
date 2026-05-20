// src/routes/+page.server.js
// Server-only code. Connects to Postgres. Never sent to the browser.

import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';

const sql = neon(DATABASE_URL);

// SvelteKit calls this function whenever the page is requested.
// Whatever object we return becomes available to +page.svelte as `data`.
export async function load() {
  // TODO — write a SELECT that returns ALL transactions,
  //        ordered by date (oldest first).
  // Assign the result to a variable called `rows`,
  // then return { transactions: rows }.

  const rows = await sql`
  SELECT id, date::text AS date, description, debit, credit, amount
  FROM transactions
  ORDER BY date
`;

  return { transactions: rows };
}