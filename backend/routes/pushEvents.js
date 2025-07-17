const express = require("express");
const router = express.Router();
const {
  getAllPushEvents,
  getPushEventById,
} = require("../controllers/pushEventController");

/**
 * @swagger
 * /push-events:
 *   get:
 *     summary: Get all push events
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: branch
 *         schema:
 *           type: string
 *         description: Filter by branch name
 *     responses:
 *       200:
 *         description: A list of push events
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllPushEvents);

/**
 * @swagger
 * /push-events/{id}:
 *   get:
 *     summary: Get a single push event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the push event
 *     responses:
 *       200:
 *         description: Push event found
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getPushEventById);

module.exports = router;