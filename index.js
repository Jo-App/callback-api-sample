import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙 (index.html)
app.use(express.static(__dirname));

// ⭐ CORS 설정
app.use(cors({
  origin: 'https://edu.local.pharmallplus.com',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/health', (req, res) => {
  console.log('📩 Callback received');
  console.log('Body:', req.body);

  res.status(200).send('OK');
});

// JWT 시크릿 키
const JWT_SECRET = '4CE97B173C9DD3CC';

app.get('/check', (req, res) => {
  const payload = {
    cuid: '1234567890',
    expt: Math.floor(Date.now() / 1000) + 60 * 60, // 1시간 후 만료
    next_episode: true,
    playback_rates: [0.5, 0.7, 1, 1.3, 1.5, 1.7, 2],
    playcallback_ignore: true,
    mc: [
      {
        mckey: 'sfVnqCTy',
        title: '공개 샘플',
        seek: false,
        seekable_end: 10,
      },
    ],
  };

  // JWT 생성
  const token = jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
  });

  res.json({
    success: true,
    token,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
