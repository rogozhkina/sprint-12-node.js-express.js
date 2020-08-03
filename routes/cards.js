const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const pathToCards = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  const reader = fs.createReadStream(pathToCards, { encoding: 'utf8' });

  reader.on('error', () => {
    res.status('500').send({ message: 'Ошибка сервера' });
  });

  reader.on('open', () => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    reader.pipe(res);
  });
});

module.exports = router;
