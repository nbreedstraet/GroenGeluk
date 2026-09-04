import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

function getAuthHeader() {
  const apiKey = process.env.TICKET_TAILOR_API_KEY;
  if (!apiKey) return null;
  return "Basic " + Buffer.from(`${apiKey}:`).toString("base64");
}

app.get("/api/events", async (req, res) => {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      return res
        .status(500)
        .json({ error: "TICKET_TAILOR_API_KEY ontbreekt in .env" });
    }

    const response = await fetch("https://api.tickettailor.com/v1/events", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res
        .status(response.status)
        .json({ error: "Ticket Tailor API error", details: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fout bij ophalen Ticket Tailor events:", err);
    res.status(500).json({ error: "Interne serverfout" });
  }
});

// Eén event op basis van id (voor je EventDetail pagina)
app.get("/api/events/:id", async (req, res) => {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      return res
        .status(500)
        .json({ error: "TICKET_TAILOR_API_KEY ontbreekt in .env" });
    }

    const response = await fetch(
      `https://api.tickettailor.com/v1/events/${req.params.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: authHeader,
        },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      return res
        .status(response.status)
        .json({ error: "Ticket Tailor API error", details: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fout bij ophalen Ticket Tailor event:", err);
    res.status(500).json({ error: "Interne serverfout" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend draait op http://localhost:${PORT}`);
});
