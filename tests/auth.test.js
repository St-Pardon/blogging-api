const { userModel } = require("../models/user.model");
const { connect } = require("./db");
const app = require("../app");
const request = require("supertest");

describe("Authenticate: Signup and Signin", () => {
  let dbconnect;

  beforeAll(async () => {
    dbconnect = await connect();
  });

  afterEach(async () => {
    await dbconnect.cleanup();
  });

  afterAll(async () => {
    await dbconnect.disconnect();
  });

  it("Should signup a user", async () => {
    const res = await request(app)
      .post("/signup")
      .set("content-type", "application/json")
      .send({
        username: "johndoe",
        password: "johndoe1234",
        first_name: "john",
        last_name: "doe",
        email: "johndoe@gmail.com",
      });

    expect(res.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("username", "johndoe");
    expect(response.body.user).toHaveProperty("first_name", "john");
    expect(response.body.user).toHaveProperty("last_name", "doe");
    expect(response.body.user).toHaveProperty("email", "johndoe@gmail.com");
  });
  it("should signup and signin a user", async () => {
    await userModel.create({
      username: "johndoe1",
      password: "johndoe1234",
      first_name: "john",
      last_name: "doe",
      email: "johndoe1@gmail.com",
    });

    const response = await request(app)
      .post("/signin")
      .set("content-type", "application/json")
      .send({
        email: "johndoe1@gmail.com",
        password: "johndoe1234"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});

