const cors = require("cors");
require("dotenv").config();
const express = require("express");
const { connectToDB } = require("./db/dbconnect");
const { createTables } = require("./db/tables");
const ingredientsRouter = require("./routes/ingredients");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/ingredients", ingredientsRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connectToDB();
  await createTables();
  console.log(`Server is running on  http://localhost:${port}`);
});
