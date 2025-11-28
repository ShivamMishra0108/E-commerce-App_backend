// import the express module
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

// define the port number the server will listen on
const PORT = 3000;

// create the instance of an express application
const app = express();

const DB = "mongodb+srv://shivammishra6339_db_user:shivamMongo@cluster0.k0pilin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(authRouter);

// ✅ Load hello route once
console.log("Loading helloRoute...");
const helloRoute = require('./routes/hello'); // or './routes/hello.js' — both are fine
console.log("Loaded helloRoute.");

// ✅ Use the route
app.use(helloRoute);

// ✅ Connect to MongoDB
mongoose.connect(DB)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ✅ Optional: Define a direct test route
app.get("/auth", (req, res) => {
  res.send("Hello world");
});

// ✅ Start server
app.listen(PORT, '0.0.0.0', function () {
  console.log(`Server is running on port ${PORT}`);
});
