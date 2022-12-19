import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const executeQuery = async (query, params) => {
  const client = new Client();
  await client.connect();

  const result = await client.queryObject(query, params);
  await client.end();

  return result;
};

export { executeQuery };
