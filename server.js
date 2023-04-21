import http from "http";
import * as dotenv from "dotenv";
import fs from "fs";
import {
  createUser,
  deleteUser,
  errorRender,
  homeCSSRender,
  homeRender,
  userRender,
} from "./utils/templateRender.js";

dotenv.config();

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/assets/css/style.css":
      homeCSSRender(res);
      break;
    case "/":
      homeRender(res);
      break;
    case "/user":
      userRender(res);
      break;
    case "/createUser":
      createUser(req, res);
      break;
    case "/deleteUser":
      deleteUser(req, res);
      break;
    default:
      errorRender(res);
  }
});

server.listen(process.env.APP_PORT, process.env.APP_LOCALHOST, () => {
  console.log(
    `Serveur run at http://${process.env.APP_LOCALHOST}:${process.env.APP_PORT}`
  );
});
