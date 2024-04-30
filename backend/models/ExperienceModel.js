import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prismadb = new PrismaClient();

export class ExperienceModel {

    static async get(cityID, filters) {
        try {
            let experiences = await prismadb.experience.findMany({
                where: {
                    city_id: cityID
                }
            })


            //Apply filters in query
            const duration_max = Number(filters.duration_max);
            const duration_min = Number(filters.duration_min);
            const num_people_max = Number(filters.num_people_max);
            const num_people_min = Number(filters.num_people_min);
            const type = filters.type;
            const price_max = Number(filters.price_max) || 1300
            const price_min = Number(filters.price_min) || 650

            experiences = experiences
                .filter(experience => experience.duration >= duration_min && experience.duration <= duration_max)
                .filter(experience => experience.num_people >= num_people_min && experience.num_people <= num_people_max)
                .filter(experience => experience.price >= price_min && experience.price <= price_max)

            if (type !== "all") {
                experiences = experiences.filter(experience => experience.type === type)
            }

            return experiences;
        } catch (error) {
            console.error(error);
        }
    }

    static async find(experienceId) {
        try {
            const experience = await prismadb.experience.findFirst({
                where: {
                    id: experienceId
                },
                include: {
                    city: true
                }
            })
            return experience;
        } catch (error) {
            console.error(error);
        }
    }

}