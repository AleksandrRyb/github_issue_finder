import mongoose from "mongoose";
import express from "express";
import logger from "loglevel";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import { getRoutes } from "./routes";
import { setupCloseOnExit } from "./middlewares/error";

// Load enviroment varibles
dotenv.config();

function startServer({ port = process.env.PORT } = {}) {
  const app = express();

  //Midlewares
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());

  //Every route will start with api/v1
  app.use("/api/v1", getRoutes());

  //Mongoose options
  const mongo_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  //Db connections
  mongoose.connect(process.env.DATABASE_URL, mongo_options, function (error) {
    if (error) {
      logger.error(error);
    }
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

      setupCloseOnExit(server);
      resolve(server);
    });
  });
}

export { startServer };
