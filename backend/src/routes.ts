import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanageController from './controllers/OrphanagesController';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router();
const upload = multer(uploadConfig);

// Orphanages routes
routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:id', OrphanageController.show);
routes.put('/orphanages', authMiddleware, OrphanageController.update);
routes.post('/orphanages', upload.array('images'), authMiddleware, OrphanageController.create);
// Pending orphanages
    // Get aproval pending orphanages
    // Update "Aprove" orphanages

// User routes
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users', authMiddleware, UserController.update);
routes.post('/login', AuthController.authenticate);

export default routes;