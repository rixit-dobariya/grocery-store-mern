const app = require("./app");
const connectDB = require("./db/index");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MONGO DB connection failed:", err);
    process.exit(1);
  });
