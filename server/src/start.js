import mongoose from "mongoose";
import express from "express";
import logger from "loglevel";
import dotenv from "dotenv";

// Load enviroment varibles
dotenv.config();

function startServer({ port = process.env.PORT } = {}) {
  const app = express();

  app.get("/home", (req, res) => {
    res.send("Hello world!");
  });

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`);

      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };

      resolve(server);
    });
  });
}

export { startServer };
