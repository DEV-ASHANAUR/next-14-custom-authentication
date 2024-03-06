import mongoose from "mongoose";


export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("database connected successfully!");
    });

    connection.on("error", (error) => {
      console.log("connection error : " + error);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong!");
    console.log(error);
  }
}
