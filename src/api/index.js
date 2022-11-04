const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const { Octokit } = require("@octokit/rest");
const { StatusCodes } = require("http-status-codes");
const getUser = require("./get-user");
const createRepo = require("./create-repo");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const onHttpStart = () => {
  console.info(`My-Photohub server listening on: ${HTTP_PORT}`);
};
const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.post(
  "/login",
  body("pat_token")
    .exists()
    .trim()
    .matches("^ghp_[A-Za-z-0-9]+$")
    .withMessage({ message: "Invalid PAT key" }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    } else {
      const octokit = new Octokit({ auth: req.body.pat_token });
      const userVal = await getUser(octokit);
      if (isNaN(userVal)) {
        let result = await createRepo(octokit, userVal);
        res.sendStatus(result);
      } else {
        res
          .sendStatus(StatusCodes.BAD_REQUEST);
      }
    }
  }
);

app.listen(HTTP_PORT, onHttpStart);
