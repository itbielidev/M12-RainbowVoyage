import { Router } from "express";
import { ReservationController } from "../controllers/ReservationController.js";

export const createReservationRouter = (reservationModel) => {
    const reservationRouter = Router();

    const reservationController = new ReservationController(reservationModel);

    reservationRouter.get("/", reservationController.getAll);


    return reservationRouter;
};