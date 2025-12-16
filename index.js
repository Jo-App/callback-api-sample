import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// ⭐ CORS 설정
app.use(cors({
  origin: 'https://edu.local.pharmallplus.com',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log('📩 Callback received');
  console.log('Body:', req.body);

  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
