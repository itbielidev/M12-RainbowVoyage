import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prismadb = new PrismaClient();

export class CityModel {

    static async getAll() {
        try {
            const cities = await prismadb.city.findMany()
            return cities;
        } catch (error) {
            console.error(error);
        }
    }

}