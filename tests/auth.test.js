const { userModel } = require("../models/user.model");
const { connect } = require("./db.test");
const app = require("../index");
const request = require("supertest");

describe("Authenticate: Signup", () => {
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
        firstName: "john",
        lastName: "doe",
        email: "johndoe@gmail.com",
      });

    expect(res.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("username", "johndoe");
    expect(response.body.user).toHaveProperty("firstname", "john");
    expect(response.body.user).toHaveProperty("lastname", "doe");
    expect(response.body.user).toHaveProperty("email", "johndoe@gmail.com");
  });
  it("should login a user", async () => {
    const user = await userModel.create({
      username: "johndoe",
      password: "johndoe1234",
      firstName: "john",
      lastName: "doe",
      email: "johndoe@gmail.com",
    });

    const response = await request(app)
      .post("/signin")
      .set("content-type", "application/json")
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
