import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the API!');
});

import { getScholarData } from './services/scholar';

app.get('/scholar', async (req: Request, res: Response) => {
  try {
    const data = await getScholarData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scholar data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
