// index.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'view', 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/api/cancel', async (req, res) => {
  const { seatId, userId, userPass } = req.query;

  if (!seatId || !userId || !userPass) {
    return res
      .status(400)
      .json({ error: 'seatId, userId, userPass는 필수입니다.' });
  }

  const cancelUrl = `https://seat.induk.ac.kr/Clicker/ReleaseReadingSeat?ActionCode=0&SeatId=${seatId}&UserId=${userId}&UserPass=${userPass}&DeviceName=desktop&Kiosk=false`;
  try {
    const { data } = await axios.get(cancelUrl, {
      responseType: 'json',
    });
    const message = data.l_communication_message;
    console.log(message);

    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '예약 요청 실패' });
  }
});

app.get('/api/reserve', async (req, res) => {
  const { seatId, userId, userPass } = req.query;

  if (!seatId || !userId || !userPass) {
    return res
      .status(400)
      .json({ error: 'seatId, userId, userPass는 필수입니다.' });
  }
  const reservationUrl = `https://seat.induk.ac.kr/Clicker/ReadingRoomAction?ActionCode=0&SeatId=${seatId}&UserId=${userId}&UserPass=${userPass}&DeviceName=desktop&Kiosk=false`;

  try {
    const { data } = await axios.get(reservationUrl, {
      responseType: 'json',
    });
    const message = data.l_communication_message;
    console.log(message);

    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '예약 요청 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 에서 프록시 서버 실행 중`);
});
