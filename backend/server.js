const express = require("express");
const app = express();

let cors = require(`cors`);
app.use(cors());

app.use("/interview", require("./routes/interview"));

app.listen(8080, () => {
  console.log("==================== 서버실행 ==================");
});
