import { Request, Response } from "express";
import database from "../database/connection";

class ConnectionController {
  async index(req: Request, res: Response) {
    const totalConnections = await database("connections").count("* as total");

    const { total } = totalConnections[0];

    return res.json({ total });
  }

  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    try {
      const user = database("users").select("*").where("id", user_id);

      if (!user) {
        return res.status(404).send().json({
          erro: "User not found",
        });
      }

      await database("connections").insert({
        user_id,
      });

      return res.status(201).send();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Unexpect error while creating new connecions",
      });
    }
  }
}

export default new ConnectionController();
