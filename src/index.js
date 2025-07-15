import { connectDB } from "./database/connection.js";
import { app } from "./app.js";

connectDB().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is listing at ${process.env.PORT || 4000} port`);
    });
}).catch((error) => {
    console.log(error);
})
