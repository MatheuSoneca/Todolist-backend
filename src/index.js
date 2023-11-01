const express = require("express");
const cors = require("cors");
const db = require("./sequelize.js");

const Text = require("./models/text.js");

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return;
  }

  try {
    Text.sync();
  } catch (error) {
    console.error("Failed to initialize models:", error);
    return;
  }

  const app = express();
  app.use(express.json());
  app.use(cors());

  // GET /text
  app.get("/text", async (req, res) => {
    const texts = await Text.findAll();
    res.json(texts);
  });

  // POST /text
  app.post("/text", async (req, res) => {
    const { user: username, text } = req.body;
    const textRecord = await Text.create({
      username,
      text,
    });

    const content = textRecord.get();
    res.json(content);
  });

  // DELETE /text/:id
  app.delete("/text/:id", async (req, res) => {
    const textRecord = await Text.findOne({ where: { id: req.params.id } });

    if (!textRecord) {
      res.statusCode = 404;
      res.end();
      return;
    }

    await textRecord.destroy();
    res.statusCode = 204;
    res.end();
  });

  app.listen(3000, () => {
    console.log("Running!");
  });
})();
