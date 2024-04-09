import { PrismaClient, ReservationState } from "@prisma/client";
import "dotenv/config";

const prismadb = new PrismaClient();

export class ReservationModel {

    static async getAll() {
        try {
        } catch (error) {
            console.log(error);
        }
    }

    static async create(userId, bodyData) {
        try {

            const { numPeople, experienceId } = bodyData;
            const dateCreation = new Date();
            //Store new pending reservation in database.
            const newReservation = await prismadb.reservation.create({
                data: {
                    user_id: userId,
                    date_creation: dateCreation,
                    state: ReservationState.pending,
                    num_people: Number(numPeople),
                    experience_id: Number(experienceId)
                }
            })

            //Update date availability for 


            return 1;

        } catch (error) {
            console.log(error);
        }
    }

}