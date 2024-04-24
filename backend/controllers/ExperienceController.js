import "dotenv/config";

export class ExperienceController {
  constructor(experienceModel) {
    this.experienceModel = experienceModel;
  }

  get = async (req, res) => {

    const cityId = req.params.cityId;

    const experiences = await this.experienceModel.get(Number(cityId), req.query);

    return res.status(200).json(experiences);
  };

  find = async (req, res) => {
    const experienceId = req.params.experienceId;
    const experience = await this.experienceModel.find(Number(experienceId));
    return res.status(200).json(experience);
  };
}