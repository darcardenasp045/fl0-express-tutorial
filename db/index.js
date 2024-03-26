import pg from "pg";
import fs from "fs";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

export const bootstrap = async () => {
  // Create the 'contacts' table if it doesn't exist yet
  await query(`
    create table IF NOT EXISTS contacts (
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(50),
        phone VARCHAR(50)
    );`);

  // Bootstrap the 'contacts' table with sample data if it is empty
  const contacts = await query("SELECT * from contacts");
  if (!contacts.rowCount) {
    console.log("Bootstrapping database");
    const data = fs.readFileSync("db/data.sql");
    await query(data.toString("utf-8"));
  }
};

export const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};