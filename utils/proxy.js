const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const apiKey = process.env.NEXT_URLDAY_API_KEY;
// Permitir CORS en el servidor proxy
app.use(cors({ origin: 'http://localhost:3001/' }));
app.use(express.json());

// Ruta para manejar las solicitudes a la API de URLDay
app.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.post(
      "https://www.urlday.com/api/v1/links",
      { url },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
      error: error.response?.data,
    });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
