import express from "express";

import Log from "../models/log";

function getLogRoutes() {
  const router = express.Router();

  router.get("/logs/:logId", getLog);
  router.get("/logs", getLogs);

  return router;
}

async function getLog(req, res) {
  const { logId } = req.params;

  try {
    const log = await Log.findById(logId);
    if (!log) {
      return res
        .status(404)
        .json({ message: `Can't get log with id: ${logId}` });
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(400).json({ message: `Unexpected error: ${error.message}` });
  }
}

async function getLogs(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  try {
    const logs = await Log.find({ ip });
    if (!logs.length) {
      return res
        .status(200)
        .json({ message: `There is no logs with ip: ${ip}` });
    }

    res.status(200).json({ logs });
  } catch (error) {
    res.status(400).json({ message: `Unexpected error: ${error.message}` });
  }
}

export { getLogRoutes };
