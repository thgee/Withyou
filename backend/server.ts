import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./types";

const express = require("express");
const app = express();

require("dotenv").config(); // 환경변수 설정

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// cors 설정
let cors = require(`cors`);
app.use(cors());

// OpenAI 연결
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});
const openai = new OpenAIApi(configuration);

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.openai = openai;
  next();
});

// 서버실행
app.listen(8080, () => {
  console.log("==================== 서버실행 ==================");
});

// 라우팅
app.use("/interview", require("./routes/interview"));
