import "dotenv/config";

export class CityController {
  constructor(cityModel) {
    this.cityModel = cityModel;
  }

  getAll = async (req, res) => {
    const cities = await this.cityModel.getAll();
    return res.status(200).json({ cities });
  };
}