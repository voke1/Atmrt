import express from 'express';
import multiparty from 'connect-multiparty';
import Car from '../usingDB/controller/carController';
import Auth from '../usingDB/middleware/checkAuth';
// import createAdValidation from '../usingDB/validation/createAd';

const multipartyMiddleware = multiparty();
const router = express.Router();

// protected route to view Car Ads based on input query
router.get('/api/v1/car', Auth, Car.getAllAds);

// protected route to post car Ad
router.post('/api/v1/car', Auth, multipartyMiddleware, Car.createAd);

// protected route to View a specific car Ad
router.get('/api/v1/car/:carId/', Auth, Car.viewAd);

// protected route to delete a specific car ad only by Admins;l
router.delete('/api/v1/car/:carId', Auth, Car.deleteAd);

// protected route to  update status of a particular ad
router.patch('/api/v1/car/:carId/status', Auth, Car.getUpdateStatus);


// protected route to update price of a particular Ad
router.patch('/api/v1/car/:carId/price', Auth, Car.getUpdatePrice);


module.exports = router;
