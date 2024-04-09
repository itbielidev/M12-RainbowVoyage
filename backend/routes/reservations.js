import { Router } from "express";
import { ReservationController } from "../controllers/ReservationController.js";
import { authenticateToken } from "../middlewares/token.js";

export const createReservationRouter = (reservationModel) => {
    const reservationRouter = Router();

    const reservationController = new ReservationController(reservationModel);

    reservationRouter.get("/", reservationController.getAll);
    reservationRouter.post("/", authenticateToken, reservationController.create);

    return reservationRouter;
};