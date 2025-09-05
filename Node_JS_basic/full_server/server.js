// eslint-disable-next-line
import express from 'express';
// eslint-disable-next-line
import router from './routes/index.js';

const app = express();
const PORT = 1245;

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

export default app;
