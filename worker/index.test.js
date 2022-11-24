const { unstable_dev } = require("wrangler");
const { loginForm } = require("./functions/response");
require("isomorphic-fetch");

describe("CloudFlare Worker from wrangler package", () => {
  let worker;

  beforeAll(async () => {
    worker = await unstable_dev(
      "worker/index.js",
      {},
      { disableExperimentalWarning: true }
    );
  });

  afterAll(async () => {
    if (worker) await worker.stop();
  });

  describe("GET fetch", () => {
    let resp;
    beforeAll(async () => {
      resp = await worker.fetch();
    });

    test("response status should be 200", () => {
      const status = resp.status;
      expect(status).toBe(200);
    });

    test("response content-type should be text/html", () => {
      const contentType = resp.headers.get("Content-Type");
      expect(contentType).toMatch(/text\/html/);
    });

    test("response text should be the login form", async () => {
      const text = await resp.text();
      expect(text).toBe(loginForm());
    });
  });
});
