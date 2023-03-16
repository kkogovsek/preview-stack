const http = require("http");
const fs = require("fs/promises");
const path = require("path");

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

const ignoreList = ["node_modules", "dist", ".git"];
async function traverseFileTree(pathName) {
  const stat = await fs.stat(pathName);
  if (stat.isDirectory()) {
    const fileNames = await fs.readdir(pathName);
    const files = await Promise.all(
      fileNames
        .filter((el) => !ignoreList.includes(el))
        .map((file) => traverseFileTree(path.join(pathName, file)))
    );
    return {
      [path.basename(pathName)]: {
        directory: files.reduce(
          (fileSystem, entry) => Object.assign(fileSystem, entry),
          {}
        ),
      },
    };
  }
  return {
    [path.basename(pathName)]: {
      file: { contents: await fs.readFile(pathName, "utf-8") },
    },
  };
}

const projectRoot = path.resolve(__dirname, "../../");

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "GET") {
    if (url.pathname === "/") {
      res.statusCode = 200;
      res.write(
        JSON.stringify(
          await traverseFileTree(projectRoot).then(
            (res) => res[path.basename(projectRoot)].directory
          )
        )
      );
      return res.end();
    }
    res.statusCode = 200;
    res.write(JSON.stringify({ pathname: url.pathname }));
    return res.end();
  }
  try {
    if (req.method === "POST") {
      const payload = await readRequestBody(req);
      if (!url.pathname.startsWith(projectRoot)) {
        res.statusCode = 403;
        res.write(`Shouldn't modify files outside of project`);
        return res.end();
      }
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
server.listen(7331, "localhost", () => {});
console.log("Listening on:", `http://localhost:7331/`);
