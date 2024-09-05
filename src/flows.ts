import { logToFile } from "./log";
import { sendEmail } from "./email";

export const runFlow = async (flow: {
  [key: string]: any;
}): Promise<string> => {
  let flowResults: string = "";

  for (const step of flow.steps) {
    const functionName = step.step;
    const func = flowMap[functionName];
    let arg = step.arg;
    if (arg === undefined) {
      arg = {};
    }

    try {
      const result = await func(arg);
      flowResults += `${functionName} - ${result}, `;
      console.log(result);
    } catch {
      console.error(`Function "${functionName}" not found`);
      flowResults += `${functionName} - Function not found, `;
    }
  }
  if (flowResults.endsWith(", ")) {
    flowResults = flowResults.slice(0, -2);
  }

  return flowResults;
};

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const websiteSignup = async (arg: {
  [key: string]: string;
}): Promise<string> => {
  logToFile("websiteSignup called");
  await delay(1000); // Simulate async operation
  return "success";
};

export const socksPurchased = async (arg: {
  [key: string]: string;
}): Promise<string> => {
  logToFile("websiteSignup called");
  await delay(1000); // Simulate async operation
  return "success";
};

export const waitSetTime = async (arg: {
  [key: string]: string;
}): Promise<string> => {
  let waitTime: number = 0;
  if (isNaN(Number(arg["minutes"]))) {
    return "Invalid waitTime: not a number";
  } else {
    waitTime = Number(arg["minutes"]);
  }

  logToFile(`waitSetTime called with ${waitTime} minutes`);
  await delay(waitTime * 60000);

  return `waited ${waitTime} minutes`;
};

export const sendEmailFlow = async (arg: {
  [key: string]: string;
}): Promise<string> => {
  logToFile("email called");
  const emailSent: Boolean = await sendEmail();

  if (emailSent) {
    return "sent";
  } else {
    return "failed";
  }
};

export const flowMap: {
  [key: string]: (arg: { [key: string]: string }) => Promise<string>;
} = {
  websiteSignup,
  socksPurchased,
  waitSetTime,
  sendEmailFlow,
};
