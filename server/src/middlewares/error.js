import logger from "loglevel";

//This closes the server in the event if an error so that our requests do not hang
function setupCloseOnExit(server) {
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        logger.info("Server successfully closed");
      })
      .catch((error) => {
        logger.warning("Something went wrong closing the server", error.stack);
      });

    if (options.exit) process.exit();
  }

  //Do something when server is closing
  process.on("exit", exitHandler);
  //Catches ctrc+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));
  // Catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
  // Catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
}

export { setupCloseOnExit };
