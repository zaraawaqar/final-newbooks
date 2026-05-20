// src/routes/+page.server.js
// Server-only code. Connects to Postgres. Never sent to the browser.

import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';

const sql = neon(DATABASE_URL);

// SvelteKit calls this function whenever the page is requested.
export async function load() {
  const rows = await sql`
    SELECT id, date::text AS date, description, debit, credit, amount
    FROM transactions
    ORDER BY date
  `;

  return { transactions: rows };
}

// Form actions run when a form on the page is submitted via POST.
// Form actions run when a form on the page is submitted via POST.
export const actions = {
  // Handles recording a new transaction
  create: async ({ request }) => {
    const formData = await request.formData();
    const date        = formData.get('date');
    const description = formData.get('description');
    const debit       = formData.get('debit');
    const credit      = formData.get('credit');
    const amount      = formData.get('amount');

    await sql`
      INSERT INTO transactions (date, description, debit, credit, amount)
      VALUES (${date}, ${description}, ${debit}, ${credit}, ${amount})
    `;

    return { success: true };
  },

  // Handles deleting an existing transaction
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    await sql`
      DELETE FROM transactions 
      WHERE id = ${id}
    `;

    return { success: true };
  }
};