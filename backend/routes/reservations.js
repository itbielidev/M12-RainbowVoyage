import { Router } from "express";
import { ReservationController } from "../controllers/ReservationController.js";
import { authenticateToken } from "../middlewares/token.js";

export const createReservationRouter = (reservationModel) => {
    const reservationRouter = Router();

    const reservationController = new ReservationController(reservationModel);

    reservationRouter.get("/", authenticateToken, reservationController.getAll);
    reservationRouter.get("/user", authenticateToken, reservationController.getByUser);
    reservationRouter.get("/sendEmail/:reservationId", authenticateToken, reservationController.sendEmail);
    reservationRouter.get("/:reservationId", authenticateToken, reservationController.find);
    reservationRouter.post("/:experienceId", authenticateToken, reservationController.create);


    return reservationRouter;
};