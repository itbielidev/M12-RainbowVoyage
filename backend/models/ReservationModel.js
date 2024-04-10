import { PrismaClient, ReservationState } from "@prisma/client";
import "dotenv/config";

const prismadb = new PrismaClient();

export class ReservationModel {

    static async getAll(userName) {
        try {

            let reservations = [];

            if (userName.length === 0) {
                reservations = await prismadb.reservation.findMany({
                    where: {
                        state: ReservationState.pending
                    }
                });

            }
            else {
                reservations = await prismadb.reservation.findMany({
                    where: {
                        state: ReservationState.pending,
                        name: {
                            contains: userName
                        }
                    }
                });
            }

            return [1, reservations];
        } catch (error) {
            console.log(error);
        }
    }

    static async create(userId, bodyData, experienceId) {
        try {

            const { numPeople, dates, dni, phone, email, postalCode, location, address, name, lastName, dateId } = bodyData;
            const dateCreation = new Date();
            //Store new pending reservation in database.
            const newReservation = await prismadb.reservation.create({
                data: {
                    user_id: userId,
                    date_creation: dateCreation,
                    state: ReservationState.pending,
                    num_people: Number(numPeople),
                    experience_id: Number(experienceId),
                    dates: dates,
                    dni: dni,
                    phone: phone,
                    reservation_email: email,
                    postal_code: postalCode,
                    city: location,
                    address: address,
                    name: name,
                    last_name: lastName
                }
            })

            //Update date availability for 


            return 1;

        } catch (error) {
            console.log(error);
        }
    }

}