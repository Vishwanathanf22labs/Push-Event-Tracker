const express = require("express");
const router = express.Router();
const {
  getAllPushEvents,
  getPushEventById,
} = require("../controllers/pushEventController");

router.get("/", getAllPushEvents);
router.get("/:id", getPushEventById);

module.exports = router;
