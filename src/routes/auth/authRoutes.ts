import Router from 'express-awesome-router';
import User from '../../models/User';

const router = Router();

router.get('/', (req, res) => {
  const user = req.user as User;
  res.render('profile/index', { user });
});

export default router;
