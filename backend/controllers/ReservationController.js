import "dotenv/config";
import { validateReservation } from '../schemas/reservations.js'
import nodemailer from 'nodemailer';
export class ReservationController {
    constructor(reservationModel) {
        this.reservationModel = reservationModel;
    }

    getAll = async (req, res) => {
        const userName = req.query.name.toLowerCase() || '';
        const reservationState = req.query.state;

        const [returnState, reservations] = await this.reservationModel.getAll(userName, reservationState);

        if (returnState === 1) {
            return res.status(200).json(reservations);
        }

        return res.status(500).json({ error: "Reservations could not be retrieved" })
    };

    getByUser = async (req, res) => {
        const userId = req.user_id;
        const [returnState, reservations] = await this.reservationModel.getByUser(userId);

        if (returnState === 1) {
            return res.status(200).json(reservations);
        }

        return res.status(500).json({ error: "Reservations could not be retrieved" })

    }

    find = async (req, res) => {

        const reservationId = Number(req.params.reservationId);

        const [returnState, reservation] = await this.reservationModel.find(reservationId);

        if (returnState === 1) {
            return res.status(200).json(reservation);
        }

        return res.status(500).json({ error: "There was a problem retrieving the specified reservation." })
    }

    create = async (req, res) => {

        const reservationValidated = validateReservation(req.body);

        if (!reservationValidated.success) {
            return res.status(422).json({ error: JSON.parse(reservationValidated.error.message) })
        }

        const experienceId = req.params.experienceId;
        const userId = req.user_id;

        const returnState = await this.reservationModel.create(userId, req.body, experienceId);

        if (returnState === 1) {
            return res.status(200).json();
        }

        return res.status(500).json({ error: "There was a problem storing the new reservation" })

    };

    sendEmail = async (req, res) => {
        // const userId = req.user_id;
        const reservationId = Number(req.params.reservationId);
        const [returnState, mailOptions] = await this.reservationModel.sendEmail(reservationId);

        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            }
        });

        if (returnState === 1) {
            transporter.sendMail(mailOptions).then((info) => {
                return res.status(201).json(
                    {
                        msg: "Email sent",
                    }
                )
            }).catch((err) => {
                return res.status(500).json({ msg: err });
            }
            );
        }

    }
}