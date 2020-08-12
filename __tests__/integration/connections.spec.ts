import database from "../../src/database/connection";
import { agent as request } from "supertest";
import app from "../../src/app";

describe("Connections", () => {
  beforeAll(async () => {
    return await database.migrate.latest();
  });
  it("Should be return total of connections", async () => {
    const response = await request(app).get("/connections").send();
    const totalConnections = { total: "0" };
    expect(response.body).toEqual(
      expect.objectContaining({
        total: expect.any(String),
      })
    );
  });
  afterEach(async () => {
    return await database.migrate.rollback();
  });
});
