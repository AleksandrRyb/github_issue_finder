import express from "express";

import { getIssueRoutes } from "./issue";
import { getLogRoutes } from "./log";

function getRoutes() {
  const router = express.Router();

  router.use("/issue", getIssueRoutes());
  router.use("/log", getLogRoutes());

  return router;
}

export { getRoutes };
