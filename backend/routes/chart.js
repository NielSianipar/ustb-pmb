import express, { response } from "express"
const router = express.Router();

router.get("/chart-data", (req, res) => {
  res.json({
    labels: ["Prodi A", "Prodi B", "Prodi C"],
    values: [120, 90, 150],
  });
});

export default router;