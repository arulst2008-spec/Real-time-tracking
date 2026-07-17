const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage: { busId: { lat, lng, updatedAt } }
let buses = {};

// Driver sends location here
app.post('/update/:busId', (req, res) => {
  const busId = req.params.busId;
  const { lat, lng } = req.body;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ error: 'lat and lng must be numbers' });
  }

  buses[busId] = { lat, lng, updatedAt: Date.now() };
  res.json({ success: true });
});

// Public map fetches all bus locations here
app.get('/buses', (req, res) => {
  res.json(buses);
});

// Simple health check
app.get('/', (req, res) => {
  res.send('CityTransit live location backend is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
