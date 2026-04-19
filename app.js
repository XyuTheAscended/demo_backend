const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const multer = require("multer");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// FILE UPLOAD SETUP
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

//  GAMES 
let games = [
  {
    title: "Rogue Lineage",
    image: "roguelineage.png",
    description: "A hardcore fantasy RPG with permadeath.",
    tags: ["rpg", "roguelike"],
    link: "https://www.roblox.com/games/3016661674/Rogue-Lineage"
  },
  {
    title: "Elden Ring",
    image: "eldenring.png",
    description: "A massive open-world fantasy RPG.",
    tags: ["rpg", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/1245620/ELDEN_RING/"
  },
  {
    title: "Skyrim",
    image: "skyrim.png",
    description: "A legendary dragon-slaying RPG.",
    tags: ["rpg", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/489830/"
  },
  {
    title: "Minecraft",
    image: "minecraft.png",
    description: "Explore, survive, and create.",
    tags: ["multiplayer", "simulation", "3d"],
    link: "https://www.minecraft.net/"
  },
  {
    title: "Undertale",
    image: "undertale.png",
    description: "A unique story-driven RPG.",
    tags: ["rpg", "indie", "2d"],
    link: "https://undertale.com/"
  },
  {
    title: "Outlast",
    image: "outlast.png",
    description: "Investigate a terrifying asylum.",
    tags: ["horror", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/238320/"
  },
  {
    title: "Phasmophobia",
    image: "phasmophobia.png",
    description: "Co-op ghost hunting horror.",
    tags: ["horror", "multiplayer", "3d"],
    link: "https://store.steampowered.com/app/739630/"
  },
  {
    title: "Fortnite",
    image: "fortnite.png",
    description: "Battle royale with building.",
    tags: ["fps", "multiplayer", "3d"],
    link: "https://www.epicgames.com/fortnite"
  },
  {
    title: "Valorant",
    image: "valorant.png",
    description: "Tactical team-based shooter.",
    tags: ["fps", "multiplayer", "3d"],
    link: "https://playvalorant.com/"
  },
  {
    title: "Hades",
    image: "hades.png",
    description: "Fight your way out of the underworld.",
    tags: ["roguelike", "indie", "3d"],
    link: "https://store.steampowered.com/app/1145360/"
  },
  {
    title: "Dead Cells",
    image: "deadcells.png",
    description: "Fast roguelike action platformer.",
    tags: ["roguelike", "indie", "2d"],
    link: "https://deadcells.com/"
  },
  {
    title: "Hollow Knight",
    image: "hollowknight.png",
    description: "A stunning 2D metroidvania.",
    tags: ["indie", "2d"],
    link: "https://www.hollowknight.com/"
  },
  {
    title: "Celeste",
    image: "celeste.png",
    description: "A precise platformer.",
    tags: ["indie", "2d"],
    link: "https://www.celestegame.com/"
  }
];

//  SUGGESTIONS 
let suggestions = [];

//  VALIDATION 
const suggestionSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(5).max(500).required(),
  price: Joi.string().min(1).max(30).required(),
  tags: Joi.array().items(Joi.string().min(2)).min(1).required(),
  image: Joi.string().min(3).required()
});

//  ROUTES 

// ROOT
app.get("/", (req, res) => {
  res.send("Game Grouper API is running.");
});

// GET GAMES
app.get("/api/games", (req, res) => {
  res.json(games);
});

// GET SINGLE GAME
app.get("/api/games/:title", (req, res) => {
  const requestedTitle = decodeURIComponent(req.params.title).toLowerCase();

  const game = games.find(
    (g) => g.title.toLowerCase() === requestedTitle
  );

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  res.json(game);
});

// GET SUGGESTIONS
app.get("/api/suggestions", (req, res) => {
  res.json(suggestions);
});

// POST SUGGESTION (WITH FILE UPLOAD)
app.post("/api/suggestions", upload.single("image"), (req, res) => {
  const body = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    tags: req.body.tags.split(","),
    image: req.file ? req.file.filename : ""
  };

  const { error } = suggestionSchema.validate(body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  const suggestion = {
    ...body,
    submittedAt: new Date().toISOString()
  };

  suggestions.push(suggestion);

  console.log("\n===== NEW GAME SUGGESTION =====");
  console.log(suggestion);
  console.log("================================\n");

  res.json({ success: true });
});

// ================= SERVER =================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});