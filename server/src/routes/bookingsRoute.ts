import { Router } from 'express';
import { getBookings, setBooking } from 'controllers/bookingsController';

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

router.get('/', getBookings);
router.post('/', setBooking);

export default router;
