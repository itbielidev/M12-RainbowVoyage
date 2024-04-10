import "dotenv/config";
import { validateReservation } from '../schemas/reservations.js'

export class ReservationController {
    constructor(reservationModel) {
        this.reservationModel = reservationModel;
    }

    getAll = async (req, res) => {

        console.log(req.query.name);
        //console.log(user);

        const userName = req.query.name.toLowerCase() || '';

        const [returnState, reservations] = await this.reservationModel.getAll(userName);
        if (returnState === 1) {
            return res.status(200).json(reservations);
        }

        return res.status(500).json({ error: "Reservations could not be retrieved" })
    };

    create = async (req, res) => {

        const reservationValidated = validateReservation(req.body);

        if (!reservationValidated.success) {
            return res.status(422).json({ error: JSON.parse(reservationValidated.error.message) })
        }

        const experienceId = req.params.experienceId;
        const userId = req.user_id;

        console.log(req.body);

        const returnState = await this.reservationModel.create(userId, req.body, experienceId);

        if (returnState === 1) {
            return res.status(200).json();
        }

        return res.status(500).json({ error: "There was a problem storing the new reservation" })

    };
}