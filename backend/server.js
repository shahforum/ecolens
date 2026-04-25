const express = require("express");
const app = express();

app.use(express.json());

app.post("/analyze", (req, res) => {
  // pretend we analyzed an image
  const result = {
    item: "plastic bottle",
    reduce: "Use a reusable water bottle next time",
    reuse: "Turn it into a plant holder or DIY watering tool",
    recycle: "Rinse and place in the blue recycling bin"
  };

  res.json(result);
});

app.get("/", (req, res) => {
  res.send("EcoLens API running");
});

app.listen(3000, () => console.log("Server running on port 3000"));