import { Pool } from 'pg';
import type { QueryResult, QueryResultRow } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

const query = {
  query: async (
    text: string,
    params?: Array<string | number>
  ): Promise<QueryResult<QueryResultRow>> =>
    pool.query<QueryResultRow, Array<string | number>>(text, params),
};

export default query;
