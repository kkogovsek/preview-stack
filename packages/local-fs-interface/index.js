const http = require("http");
const fs = require("fs/promises");

const readRequestBody = (req) => {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
      resolve(body);
    });
  });
};

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  try {
    if (req.method === "POST") {
      const payload = await readRequestBody(req);
      const url = new URL(req.url, `http://${req.headers.host}`);
      await fs.writeFile(url.pathname, payload, "utf-8");
      res.statusCode = 204;
      return res.end();
    }
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    res.statusCode = 400;
    res.end();
  }
});
server.listen(7331, "localhost");
