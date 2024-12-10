const CreateNutritionService = require("../services/CreateNutritionService");
const dotenv = require("dotenv");

dotenv.config();

class CreateNutritionController {
  async handle(req, res) {
    const { name, weight, height, age, gender, objective, level } = req.body;

    if (
      !name ||
      !weight ||
      !height ||
      !age ||
      !gender ||
      !objective ||
      !level
    ) {
      return res
        .status(400)
        .json({ error: "Todos os parâmetros são obrigatórios." });
    }

    const createNutrition = new CreateNutritionService();

    try {
      const nutrition = await createNutrition.execute({
        name,
        weight,
        height,
        age,
        gender,
        objective,
        level,
      });
      res.json(nutrition);
    } catch (error) {
      console.error("Erro ao criar dieta:", error);
      res
        .status(500)
        .json({ error: error.message || "Erro interno no servidor." });
    }
  }
}

module.exports = CreateNutritionController;
