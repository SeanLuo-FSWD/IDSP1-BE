import { Request, Response, NextFunction, Router } from "express";
import AuthService from "../service/authentication.service";
import { checkAuth } from "../middleware/authentication.middleware";
import PeopleService from "../service/people.service";
import multerUpload from "../middleware/multerUpload.middleware";

class PeopleRouter {
  public path = "/people";
  public router = Router();
  private _peopleService = new PeopleService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", this.getPeople);
    this.router.get("/:userId", this.getPerson);
  }

  private getPeople = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("1111111111111111111111");
    console.log("getPeople people.router.ts");
    console.log(req.body);

    const filter = req.body;
    try {
      const result = await this._peopleService.getPeople(filter);
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  private getPerson = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.userId;
    try {
      const result = await this._peopleService.getPerson(userId);
      console.log("getPerson ppl router result");

      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default PeopleRouter;
