import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import pageRoutes from "./routes/pages";
import bodyParser from "body-parser";
import componentRoutes from "./routes/components"

const app = express();
const PORT = process.env.NODE_ENV === "production" ? 4000 : process.env.PORT || 3000;

// Set Handlebars as the view engine
app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials")
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a route
app.use(pageRoutes);
app.use('/components', componentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});