const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .listen(PORT, () => console.log(`App is listening on port ${PORT}`));

app.get("/", (req, res) => res.render("pages/index"));

app.get("/api/timestamp/:date_string?", (req, res) => {
  const date = new Date(req.params.date_string);
  const jsonData =
    date.toString() === "Invalid Date"
      ? { error: "Invalid Date" }
      : { unix: +date, utc: date.toUTCString() };
  res.json(jsonData);
});
