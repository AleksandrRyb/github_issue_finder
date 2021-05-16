if (process.env.NODE_ENV === "production") {
  // Path to the dist folder
} else {
  require("nodemon")({ script: "dev.js" });
}
