require("dotenv").config();
const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const sequelize = require("./config/db");

const pushRoutes = require("./routes/pushEvents");
const webhookRoutes = require("./routes/webhooks");
const {options} = require('./swagger');

const app = express();
app.use(express.json());
const swaggerSpecs = swaggerJsdoc(options)
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use("/push-events", pushRoutes);
app.use("/webhooks", webhookRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to PostgreSQL DB");
    })
    .catch((err) => {
      console.error("Failed to connect to DB:", err);
    });
});
