import { Router } from 'express';
import { getUser, deleteUser, saveUser, updateUser, getAUser } from 'controllers/staffController';

import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const { originalname } = file;
    callback(null, uuidv4() + originalname);
  },
});
const upload = multer({ storage });

const router = Router();

router.get('/', getUser);
router.get('/:Id', getAUser);
router.post('/new', saveUser);
router.post('/update', updateUser);
router.delete('/', deleteUser);

export default router;
