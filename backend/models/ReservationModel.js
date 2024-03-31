import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prismadb = new PrismaClient();

export class ReservationModel {

    static async getAll() {
        try {

        } catch (error) {
            console.error(error);
        }
    }

}