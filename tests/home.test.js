const app = require("../app");
const supertest = require("supertest");

describe("Get the welcome message", () => {
  it("Returns the homepage", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
  });
});
