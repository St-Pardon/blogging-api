const app = require('./app')
const { connectToMongoDB } = require("./config/db.config");

// connect To Mongo DB
connectToMongoDB();

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://127.0.0.1:${process.env.PORT}`);
});
