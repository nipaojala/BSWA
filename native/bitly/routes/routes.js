import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import * as mainController from "./controllers/mainController.js";

const router = new Router();

router.get("/", mainController.showMain);
router.post("/", mainController.saveUrls);
router.get("/:shortened", mainController.redirect);

export { router };
