import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/callback', (req, res) => {
  console.log('📩 Callback received');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  res.status(200).json({
    success: true,
    receivedAt: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.send('Callback API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
