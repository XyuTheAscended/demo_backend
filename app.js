const express = require("express");
const cors = require("cors");
const multer = require("multer")
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

let games = [
   {"title":"Rogue Lineage","image":"../images/roguelineage.png","description":"A hardcore fantasy RPG with permadeath.","tags":["rpg","roguelike"], "link":"https://www.roblox.com/games/3016661674/Rogue-Lineage?utm_source=chatgpt.com"},

    {"title":"Elden Ring","image":"../images/eldenring.png","description":"A massive open-world fantasy RPG.","tags":["rpg","singleplayer","3d"], "link":"https://store.steampowered.com/app/1245620/ELDEN_RING/"},

    {"title":"Skyrim","image":"../images/skyrim.png","description":"A legendary dragon-slaying RPG.","tags":["rpg","singleplayer","3d"], "link":"https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/"},

    {"title":"The Witcher 3","image":"../images/witcher3.png","description":"A monster-hunting RPG adventure.","tags":["rpg","singleplayer","3d"], "link":"https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/"},

    {"title":"Baldurs Gate 3","image":"../images/baldursgate3.png","description":"A massive roleplaying adventure.","tags":["rpg","singleplayer","3d"], "link":"https://store.steampowered.com/app/1086940/Baldurs_Gate_3/"},

    {"title":"Final Fantasy XV","image":"../images/ffxv.png","description":"A fantasy roadtrip RPG.","tags":["rpg","singleplayer","3d"], "link":"https://store.steampowered.com/app/637650/FINAL_FANTASY_XV_WINDOWS_EDITION/"},

    {"title":"Monster Hunter World","image":"../images/monsterhunter.png","description":"Hunt giant monsters in a rich world.","tags":["rpg","multiplayer","3d"], "link":"https://store.steampowered.com/app/582010/Monster_Hunter_World/"},

    {"title":"Minecraft","image":"../images/minecraft.png","description":"Explore, survive, and create your own path.","tags":["multiplayer","simulation","3d"], "link":"https://www.minecraft.net/"},

    {"title":"Undertale","image":"../images/undertale.png","description":"A unique story-driven RPG.","tags":["rpg","indie","2d"], "link":"https://undertale.com/"},

    {"title":"Outlast","image":"../images/outlast.png","description":"Investigate a terrifying asylum.","tags":["horror","singleplayer","3d"], "link":"https://store.steampowered.com/app/238320/Outlast/"},

    {"title":"Resident Evil Village","image":"../images/re8.png","description":"Survive the horrors of a cursed village.","tags":["horror","singleplayer","3d"], "link":"https://store.steampowered.com/app/1196590/Resident_Evil_Village/"},

    {"title":"Phasmophobia","image":"../images/phasmophobia.png","description":"Co-op ghost hunting horror.","tags":["horror","multiplayer","3d"], "link":"https://store.steampowered.com/app/739630/Phasmophobia/"},

    {"title":"Dead by Daylight","image":"../images/deadbydaylight.png","description":"Multiplayer survival horror.","tags":["horror","multiplayer","3d"], "link":"https://store.steampowered.com/app/381210/Dead_by_Daylight/"},

    {"title":"Amnesia","image":"../images/amnesia.png","description":"Classic psychological horror.","tags":["horror","singleplayer","3d"], "link":"https://store.steampowered.com/app/57300/Amnesia_The_Dark_Descent/"},

    {"title":"Poppy Playtime","image":"../images/poppyplaytime.png","description":"Explore a haunted toy factory.","tags":["horror","singleplayer","3d"], "link":"https://store.steampowered.com/app/1721470/Poppy_Playtime/"},

    {"title":"Mortuary Assistant","image":"../images/mortuaryassistant.png","description":"Embalm bodies while demons stalk you.","tags":["horror","singleplayer","3d"], "link":"https://store.steampowered.com/app/1295920/The_Mortuary_Assistant/"},

    {"title":"Devour","image":"../images/devour.png","description":"Escape possessed cultists.","tags":["horror","multiplayer","3d"], "link":"https://store.steampowered.com/app/1274570/DEVOUR/"},

    {"title":"Five Nights at Freddy's","image":"../images/fnaf.png","description":"Survive animatronic horrors.","tags":["horror","singleplayer","2d"], "link":"https://store.steampowered.com/app/319510/Five_Nights_at_Freddys/"},

    {"title":"Call of Duty Warzone","image":"../images/codmw.png","description":"Fast-paced online shooter.","tags":["fps","multiplayer","3d"], "link":"https://store.steampowered.com/app/1962663/Call_of_Duty_Warzone/"},

    {"title":"Fortnite","image":"../images/fortnite.png","description":"Battle royale with building.","tags":["fps","multiplayer","3d"], "link":"https://www.epicgames.com/fortnite"},

    {"title":"Apex Legends","image":"../images/apex.png","description":"Team-based battle royale.","tags":["fps","multiplayer","3d"], "link":"https://www.apexlegends.com/"},

    {"title":"Among Us","image":"../images/amongus.png","description":"Find the impostor before it's too late.","tags":["multiplayer","2d"], "link":"https://store.steampowered.com/app/945360/Among_Us/"},

    {"title":"Rocket League","image":"../images/rocketleague.png","description":"Soccer with rocket-powered cars.","tags":["multiplayer","3d"], "link":"https://www.rocketleague.com/"},

    {"title":"Overwatch 2","image":"../images/overwatch2.png","description":"Hero-based multiplayer shooter.","tags":["fps","multiplayer","3d"], "link":"https://overwatch.blizzard.com/"},

    {"title":"Valorant","image":"../images/valorant.png","description":"Tactical team-based shooter.","tags":["fps","multiplayer","3d"], "link":"https://playvalorant.com/"},

    {"title":"Counter-Strike: Global Offensive","image":"../images/cs2.png","description":"Classic competitive shooter.","tags":["fps","multiplayer","3d"], "link":"https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/"},

    {"title":"God of War","image":"../images/godofwar.png","description":"A mythological action-adventure RPG.","tags":["rpg","singleplayer","3d"], "link":"https://store.steampowered.com/app/1593500/God_of_War/"},

    {"title":"Doki Doki Literature Club","image":"../images/ddlc.png","description":"A visual novel that turns dark quickly.","tags":["visual","2d"], "link":"https://ddlc.moe/"},

    {"title":"Steins Gate","image":"../images/steinsgate.png","description":"A time travel science fiction visual novel.","tags":["visual","2d"], "link":"https://store.steampowered.com/app/412830/STEINSGATE/"},

    {"title":"Clannad","image":"../images/clannad.png","description":"An emotional and story-driven visual novel.","tags":["visual","2d"], "link":"https://store.steampowered.com/app/324160/CLANNAD/"},

    {"title":"Phoenix Wright","image":"../images/phoenixwright.png","description":"Solve cases in this courtroom visual novel.","tags":["visual","2d"], "link":"https://store.steampowered.com/app/787480/Phoenix_Wright_Ace_Attorney_Trilogy/"},

    {"title":"VA-11 Hall-A","image":"../images/va11halla.png","description":"A cyberpunk bartender story.","tags":["visual","2d"], "link":"https://store.steampowered.com/app/447530/VA11_HallA_Cyberpunk_Bartender_Action/"},

    {"title":"Saya no Uta","image":"../images/saya.png","description":"A dark horror visual novel.","tags":["visual","2d"], "link":"https://store.steampowered.com/app/702050/The_Song_of_Saya/"},

    {"title":"Zero Escape","image":"../images/zeroescape.png","description":"A puzzle thriller visual novel series.","tags":["visual","2d"], "link":"https://store.steampowered.com/app/477740/Zero_Escape_The_Nonary_Games/"},

    {"title":"AI Somnium Files","image":"../images/ai.png","description":"A detective mystery visual novel.","tags":["visual","2d"], "link":"https://store.steampowered.com/app/948740/AI_The_Somnium_Files/"},

    {"title":"Katawa Shoujo","image":"../images/katawa.png","description":"A romance visual novel with branching paths.","tags":["visual","2d"], "link":"https://store.steampowered.com/app/3068300/Katawa_Shoujo/"},

    {"title":"Microsoft Flight Simulator","image":"../images/flightsim.png","description":"A realistic flight simulation experience.","tags":["simulation","3d"], "link":"https://store.steampowered.com/app/1250410/Microsoft_Flight_Simulator_2020_40th_Anniversary_Edition/"},

    {"title":"Cities Skylines","image":"../images/cities.png","description":"Build and manage your own city.","tags":["simulation","3d"], "link":"https://store.steampowered.com/app/255710/Cities_Skylines/"},

    {"title":"Grounded","image":"../images/grounded.png","description":"Survive in a backyard as tiny insects.","tags":["multiplayer","3d"], "link":"https://store.steampowered.com/app/962130/Grounded/"},

    {"title":"Euro Truck Simulator 2","image":"../images/ets2.png","description":"Drive across Europe delivering cargo.","tags":["simulation","3d"], "link":"https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/"},

    {"title":"The Sims 4","image":"../images/sims4.png","description":"Control lives in a life simulation sandbox.","tags":["simulation","3d"], "link":"https://store.steampowered.com/app/1222670/The_Sims_4/"},

    {"title":"House Flipper","image":"../images/houseflipper.png","description":"Buy, renovate, and sell houses.","tags":["simulation","3d"], "link":"https://store.steampowered.com/app/613100/House_Flipper/"},

    {"title":"Farming Simulator","image":"../images/farmingsim.png","description":"Run your own farm.","tags":["simulation","3d"], "link":"https://store.steampowered.com/app/787860/Farming_Simulator_19/"},

    {"title":"PowerWash Simulator","image":"../images/powerwash.png","description":"Relax by cleaning everything.","tags":["simulation","3d"], "link":"https://store.steampowered.com/app/1290000/PowerWash_Simulator/"},

    {"title":"Kerbal Space Program","image":"../images/kerbal.png","description":"Build rockets and explore space.","tags":["simulation","3d"], "link":"https://store.steampowered.com/app/220200/Kerbal_Space_Program/"},

    {"title":"Hades","image":"../images/hades.png","description":"Fight your way out of the underworld.","tags":["roguelike","indie","3d"], "link":"https://store.steampowered.com/app/1145360/Hades/"},

    {"title":"Dead Cells","image":"../images/deadcells.png","description":"Fast roguelike action platformer.","tags":["roguelike","indie","2d"], "link":"https://deadcells.com/"},

    {"title":"Slay the Spire","image":"../images/slaythespire.png","description":"Deckbuilding roguelike adventure.","tags":["roguelike","2d"], "link":"https://slaythespire.com/"},

    {"title":"Binding of Isaac","image":"../images/bindingofisaac.png","description":"Dark dungeon-crawling roguelike.","tags":["roguelike","2d"], "link":"https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/"},

    {"title":"Risk of Rain 2","image":"../images/riskofrain2.png","description":"Chaotic 3D roguelike shooter.","tags":["roguelike","3d"], "link":"https://store.steampowered.com/app/632360/Risk_of_Rain_2/"},

    {"title":"Enter the Gungeon","image":"../images/gungeon.png","description":"Bullet hell roguelike shooter.","tags":["roguelike","2d"], "link":"https://store.steampowered.com/app/311690/Enter_the_Gungeon/"},

    {"title":"Rogue Legacy","image":"../images/roguelegacy.png","description":"A generational roguelike platformer.","tags":["roguelike","2d"], "link":"https://www.roguelegacy.com/"},

    {"title":"Spelunky","image":"../images/spelunky.png","description":"A challenging cave-exploration roguelike.","tags":["roguelike","2d"], "link":"https://store.steampowered.com/app/418530/Spelunky_2/"},

    {"title":"Hollow Knight","image":"../images/hollowknight.png","description":"A stunning 2D metroidvania.","tags":["indie","2d"], "link":"https://www.hollowknight.com/"},

    {"title":"Celeste","image":"../images/celeste.png","description":"A precise and emotional platformer.","tags":["indie","2d"], "link":"https://www.celestegame.com/"},

    {"title":"Stardew Valley","image":"../images/stardew.png","description":"A cozy 2D farming game.","tags":["indie","2d","simulation"], "link":"https://www.stardewvalley.net/"},

    {"title":"Cuphead","image":"../images/cuphead.png","description":"A 2D cartoon action game.","tags":["indie","2d"], "link":"https://www.cupheadgame.com/"},

    {"title":"Terraria","image":"../images/terraria.png","description":"A 2D sandbox exploration game.","tags":["indie","2d"], "link":"https://store.steampowered.com/app/105600/Terraria/"},
    
    {"title":"Katana Zero","image":"../images/katanazero.png","description":"A stylish 2D action platformer.","tags":["indie","2d"], "link":"https://www.katanazero.com/"}

]

app.get("/api/games",(req, res)=>{
  res.send(games)
});

app.get("/api/games/:id",(req, res)=>{
  const game = games.find(g => g.title === req.params.id);
  if (!game) {
    return res.status(404).send("Game not found");
  }
  res.send(game);
});

//listen for incoming requests
app.listen(3001, () =>{
  console.log("Server is running on port 3001");
});