const express = require('express');
const app = express();

// dynamic port for Render
const PORT = process.env.PORT || 3000;

// fetch (node-fetch for Node.js)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// YOUR MINECRAFT SERVER
const SERVER_IP = "barkadacraftsmp.ph1-mczie.fun:4090";

// API route
app.get('/server-status', async (req, res) => {
  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
    const data = await response.json();

    res.json({
      players: `${data.players?.online || 0}/${data.players?.max || 0}`,
      status: data.online ? "online" : "offline",
      tps: data.online ? 20 : 0, // placeholder
      cpu: "N/A",
      ram: "N/A",
      nether: "UNKNOWN",
      end: "UNKNOWN"
    });

  } catch (error) {
    res.json({
      players: "0/0",
      status: "offline",
      tps: 0,
      cpu: "N/A",
      ram: "N/A",
      nether: "UNKNOWN",
      end: "UNKNOWN"
    });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});