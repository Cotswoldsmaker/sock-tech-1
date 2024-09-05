import fs from "fs";
import path from "path";

/**
 * This function logs a message to a file.
 * @param message
 */
export const logToFile = (message: string): void => {
  const logDir = path.join(__dirname, "..", "log");
  const logFile = path.join(logDir, "flow_log.txt");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  fs.appendFileSync(logFile, `${new Date().toISOString()} - ${message}\n`);
};
