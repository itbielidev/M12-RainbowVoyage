import { Router } from "express";
import { DateController } from "../controllers/DateController.js";

export const createDateRouter = (dateModel) => {
    const dateRouter = Router();

    const dateController = new DateController(dateModel);

    dateRouter.post("/:experienceId", dateController.get);


    return dateRouter;
};