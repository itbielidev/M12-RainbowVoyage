import "dotenv/config";
import { validateReservation } from '../schemas/reservations.js'

export class ReservationController {
    constructor(reservationModel) {
        this.reservationModel = reservationModel;
    }

    getAll = async (req, res) => {
        // const cities = await this.cityModel.getAll();
        // return res.status(200).json({ cities });
    };

    create = async (req, res) => {

        const reservationValidated = validateReservation(req.body);

        if (!reservationValidated.success) {
            return res.status(422).json({ error: JSON.parse(reservationValidated.error.message) })
        }

        const userId = req.user_id;

        console.log(req.body);

        const returnState = await this.reservationModel.create(userId, req.body);

        if (returnState === 1) {
            return res.status(200).json();
        }

        return res.status(500).json({ error: "There was a problem storing the new reservation" })

    };
}