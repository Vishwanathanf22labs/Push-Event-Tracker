const PushEvent = require("../models/PushEvent");

const getAllPushEvents = async (req, res) => {
  try {
    const { page = 1, branch } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const where = branch ? { branch } : {};

    const events = await PushEvent.findAndCountAll({
      where,
      limit,
      offset,
      order: [["pushed_at", "DESC"]],
    });

    res.json({
      total: events.count,
      page: Number(page),
      events: events.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPushEventById = async (req, res) => {
  try {
    const event = await PushEvent.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllPushEvents,
  getPushEventById,
};
