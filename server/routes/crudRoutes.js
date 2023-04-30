import express from "express";
const router = express.Router();
import crudController from "../controllers/crudController";

router.get("/", crudController.crud_index);
router.post("/", crudController.crud_create_post);
router.get("/:id", crudController.crud_details);
router.patch("/:id", crudController.crud_update);
router.delete("/:id", crudController.crud_delete);

export default router;