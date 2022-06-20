import path from 'path'
import multer from 'multer'

export const multerConfig:multer.Options = {
    dest: path.resolve(__dirname, "..", "..", "files", "uploads"),
    storage: multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, path.resolve(__dirname, "..", "..", "files", "uploads"))
        },
        filename: (req, file, callBack) => {
            const fileName = `${Date.now().toString()}-${file.originalname}`
            callBack(null, fileName)
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}