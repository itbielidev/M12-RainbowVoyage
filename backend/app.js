import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import { createUserRouter } from "./routes/users.js";
import { createExperienceRouter } from "./routes/experiences.js";
import { createCityRouter } from "./routes/cities.js";
import { createReservationRouter } from "./routes/reservations.js";
import { createDateRouter } from "./routes/dates.js";

import { UserModel } from './models/UserModel.js';
import { ExperienceModel } from './models/ExperienceModel.js';
import { CityModel } from './models/CityModel.js';
import { ReservationModel } from './models/ReservationModel.js';
import { DateModel } from './models/DateModel.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/users", createUserRouter(UserModel));
app.use("/cities", createCityRouter(CityModel));
app.use("/experiences", createExperienceRouter(ExperienceModel));
app.use("/reservations", createReservationRouter(ReservationModel));
app.use("/dates", createDateRouter(DateModel));


const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
    res.send("<h2>All set!</h2>");
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});

/* NO TOCAR - SINO FALLA EL VERCEL  */
export default app
