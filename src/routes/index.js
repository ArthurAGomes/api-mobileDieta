const express = require("express");
const CreateNutritionController = require("../controllers/CreateNutritionController");

const router = express.Router();
const createNutritionController = new CreateNutritionController();

router.get("/teste", (req, res) => {
  console.log("Rota chamada");
  res.json({ ok: true });
});

router.post("/create", (req, res) => {
  createNutritionController.handle(req, res);
});

module.exports = router;
