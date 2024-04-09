import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prismadb = new PrismaClient();

export class DateModel {

    static async get(experienceId, month, year, people) {
        try {
            const dates = await prismadb.dateAvailabilty.findMany({
                where: {
                    month: month,
                    year: year,
                    max_people: {
                        gte: people
                    },
                    experience_id: experienceId
                }
            });

            return [1, dates];
        } catch (error) {
            console.log(error);
        }
    }

}