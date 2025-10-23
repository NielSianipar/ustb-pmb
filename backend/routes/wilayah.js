// routes/wilayah.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const routes = {
  "/provinsi": "https://wilayah.id/api/provinces.json",
  "/kabupaten/:provCode": (params) => `https://wilayah.id/api/regencies/${params.provCode}.json`,
  "/kecamatan/:kabCode": (params) => `https://wilayah.id/api/districts/${params.kabCode}.json`,
  "/kelurahan/:kecCode": (params) => `https://wilayah.id/api/villages/${params.kecCode}.json`,
};

Object.entries(routes).forEach(([route, url]) => {
  router.get(route, async (req, res) => {
    try {
      const targetUrl = typeof url === "function" ? url(req.params) : url;
      const response = await fetch(targetUrl);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Fetch gagal:", error.message);
      res.status(500).json({ error: "Gagal fetch data" });
    }
  });
});

export default router;