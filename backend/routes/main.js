import express from "express";
const router = express.Router();
// const authController = require("../controllers/auth");
import { mainController } from "../controllers/main.js"; //the file ext ".js" is needed for successful import
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

export const mainRoutes = router.get("/:username", mainController.getIndex);

// module.exports = router;
