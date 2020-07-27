import { Router } from 'express';
import transactionRouter from './transaction.routes';

const routes = Router();

routes.use('/transactions', transactionRouter);
routes.get('/', (req, resp) => {
  return resp.status(200).json({ message: 'Get Index Node.js' });
});

export default routes;
