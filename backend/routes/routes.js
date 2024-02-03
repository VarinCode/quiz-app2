import { Router } from "express";
import model from "../model/data.model.js";
import controller from "../controller/controller.js";

const router = Router();

router.get("/api/data", (req, res) => controller.getData(req, res, model));
router.post("/api/score", (req, res, next) =>
  controller.getScore(req, res, next, model)
);

export default router;
