const fs = require("fs").promises;
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;

app.use(cors());

let foodProtein;

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/api/:name", async (request, response) => {
  const protein = request.params.name.toLowerCase();

  try {
    if (!foodProtein) {
      const data = await fs.readFile("foodProtein.json", "utf8");
      foodProtein = JSON.parse(data);
    }

    if (foodProtein[protein]) {
      response.json(foodProtein[protein]);
    } else {
      response.json(foodProtein["unknown"]);
    }
  } catch (error) {
    console.error("error reading json file", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
