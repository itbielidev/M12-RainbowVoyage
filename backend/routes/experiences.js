import { Router } from "express";
import { CityController } from "../controllers/CityController.js";
import { ExperienceController } from "../controllers/ExperienceController.js";

export const createExperienceRouter = (experienceModel) => {
  const experienceRouter = Router();

  const experienceController = new ExperienceController(experienceModel);

  experienceRouter.get("/:cityId", experienceController.get);
  experienceRouter.get("/detail/:experienceId", experienceController.find);

  return experienceRouter;
};