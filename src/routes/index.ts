import express from 'express';
import path from 'path';

const router = express.Router();

// Caching disabled for every route (prevent history back button errors)
router.use((_, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

// API routes
import api from './api';
router.use('/api', api);

// Auth routes
import auth from './auth';
router.use(auth);

// Public routes below
router.use('/src', express.static(path.join(__dirname, '../../public')));
router.get('/', (_, res) => res.render('index'));
router.get('/notLoggedIn', (_, res) => res.status(401).render('notLoggedIn'));
router.get('*', (_, res) => res.status(404).end('404'));

export default router;
