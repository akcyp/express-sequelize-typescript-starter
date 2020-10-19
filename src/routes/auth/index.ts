import express from 'express';

import authRoutes from './authRoutes';
import authenticate from './authenticate';

const router = express.Router();

// Flash messages -> ejs templates
router.use((req, res, next) => {
  const messages = [...req.flash('error'), ...req.flash('success'), ...req.flash('messages')];
  res.locals.messages = messages;
  next();
});

// Only unauthenticated
authenticate.before((req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth');
});

// Only authenticated
authRoutes.before((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/notLoggedIn');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use('/auth', authRoutes);
router.use(authenticate);

export default router;
