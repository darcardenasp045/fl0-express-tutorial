import express from "express";
import * as db from "./db/index.js";

const app = express();
// Important! Set the port using the PORT environment variable
const port = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/contacts", async (req, res) => {
  const result = await db.query("SELECT * FROM contacts");
  res.send(result.rows);
});

await db.bootstrap();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});