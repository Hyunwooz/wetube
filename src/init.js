import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/video";
import "./models/User";
import "./models/Comment";
import app from "./server";

// const PORT = process.env.PORT || "8080";
const PORT = "8080";

const handleListening = () =>
  console.log(`👉 Server Listening on port http://localhost:${PORT}/ 👍`);

app.listen(PORT, handleListening);
