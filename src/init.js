import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/video";
import "./models/User";
import "./models/Comment";
import app from "./server";

// const PORT = process.env.PORT || "3000";
const PORT = "3000";

const handleListening = () =>
  console.log(`👉 Server Listening on port http://localhost:${PORT}/ 👍`);

app.listen(PORT, handleListening);
