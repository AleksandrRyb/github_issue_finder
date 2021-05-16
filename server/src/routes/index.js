import express from "express";
import { getIssueRoutes } from "./issue";

function getRoutes() {
  const router = express.Router();

  router.use("/issue", getIssueRoutes());

  return router;
}

export { getRoutes };
