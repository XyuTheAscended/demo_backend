const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");

const app = express();

/** Middleware */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Image upload setup */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/** Validation */
const suggestionSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow("").required()
});

/** Games data */
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
    link: "https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/"
  },
  {
    title: "The Witcher 3",
    image: "witcher3.png",
    description: "A monster-hunting RPG adventure.",
    tags: ["rpg", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/"
  },
  {
    title: "Baldurs Gate 3",
    image: "baldursgate3.png",
    description: "A massive roleplaying adventure.",
    tags: ["rpg", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/"
  },
  {
    title: "Final Fantasy XV",
    image: "ffxv.png",
    description: "A fantasy roadtrip RPG.",
    tags: ["rpg", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/637650/FINAL_FANTASY_XV_WINDOWS_EDITION/"
  },
  {
    title: "Monster Hunter World",
    image: "monsterhunter.png",
    description: "Hunt giant monsters in a rich world.",
    tags: ["rpg", "multiplayer", "3d"],
    link: "https://store.steampowered.com/app/582010/Monster_Hunter_World/"
  },
  {
    title: "Minecraft",
    image: "minecraft.png",
    description: "Explore, survive, and create your own path.",
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
    link: "https://store.steampowered.com/app/238320/Outlast/"
  },
  {
    title: "Resident Evil Village",
    image: "re8.png",
    description: "Survive the horrors of a cursed village.",
    tags: ["horror", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/1196590/Resident_Evil_Village/"
  },
  {
    title: "Phasmophobia",
    image: "phasmophobia.png",
    description: "Co-op ghost hunting horror.",
    tags: ["horror", "multiplayer", "3d"],
    link: "https://store.steampowered.com/app/739630/Phasmophobia/"
  },
  {
    title: "Dead by Daylight",
    image: "deadbydaylight.png",
    description: "Multiplayer survival horror.",
    tags: ["horror", "multiplayer", "3d"],
    link: "https://store.steampowered.com/app/381210/Dead_by_Daylight/"
  },
  {
    title: "Amnesia",
    image: "amnesia.png",
    description: "Classic psychological horror.",
    tags: ["horror", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/57300/Amnesia_The_Dark_Descent/"
  },
  {
    title: "Poppy Playtime",
    image: "poppyplaytime.png",
    description: "Explore a haunted toy factory.",
    tags: ["horror", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/1721470/Poppy_Playtime/"
  },
  {
    title: "Mortuary Assistant",
    image: "mortuaryassistant.png",
    description: "Embalm bodies while demons stalk you.",
    tags: ["horror", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/1295920/The_Mortuary_Assistant/"
  },
  {
    title: "Devour",
    image: "devour.png",
    description: "Escape possessed cultists.",
    tags: ["horror", "multiplayer", "3d"],
    link: "https://store.steampowered.com/app/1274570/DEVOUR/"
  },
  {
    title: "Five Nights at Freddy's",
    image: "fnaf.png",
    description: "Survive animatronic horrors.",
    tags: ["horror", "singleplayer", "2d"],
    link: "https://store.steampowered.com/app/319510/Five_Nights_at_Freddys/"
  },
  {
    title: "Call of Duty Warzone",
    image: "codmw.png",
    description: "Fast-paced online shooter.",
    tags: ["fps", "multiplayer", "3d"],
    link: "https://store.steampowered.com/app/1962663/Call_of_Duty_Warzone/"
  },
  {
    title: "Fortnite",
    image: "fortnite.png",
    description: "Battle royale with building.",
    tags: ["fps", "multiplayer", "3d"],
    link: "https://www.epicgames.com/fortnite"
  },
  {
    title: "Apex Legends",
    image: "apex.png",
    description: "Team-based battle royale.",
    tags: ["fps", "multiplayer", "3d"],
    link: "https://www.apexlegends.com/"
  },
  {
    title: "Among Us",
    image: "amongus.png",
    description: "Find the impostor before it's too late.",
    tags: ["multiplayer", "2d"],
    link: "https://store.steampowered.com/app/945360/Among_Us/"
  },
  {
    title: "Rocket League",
    image: "rocketleague.png",
    description: "Soccer with rocket-powered cars.",
    tags: ["multiplayer", "3d"],
    link: "https://www.rocketleague.com/"
  },
  {
    title: "Overwatch 2",
    image: "overwatch2.png",
    description: "Hero-based multiplayer shooter.",
    tags: ["fps", "multiplayer", "3d"],
    link: "https://overwatch.blizzard.com/"
  },
  {
    title: "Valorant",
    image: "valorant.png",
    description: "Tactical team-based shooter.",
    tags: ["fps", "multiplayer", "3d"],
    link: "https://playvalorant.com/"
  },
  {
    title: "Counter-Strike: Global Offensive",
    image: "cs2.png",
    description: "Classic competitive shooter.",
    tags: ["fps", "multiplayer", "3d"],
    link: "https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/"
  },
  {
    title: "God of War",
    image: "godofwar.png",
    description: "A mythological action-adventure RPG.",
    tags: ["rpg", "singleplayer", "3d"],
    link: "https://store.steampowered.com/app/1593500/God_of_War/"
  },
  {
    title: "Doki Doki Literature Club",
    image: "ddlc.png",
    description: "A visual novel that turns dark quickly.",
    tags: ["visual", "2d"],
    link: "https://ddlc.moe/"
  },
  {
    title: "Steins Gate",
    image: "steinsgate.png",
    description: "A time travel science fiction visual novel.",
    tags: ["visual", "2d"],
    link: "https://store.steampowered.com/app/412830/STEINSGATE/"
  },
  {
    title: "Clannad",
    image: "clannad.png",
    description: "An emotional and story-driven visual novel.",
    tags: ["visual", "2d"],
    link: "https://store.steampowered.com/app/324160/CLANNAD/"
  },
  {
    title: "Phoenix Wright",
    image: "phoenixwright.png",
    description: "Solve cases in this courtroom visual novel.",
    tags: ["visual", "2d"],
    link: "https://store.steampowered.com/app/787480/Phoenix_Wright_Ace_Attorney_Trilogy/"
  },
  {
    title: "VA-11 Hall-A",
    image: "va11halla.png",
    description: "A cyberpunk bartender story.",
    tags: ["visual", "2d"],
    link: "https://store.steampowered.com/app/447530/VA11_HallA_Cyberpunk_Bartender_Action/"
  },
  {
    title: "Saya no Uta",
    image: "saya.png",
    description: "A dark horror visual novel.",
    tags: ["visual", "2d"],
    link: "https://store.steampowered.com/app/702050/The_Song_of_Saya/"
  },
  {
    title: "Zero Escape",
    image: "zeroescape.png",
    description: "A puzzle thriller visual novel series.",
    tags: ["visual", "2d"],
    link: "https://store.steampowered.com/app/477740/Zero_Escape_The_Nonary_Games/"
  },
  {
    title: "AI Somnium Files",
    image: "ai.png",
    description: "A detective mystery visual novel.",
    tags: ["visual", "2d"],
    link: "https://store.steampowered.com/app/948740/AI_The_Somnium_Files/"
  },
  {
    title: "Katawa Shoujo",
    image: "katawa.png",
    description: "A romance visual novel with branching paths.",
    tags: ["visual", "2d"],
    link: "https://store.steampowered.com/app/3068300/Katawa_Shoujo/"
  },
  {
    title: "Microsoft Flight Simulator",
    image: "flightsim.png",
    description: "A realistic flight simulation experience.",
    tags: ["simulation", "3d"],
    link: "https://store.steampowered.com/app/1250410/Microsoft_Flight_Simulator_2020_40th_Anniversary_Edition/"
  },
  {
    title: "Cities Skylines",
    image: "cities.png",
    description: "Build and manage your own city.",
    tags: ["simulation", "3d"],
    link: "https://store.steampowered.com/app/255710/Cities_Skylines/"
  },
  {
    title: "Grounded",
    image: "grounded.png",
    description: "Survive in a backyard as tiny insects.",
    tags: ["multiplayer", "3d"],
    link: "https://store.steampowered.com/app/962130/Grounded/"
  },
  {
    title: "Euro Truck Simulator 2",
    image: "ets2.png",
    description: "Drive across Europe delivering cargo.",
    tags: ["simulation", "3d"],
    link: "https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/"
  },
  {
    title: "The Sims 4",
    image: "sims4.png",
    description: "Control lives in a life simulation sandbox.",
    tags: ["simulation", "3d"],
    link: "https://store.steampowered.com/app/1222670/The_Sims_4/"
  },
  {
    title: "House Flipper",
    image: "houseflipper.png",
    description: "Buy, renovate, and sell houses.",
    tags: ["simulation", "3d"],
    link: "https://store.steampowered.com/app/613100/House_Flipper/"
  },
  {
    title: "Farming Simulator",
    image: "farmingsim.png",
    description: "Run your own farm.",
    tags: ["simulation", "3d"],
    link: "https://store.steampowered.com/app/787860/Farming_Simulator_19/"
  },
  {
    title: "PowerWash Simulator",
    image: "powerwash.png",
    description: "Relax by cleaning everything.",
    tags: ["simulation", "3d"],
    link: "https://store.steampowered.com/app/1290000/PowerWash_Simulator/"
  },
  {
    title: "Kerbal Space Program",
    image: "kerbal.png",
    description: "Build rockets and explore space.",
    tags: ["simulation", "3d"],
    link: "https://store.steampowered.com/app/220200/Kerbal_Space_Program/"
  },
  {
    title: "Hades",
    image: "hades.png",
    description: "Fight your way out of the underworld.",
    tags: ["roguelike", "indie", "3d"],
    link: "https://store.steampowered.com/app/1145360/Hades/"
  },
  {
    title: "Dead Cells",
    image: "deadcells.png",
    description: "Fast roguelike action platformer.",
    tags: ["roguelike", "indie", "2d"],
    link: "https://deadcells.com/"
  },
  {
    title: "Slay the Spire",
    image: "slaythespire.png",
    description: "Deckbuilding roguelike adventure.",
    tags: ["roguelike", "2d"],
    link: "https://slaythespire.com/"
  },
  {
    title: "Binding of Isaac",
    image: "bindingofisaac.png",
    description: "Dark dungeon-crawling roguelike.",
    tags: ["roguelike", "2d"],
    link: "https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/"
  },
  {
    title: "Risk of Rain 2",
    image: "riskofrain2.png",
    description: "Chaotic 3D roguelike shooter.",
    tags: ["roguelike", "3d"],
    link: "https://store.steampowered.com/app/632360/Risk_of_Rain_2/"
  },
  {
    title: "Enter the Gungeon",
    image: "gungeon.png",
    description: "Bullet hell roguelike shooter.",
    tags: ["roguelike", "2d"],
    link: "https://store.steampowered.com/app/311690/Enter_the_Gungeon/"
  },
  {
    title: "Rogue Legacy",
    image: "roguelegacy.png",
    description: "A generational roguelike platformer.",
    tags: ["roguelike", "2d"],
    link: "https://www.roguelegacy.com/"
  },
  {
    title: "Spelunky",
    image: "spelunky.png",
    description: "A challenging cave-exploration roguelike.",
    tags: ["roguelike", "2d"],
    link: "https://store.steampowered.com/app/418530/Spelunky_2/"
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
    description: "A precise and emotional platformer.",
    tags: ["indie", "2d"],
    link: "https://www.celestegame.com/"
  },
  {
    title: "Stardew Valley",
    image: "stardew.png",
    description: "A cozy 2D farming game.",
    tags: ["indie", "2d", "simulation"],
    link: "https://www.stardewvalley.net/"
  },
  {
    title: "Cuphead",
    image: "cuphead.png",
    description: "A 2D cartoon action game.",
    tags: ["indie", "2d"],
    link: "https://www.cupheadgame.com/"
  },
  {
    title: "Terraria",
    image: "terraria.png",
    description: "A 2D sandbox exploration game.",
    tags: ["indie", "2d"],
    link: "https://store.steampowered.com/app/105600/Terraria/"
  },
  {
    title: "Katana Zero",
    image: "katanazero.png",
    description: "A stylish 2D action platformer.",
    tags: ["indie", "2d"],
    link: "https://www.katanazero.com/"
  }
];



/** Suggestions data */
let suggestions = [];

/** Get games */
app.get("/api/games", (req, res) => {
  res.json(games);
});

/** Get suggestions */
app.get("/api/suggestions", (req, res) => {
  res.json(suggestions);
});

/** Add suggestion */
app.post("/api/suggestions", upload.single("image"), (req, res) => {
  try {
    const { error } = suggestionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const newSuggestion = {
      id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      image: imageBase64
    };

    suggestions.push(newSuggestion);
    res.json(newSuggestion);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/** Edit suggestion */
app.put("/api/suggestions/:id", (req, res) => {
  try {
    const { error } = suggestionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const suggestion = suggestions.find(s => s.id === req.params.id);

    if (!suggestion) {
      return res.status(404).json({ error: "Not found" });
    }

    suggestion.title = req.body.title;
    suggestion.description = req.body.description;

    res.json(suggestion);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/** Delete suggestion */
app.delete("/api/suggestions/:id", (req, res) => {
  try {
    const index = suggestions.findIndex(s => s.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Not found" });
    }

    suggestions.splice(index, 1);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/** Start server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});