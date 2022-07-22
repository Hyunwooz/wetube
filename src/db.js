import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser : true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("👉 Success Connected to DB 👍")
const handleError = (error) => console.log("😡 DB Error", error);

db.on("error",handleError);
db.once("open",handleOpen);