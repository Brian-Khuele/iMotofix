import { Router } from 'express';
import { getComms, sendComms } from 'controllers/communicationController';

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

router.get('/:id', getComms);
router.post('/send', sendComms);

export default router;
