import { Client } from 'pg';

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

// Bypass SSL certificate validation errors
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function getClient() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();
  return client;
}

let dbInitialized = false;

async function ensureTableExists(client: Client) {
  if (dbInitialized) return;
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS kv_store (
        key TEXT PRIMARY KEY,
        value TEXT
      );
    `);
    dbInitialized = true;
  } catch (err) {
    console.error("Failed to initialize database table kv_store:", err);
  }
}

export async function kvGet(key: string): Promise<any | null> {
  if (!connectionString) {
    console.warn("PostgreSQL connection string is not defined.");
    return null;
  }
  const client = await getClient();
  try {
    await ensureTableExists(client);
    const res = await client.query('SELECT value FROM kv_store WHERE key = $1', [key]);
    if (res.rows.length === 0) return null;
    const val = res.rows[0].value;
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  } catch (error) {
    console.error("Database GET Error:", error);
    return null;
  } finally {
    await client.end();
  }
}

export async function kvSet(key: string, value: any): Promise<boolean> {
  if (!connectionString) {
    console.warn("PostgreSQL connection string is not defined.");
    return false;
  }
  const client = await getClient();
  try {
    await ensureTableExists(client);
    const stringified = typeof value === "string" ? value : JSON.stringify(value);
    await client.query(`
      INSERT INTO kv_store (key, value)
      VALUES ($1, $2)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `, [key, stringified]);
    return true;
  } catch (error) {
    console.error("Database SET Error:", error);
    return false;
  } finally {
    await client.end();
  }
}

export async function kvDel(key: string): Promise<boolean> {
  if (!connectionString) {
    console.warn("PostgreSQL connection string is not defined.");
    return false;
  }
  const client = await getClient();
  try {
    await ensureTableExists(client);
    const res = await client.query('DELETE FROM kv_store WHERE key = $1', [key]);
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error("Database DEL Error:", error);
    return false;
  } finally {
    await client.end();
  }
}

export function isKvEnabled(): boolean {
  return !!connectionString;
}
