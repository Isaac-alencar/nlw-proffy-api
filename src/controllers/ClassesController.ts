import { Request, Response } from "express";
import database from "../database/connection";
import convertHoursToMinuts from "../utils/convertHoursToMinutes";
/**
 * Representando como deve ser o formato do dado recebido, para realizar o map
 */
interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}
class ClassesController {
  async index(req: Request, res: Response) {
    const { week_day, subject, time } = req.query;
    try {
      if (!week_day || !subject || !time) {
        return res
          .status(400)
          .json({ error: "Missing filtrers to search classes" });
      }

      const timeInMinutes = convertHoursToMinuts(time as string);

      /**
       * Fazendo os filtros necesários, pois a listagem de classes será de acordo com os filtros
       * aplicados pelo usuário: matéria, horário e dia da semana;
       */

      /**
       * O where exists faz uma espécie de condicional. Se o que está sendo buscado existir
       * a query em seguida, será exibida, caso contrário retornará um [];
       */
      const classes = await database("classes")
        .whereExists(function () {
          this.select("class_schedule.*")
            .from("class_schedule")
            .whereRaw("class_schedule.class_id = classes.id")
            .whereRaw("class_schedule.week_day = ??", [Number(week_day)])
            .whereRaw("class_schedule.from <= ??", [timeInMinutes])
            .whereRaw("class_schedule.to > ??", [timeInMinutes]);
        })
        .where("classes.subject" as any, "=", subject as string)
        .join("users", "classes.user_id", "=", "users.id")
        .select(["classes.*", "users.*"]);

      return res.json(classes);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Unexpect error at list classes",
      });
    }
  }
  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    /**
     * Utilizando transaction para que, caso alugma ação que está sendo realizada no banco,
     * der errado, nehuma outra vai ser salva até que o erro seja corrigido.
     */
    const trx = await database.transaction();

    try {
      /**
       * Aqui foi necessário transformar numa constante para que mais adiante
       * seja possível recuperar o id so usuário inserido, sem precisar de uma
       * nova query de select. E como a função insert retorna uma lista de id's
       * podemos usar a posição 0 do array que será o usuário inserido no banco
       */
      const insertedUsers = await trx("users")
        .insert({
          name,
          avatar,
          whatsapp,
          bio,
        })
        .returning("id");

      const user_id = insertedUsers[0]; //Recuperando o id do usuário para usar como FK na tabela classes

      const isertedClasses = await trx("classes")
        .insert({
          subject,
          cost,
          user_id,
        })
        .returning("id");

      const class_id = isertedClasses[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHoursToMinuts(scheduleItem.from),
          to: convertHoursToMinuts(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      console.log(err);
      await trx.rollback();
      res.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }
}

export default new ClassesController();
