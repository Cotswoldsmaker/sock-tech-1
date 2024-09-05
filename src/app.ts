import express, { Application } from "express";
import path from "path";
import fs from "fs";

export const app: Application = express();
const port = 3000;
const parentDir = path.join(__dirname, "../");
let content: { [key: string]: string | string[] } = {};
let processesResults: string[] = [];

app.set("view engine", "ejs");
app.set("views", path.join(parentDir, "views"));

app.get("/", (req, res): void => {
  res.render("index", content);
});

app.post("/flow/:flow_name", (req, res): void => {
  const flowName = req.params.flow_name;

  const filePath: string = path.join(__dirname, `../flows/${flowName}.json`);
  const rawData: string = fs.readFileSync(filePath, "utf-8");
  const processConfig: { [key: string]: any } = JSON.parse(rawData);
  res.json({ result: `hi, ${JSON.stringify(processConfig)}` });
});

export const server = app.listen(port, () => {
  console.log(
    `Ctrl/Cmd and click here to open browser: http://localhost:${port}`
  );
});
