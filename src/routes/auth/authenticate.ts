import Router from 'express-awesome-router';
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import passport from '../../config/passport';

const router = Router();

router.get('/login', (_, res) => res.render('auth/login'));
router.get('/register', (_, res) => res.render('auth/register'));

router.post('/register', [
  // Username
  body('username').isString().withMessage('Invalid username type'),
  body('username').isLength({ min: 4, max: 30 }).withMessage('Username must contain from 4 to 30 characters'),
  body('username').isAlphanumeric('en-US').withMessage('Only en-US chars allowed'),
  // Password
  body('password').isString().withMessage('Invalid password type'),
  body('password').isLength({ min: 4, max: 30 }).withMessage('Password must contain from 4 to 30 characters'),
  body('password').isAlphanumeric('en-US').withMessage('Only en-US chars allowed')
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  for (const error of errors.array()) {
    req.flash('error', error.msg);
  }
  res.redirect('back');
}, passport.authenticate('local-signup', {
  successRedirect: '/auth',
  failureRedirect: '/register',
  failureFlash: true
}));

router.post('/login', [
  // Username
  body('username').isString(),
  body('username').isLength({ min: 4, max: 30 }),
  // Password
  body('password').isString(),
  body('password').isLength({ min: 4, max: 30 })
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    req.flash('error', 'Invalid username or password');
    res.redirect('back');
  }
}, passport.authenticate('local', {
  successRedirect: '/auth',
  failureRedirect: '/login',
  failureFlash: true
}));

export default router;
