// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { query } from '$lib/db';

export const load: PageServerLoad = async () => {
  const result = await query("SELECT trading_date, close FROM stock WHERE symbol = 'TSLA' AND trading_date >= '2024-06-01'");
  const data = result.map(row => ({
    trading_date: row.trading_date.toISOString(),
    close: parseFloat(row.close)
  }));
  // console.log(`Request at ${new Date().toISOString()}:`, JSON.stringify(data, null, 2));
  // return { props: { data } };
  console.log(data);
  return {data} ;
};
