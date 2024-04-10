import { PrismaClient, ReservationState } from "@prisma/client";
import "dotenv/config";

const prismadb = new PrismaClient();

export class ReservationModel {

    static async getAll(userName, reservationState) {
        try {

            let reservations = [];

            if (userName.length === 0) {
                reservations = await prismadb.reservation.findMany({
                    where: {
                        state: reservationState
                    },
                    include: {
                        experience: true,
                        user: true
                    }
                });

            }
            else {
                reservations = await prismadb.reservation.findMany({
                    where: {
                        state: reservationState,
                        name: {
                            startsWith: userName,
                            mode: "insensitive"
                        }
                    },
                    include: {
                        experience: true,
                        user: true
                    }
                });
            }

            return [1, reservations];
        } catch (error) {
            console.log(error);
        }
    }

    static async getByUser(userId) {
        const reservations = await prismadb.reservation.findMany({
            where: {
                user_id: userId
            },
            include: {
                user: true,
                experience: true
            }
        })

        return [1, reservations]
    }

    static async create(userId, bodyData, experienceId) {
        try {

            const { numPeople, dates, dni, phone, email, postalCode, location, address, name, lastName } = bodyData;

            let { dateId } = bodyData
            dateId = Number(dateId);

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

            const d = await prismadb.dateAvailabilty.findFirst({
                where: {
                    id: dateId
                }
            })


            const update = await prismadb.dateAvailabilty.updateMany({
                where: {
                    id: dateId
                },
                data: {
                    current_people: d.current_people + Number(numPeople) + 1
                }
            })

            return 1;

        } catch (error) {
            console.log(error);
        }
    }

}