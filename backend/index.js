const express = require("express");
const app = express();

let cors = require(`cors`);
// CORS 이슈 해결
app.use(cors());

const interviewRoute = require("./routes/interview");

app.use("/interview", interviewRoute);

app.listen(8080);
