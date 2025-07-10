
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./Config/connection");
 
dotenv.config();
//DB connection
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
// URL => http://localhost:8080

app.use("/api/v1/auth", require("./Routes/authRoutes"));
 app.use("/api/v1/user", require("./Routes/userRoutes"));
app.use("/api/v1/resturant", require("./Routes/resturantRoutes"));
// app.use("/api/v1/category", require("./Routes/catgeoryRoutes"));
// app.use("/api/v1/food", require("./Routes/foodRoutes"));

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Food Server APP API BASE PROJECT </h1>");
});

//PORT
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.white.bgMagenta);
});
