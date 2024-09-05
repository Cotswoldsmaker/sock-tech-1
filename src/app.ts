import express, { Application } from "express";
import path from "path";
import fs from "fs";
import { runFlow } from "./flows";

const AWAIT_PROMISE = true;

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

app.post("/flow/:flow_name", async (req, res): Promise<void> => {
  const flowName = req.params.flow_name;

  const filePath: string = path.join(__dirname, `../flows/${flowName}.json`);
  const rawData: string = fs.readFileSync(filePath, "utf-8");
  const processConfig: { [key: string]: any } = JSON.parse(rawData);
  let runFlowResult: string = "";

  async function executeFlow() {
    try {
      runFlowResult = await runFlow(processConfig);
    } catch (error) {
      console.error("Error running flow:", error);
      runFlowResult = "Error running flow";
    }
  }
  if (AWAIT_PROMISE) {
    await executeFlow();
  } else {
    executeFlow();
    runFlowResult =
      "Flow started and still pending. " +
      "Browser will not update with results. " +
      "Please monitor in console";
  }

  res.json({
    result: `Flow results: ${runFlowResult}`,
  });
});

export const server = app.listen(port, () => {
  console.log(
    `Ctrl/Cmd and click here to open browser: http://localhost:${port}`
  );
});
