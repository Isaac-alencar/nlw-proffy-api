import database from "../../src/database/connection";
import { agent as request } from "supertest";
import app from "../../src/app";

describe("Users and Connections", () => {
  beforeAll(async () => {
    return await database.migrate.latest();
  });
  it("Should be create new class with new user and schedule", async () => {
    const user = {
      name: "Isaac Alencar",
      avatar: "https://github.com/Isaac-alencar.png",
      whatsapp: "86999656839",
      bio:
        "Se existe alguma linguagem capaz de descrever o universo, ela com certeza seria Matemática",
      subject: "Matemática",
      cost: 100,
      schedule: [
        { week_day: 2, from: "10:30", to: "13:00" },
        { week_day: 3, from: "8:30", to: "11:00" },
        { week_day: 5, from: "9:30", to: "16:00" },
      ],
    };
    const response = await request(app).post("/classes").send(user);
    expect(response.status).toBe(201);
  });
  it("Should be return a class when user send valid parameters on search for a class ", async () => {
    const filteredClass = {
      week_day: 5,
      subject: "Matemática",
      time: "10:30",
    };
    const classExpcted = [
      {
        id: expect.any(Number),
        subject: expect.any(String),
        cost: expect.any(String),
        user_id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String),
        whatsapp: expect.any(String),
        bio: expect.any(String),
      },
    ];
    const response = await request(app).get("/classes").query(filteredClass);
    expect(response.body).toEqual(classExpcted);
  });
  it("Should be create a new connection of student and proffy", async () => {
    const user_id = 1;
    const response = await request(app).post("/connections").send({
      user_id,
    });
    expect(response.status).toBe(201);
  });
  afterAll(async () => {
    return await database.migrate.rollback();
  });
});
