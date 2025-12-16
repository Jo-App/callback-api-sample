import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// ⭐ 핵심 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log('==============================');
  console.log('📩 Callback received');
  console.log('Headers:', req.headers);
  console.log('Raw Body:', req.body);

  // 🔥 json_data 처리
  if (req.body.json_data) {
    try {
      const decoded = decodeURIComponent(req.body.json_data);
      const parsed = JSON.parse(decoded);

      console.log('✅ json_data (decoded):');
      console.dir(parsed, { depth: null });
    } catch (err) {
      console.error('❌ json_data parse error:', err.message);
    }
  }

  // 기타 파라미터
  console.log('Other fields:', {
    client_user_id: req.body.client_user_id,
    start_at: req.body.start_at,
    play_time: req.body.play_time,
    playtime_percent: req.body.playtime_percent,
    last_play_at: req.body.last_play_at,
  });

  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
