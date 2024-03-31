import "dotenv/config";

export class ReservationController {
    constructor(reservationModel) {
        this.reservationModel = reservationModel;
    }

    getAll = async (req, res) => {
        // const cities = await this.cityModel.getAll();
        // return res.status(200).json({ cities });
    };
}