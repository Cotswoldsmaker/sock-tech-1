import { waitSetTime, sendEmailFlow } from "../src/flows";
import { sendEmail } from "../src/email";
import { logToFile } from "../src/log";

jest.mock("../src/email");
jest.mock("../src/log");

/**
 * Ideally I would have wanted to test:
 * runFlow
 * delay
 * websiteSignup
 * socksPurchased
 *
 * But I ran out of time to do so.
 */

describe("waitSetTime", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return 'Invalid waitTime: not a number' when minutes is not a number", async () => {
    const result = await waitSetTime({ minutes: "abc" });

    expect(result).toBe("Invalid waitTime: not a number");
    expect(logToFile).not.toHaveBeenCalled();
  });

  it("should return 'waited X minutes' when minutes is a valid number", async () => {
    const setTimeoutSpy = jest.spyOn(global, "setTimeout");

    const waitSetTimePromise = waitSetTime({ minutes: "5" });

    jest.runAllTimers();

    const result = await waitSetTimePromise;

    expect(result).toBe("waited 5 minutes");
    expect(logToFile).toHaveBeenCalledWith("waitSetTime called with 5 minutes");
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 5 * 60000);

    setTimeoutSpy.mockRestore();
  });
});

describe("sendEmailFlow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 'sent' when email is sent successfully", async () => {
    (sendEmail as jest.Mock).mockResolvedValue(true);

    const result = await sendEmailFlow({});

    expect(result).toBe("sent");
    expect(logToFile).toHaveBeenCalledWith("sent");
    expect(sendEmail).toHaveBeenCalled();
  });

  it("should return 'failed' when email fails to send", async () => {
    (sendEmail as jest.Mock).mockResolvedValue(false);

    const result = await sendEmailFlow({});

    expect(result).toBe("failed");
    expect(logToFile).toHaveBeenCalledWith("failed");
    expect(sendEmail).toHaveBeenCalled();
  });
});
