import "dotenv/config";

export class DateController {
    constructor(dateModel) {
        this.dateModel = dateModel;
    }

    get = async (req, res) => {

        const { month, year, people } = req.body;
        const experienceId = req.params.experienceId;
        const [returnState, dates] = await this.dateModel.get(Number(experienceId), month, year, Number(people));
        if (returnState === 1) {
            return res.status(200).json(dates);
        }

        return res.status(500).json({ error: "Dates could not be retrieved!" })
    };
}