import fs from "fs";
import ejs from "ejs";
import { students } from "../Data/data.js";
import { parse } from "querystring";
import { handleDate, reverseDateMounthDay } from "./dateFormatter.js";

export const homeRender = (res) => {
  const template = fs.readFileSync("view/home.ejs", "utf8");
  const rendered = ejs.render(template, { students });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(rendered);
  res.end();
};

export const homeCSSRender = (res) => {
  const cssFile = fs.readFileSync("assets/css/style.css", "utf8");
  res.writeHead(200, { "Content-Type": "text/css" });
  res.write(cssFile);
  res.end();
};

export const userRender = (res) => {
  const userTemplate = fs.readFileSync("view/user.ejs", "utf8");
  const userRendered = ejs.render(userTemplate, {
    students,
    handleDate,
  });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(userRendered);
  res.end();
};

export const createUser = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const formData = parse(body);

    formData.birth = reverseDateMounthDay(formData.birth).replaceAll(",", "-");

    const template = fs.readFileSync("view/home.ejs", "utf8");
    const rendered = ejs.render(template, { students });
    res.writeHead(201, { "Content-Type": "text/html" });
    res.write(rendered);
    res.end();
  });
};

export const deleteUser = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const formData = parse(body.replaceAll("%2F", ""));

    console.log(formData);

    const newStudent = [];
    students.filter((item) => {
      if (item.name !== formData.name) {
        newStudent.push(item);
      }
    });

    students.length = 0;
    newStudent.forEach((item) => {
      students.push(item);
    });

    const userTemplate = fs.readFileSync("view/user.ejs", "utf8");
    const userRendered = ejs.render(userTemplate, { students, handleDate });
    res.writeHead(201, { "Content-Type": "text/html" });
    res.write(userRendered);
    res.end();
  });
};

export const errorRender = (res) => {
  const errorTemplate = fs.readFileSync("view/404.html", "utf8");
  const errorRendered = ejs.render(errorTemplate);
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write(errorRendered);
  res.end();
};
