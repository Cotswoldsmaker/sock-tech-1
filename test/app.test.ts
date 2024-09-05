import request from "supertest";
import { app, server } from "../src/app";
import { runFlow } from "../src/flows";

jest.mock("../src/flows");

describe("GET /", () => {
  afterAll(() => {
    server.close();
  });

  it("should render the index page with the correct content", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("SockTech Store");
  });
});

describe("POST /flow/<flow_name> API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    server.close();
  });

  it("should pass", async () => {
    // Ideally we should mock path.jon and fs.readFileSync as well, but I ran
    // out of time to do so.
    (runFlow as jest.Mock).mockResolvedValue("success");

    const response = await request(app).post("/flow/flow-1");

    expect(response.status).toBe(200);
    // The below will fail if 'AWAIT_PROMISE == false'
    expect(response.body.result).toBe("Flow results: success");
  });
});
