import express from 'express';
import cors from 'cors';

import User from '../../models/User';

const router = express.Router();

// Allow cross-origin
router.use(cors());

// Optional validation
router.use(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.send({err: 'You must be logged in to use API'});
});

router.get('/users/@me', async (req, res) => {
  const user = req.user as User;
  return res.send(user.toJSON());
});

router.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      all: true
    }
  });
  if (user instanceof User) {
    res.send(user.toJSON());
  } else {
    res.status(404).end();
  }
});

export default router;
