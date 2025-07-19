const express = require("express");
const si = require("systeminformation");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/cpu", async (req, res) => {
  try {
    const cpu = await si.cpu();
    const load = await si.currentLoad();
    res.json({ ...cpu, ...load });
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

app.get("/api/memory", async (req, res) => {
  try {
    const data = await si.mem();
    res.json(data);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

app.get("/api/disk", async (req, res) => {
  try {
    const data = await si.fsSize();
    res.json(data);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

app.get("/api/os", async (req, res) => {
  try {
    const data = await si.osInfo();
    res.json(data);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

app.get("/api/uptime", async (req, res) => {
  try {
    const data = await si.time();
    res.json(data);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
