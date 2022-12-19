import { executeQuery } from "../database/database.js";

const addUrl = async (url, string) => {
  await executeQuery(
    "INSERT INTO shortenurls (url, string) VALUES ($url, $string)",
    { url: url, string: string },
  );
};

const findUrl = async (string) => {tel
  const response = await executeQuery(
    "SELECT (url) FROM shortenurls WHERE string = $string",
    { string: string },
  );
  return response.rows[0].url;
};
export { addUrl, findUrl };
