import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prismadb = new PrismaClient();

export class ExperienceModel {

    static async get(cityID) {
        try {
            const experiences = await prismadb.experience.findMany({
                where: {
                    city_id: cityID
                }
            })
            return experiences;
        } catch (error) {
            console.error(error);
        }
    }

}