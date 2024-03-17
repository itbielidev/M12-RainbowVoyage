import { Router } from "express";
import { CityController } from "../controllers/CityController.js";

export const createCityRouter = (cityModel) => {
  const cityRouter = Router();

  const cityController = new CityController(cityModel);

  cityRouter.get("/", cityController.getAll);

  return cityRouter;
};