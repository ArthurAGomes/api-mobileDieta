const { GoogleGenerativeAI } = require("@google/generative-ai");

const dotenv = require("dotenv");

dotenv.config();

class CreateNutritionService {
  async execute({ name, age, gender, height, level, objective, weight }) {
    try {
      if (
        !name ||
        !age ||
        !gender ||
        !height ||
        !weight ||
        !objective ||
        !level
      ) {
        throw new Error("Todos os parâmetros são obrigatórios.");
      }

      const genAi = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horario com horario da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propriedade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`;

      const response = await model.generateContent(prompt);

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0].text;

        const cleanedJsonText = jsonText.replace(/```json|```/g, "").trim();

        try {
          const parsedJson = JSON.parse(cleanedJsonText);
          return { data: parsedJson };
        } catch (jsonErr) {
          console.error("Erro ao converter a resposta para JSON:", jsonErr);
          throw new Error("A resposta não está no formato JSON esperado.");
        }
      } else {
        throw new Error("Não foi possível gerar a resposta da IA.");
      }
    } catch (err) {
      console.error("Erro ao gerar o conteúdo:", err);
      throw new Error("Falha ao criar a dieta.");
    }
  }
}

module.exports = CreateNutritionService;
