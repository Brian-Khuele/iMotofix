import { Router } from 'express';
import client from 'routes/clientRoute';
import bookings from 'routes/bookingsRoute';
import staff from 'routes/staffRoute';
import communication from 'routes/communicationsRoute';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/client', client);
router.use('/bookings', bookings);
router.use('/staff', staff);
router.use('/communication', communication);
//router.use('/invoice', invoice);

// Export the base-router
export default router;
