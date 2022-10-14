const express = require('express');
const path = require('path');

const app = express();
const PORT_DEFAULT = 3000;
const PORT = process.env.PORT || PORT_DEFAULT;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`);
});
