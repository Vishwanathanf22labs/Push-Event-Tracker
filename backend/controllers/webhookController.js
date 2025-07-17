const crypto = require("crypto");
const PushEvent = require("../models/PushEvent");

const handlePushWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-hub-signature-256"];
    const rawBody = JSON.stringify(req.body);
    const hmac = crypto
      .createHmac("sha256", process.env.WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");
    const expectedSignature = `sha256=${hmac}`;

    if (signature !== expectedSignature) {
      return res
        .status(403)
        .json({ success: false, error: "Invalid GitHub Signature" });
    }

    const body = req.body;

    const pushData = {
      repo: body.repository?.name || "unknown",
      actor: body.pusher?.name || "unknown",
      branch: body.ref?.split("refs/heads/")[1] || "unknown",
      commit_hash: body.head_commit?.id || "unknown",
      commit_message: body.head_commit?.message || "No message",
      pushed_at: new Date(body.head_commit?.timestamp || Date.now()),
      raw: body,
    };

    console.log("Webhook received from GitHub:");
    console.log(pushData);

    const event = await PushEvent.create(pushData);
    return res.status(201).json({ message: "Push event stored", id: event.id });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handlePushWebhook,
};
