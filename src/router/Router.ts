import express from 'express';
import multer from 'multer';
import { multerConfig } from '../config/multer';
import { FileController } from '../controller/FileController';
import { UserController } from '../controller/UserController';
const router = express.Router();

const fileController = new FileController()
const userController = new UserController()

router.post("/file", multer(multerConfig).single('file'), fileController.post)
router.get("/file",  fileController.getByUser)
router.post("/login", userController.login)
router.post("/singup", userController.singUp)

export { router };
