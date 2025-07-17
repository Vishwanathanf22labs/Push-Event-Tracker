const express = require("express");
const router = express.Router();
const { handlePushWebhook } = require("../controllers/webhookController");

router.post("/push", handlePushWebhook);

module.exports = router;
