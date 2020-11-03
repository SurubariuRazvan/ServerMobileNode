const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const WebSocket = require('ws');
const wss = new WebSocket.Server({server});
const Router = require('koa-router');
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');

app.use(bodyparser());
app.use(cors());
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} ${ctx.response.status} - ${ms}ms`);
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.body = {issue: [{error: err.message || 'Unexpected error'}]};
        ctx.response.status = 500;
    }
});

class Game {
    constructor({id, appid, name, developer, positive, negative, owners, price, date, version}) {
        this.id = id;
        this.appid = appid;
        this.name = name;
        this.developer = developer;
        this.positive = positive;
        this.negative = negative;
        this.owners = owners;
        this.price = price;
        this.date = date;
        this.version = version;
    }
}

const games = [];
// {
games.push(new Game({
    id: 0,
    appid: 730,
    name: "Counter-Strike: Global Offensive",
    developer: "Valve, Hidden Path Entertainment",
    positive: 4290831,
    negative: 589655,
    owners: "100,000,000 .. 200,000,000",
    price: 0.0,
    date: new Date(Date.now() + 1),
    version: 1
}));
games.push(new Game({
    id: 1,
    appid: 570,
    name: "Dota 2",
    developer: "Valve",
    positive: 1171409,
    negative: 214456,
    owners: "100,000,000 .. 200,000,000",
    price: 0.0,
    date: new Date(Date.now() + 2),
    version: 1
}));
games.push(new Game({
    id: 2,
    appid: 440,
    name: "Team Fortress 2",
    developer: "Valve",
    positive: 675272,
    negative: 42552,
    owners: "50,000,000 .. 100,000,000",
    price: 0.0,
    date: new Date(Date.now() + 3),
    version: 1
}));
//     games.push(new Game({
//         id: 0,
//         appid: 578080,
//         name: "PLAYERUNKNOWN'S BATTLEGROUNDS",
//         developer: "PUBG Corporation",
//         positive: 852614,
//         negative: 731646,
//         owners: "50,000,000 .. 100,000,000",
//         price: 29.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 304930,
//         name: "Unturned",
//         developer: "Smartly Dressed Games",
//         positive: 367700,
//         negative: 36048,
//         owners: "20,000,000 .. 50,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 230410,
//         name: "Warframe",
//         developer: "Digital Extremes",
//         positive: 355874,
//         negative: 36279,
//         owners: "20,000,000 .. 50,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 550,
//         name: "Left 4 Dead 2",
//         developer: "Valve",
//         positive: 404531,
//         negative: 11920,
//         owners: "20,000,000 .. 50,000,000",
//         price: 1.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 359550,
//         name: "Tom Clancy's Rainbow Six Siege",
//         developer: "Ubisoft Montreal",
//         positive: 685701,
//         negative: 94419,
//         owners: "20,000,000 .. 50,000,000",
//         price: 7.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 945360,
//         name: "Among Us",
//         developer: "Innersloth",
//         positive: 304183,
//         negative: 13684,
//         owners: "20,000,000 .. 50,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 271590,
//         name: "Grand Theft Auto V",
//         developer: "Rockstar North",
//         positive: 773360,
//         negative: 184657,
//         owners: "20,000,000 .. 50,000,000",
//         price: 14.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 4000,
//         name: "Garry's Mod",
//         developer: "Facepunch Studios",
//         positive: 596073,
//         negative: 22020,
//         owners: "20,000,000 .. 50,000,000",
//         price: 6.69
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 10,
//         name: "Counter-Strike",
//         developer: "Valve",
//         positive: 163210,
//         negative: 4268,
//         owners: "10,000,000 .. 20,000,000",
//         price: 9.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 340,
//         name: "Half-Life 2: Lost Coast",
//         developer: "Valve",
//         positive: 7293,
//         negative: 1141,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 236390,
//         name: "War Thunder",
//         developer: "Gaijin Entertainment",
//         positive: 144719,
//         negative: 35270,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 444090,
//         name: "Paladins",
//         developer: "Evil Mojo Games",
//         positive: 241160,
//         negative: 40625,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 272060,
//         name: "Serena",
//         developer: "Senscape",
//         positive: 4760,
//         negative: 1423,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 218620,
//         name: "PAYDAY 2",
//         developer: "OVERKILL - a Starbreeze Studio.",
//         positive: 404133,
//         negative: 59047,
//         owners: "10,000,000 .. 20,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 238960,
//         name: "Path of Exile",
//         developer: "Grinding Gear Games",
//         positive: 134626,
//         negative: 9783,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 105600,
//         name: "Terraria",
//         developer: "Re-Logic",
//         positive: 595227,
//         negative: 13119,
//         owners: "10,000,000 .. 20,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 49520,
//         name: "Borderlands 2",
//         developer: "Gearbox Software, Aspyr (Mac), Aspyr (Linux)",
//         positive: 220171,
//         negative: 15618,
//         owners: "10,000,000 .. 20,000,000",
//         price: 19.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 291550,
//         name: "Brawlhalla",
//         developer: "Blue Mammoth Games",
//         positive: 153213,
//         negative: 27518,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 227940,
//         name: "Heroes & Generals",
//         developer: "RETO MOTO",
//         positive: 83911,
//         negative: 40784,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 1085660,
//         name: "Destiny 2",
//         developer: "Bungie",
//         positive: 251172,
//         negative: 37498,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 240,
//         name: "Counter-Strike: Source",
//         developer: "Valve",
//         positive: 108003,
//         negative: 4471,
//         owners: "10,000,000 .. 20,000,000",
//         price: 9.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 275390,
//         name: "Guacamelee! Super Turbo Championship Edition",
//         developer: "DrinkBox Studios",
//         positive: 4774,
//         negative: 398,
//         owners: "10,000,000 .. 20,000,000",
//         price: 4.49
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 291480,
//         name: "Warface",
//         developer: "MY.GAMES",
//         positive: 42297,
//         negative: 19114,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 252490,
//         name: "Rust",
//         developer: "Facepunch Studios",
//         positive: 414030,
//         negative: 76369,
//         owners: "10,000,000 .. 20,000,000",
//         price: 26.79
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 220,
//         name: "Half-Life 2",
//         developer: "Valve",
//         positive: 106135,
//         negative: 3052,
//         owners: "10,000,000 .. 20,000,000",
//         price: 1.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 252950,
//         name: "Rocket League",
//         developer: "Psyonix LLC",
//         positive: 426888,
//         negative: 52342,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 620,
//         name: "Portal 2",
//         developer: "Valve",
//         positive: 212560,
//         negative: 2652,
//         owners: "10,000,000 .. 20,000,000",
//         price: 1.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 550650,
//         name: "Black Squad",
//         developer: "NS STUDIO, VALOFE",
//         positive: 55509,
//         negative: 16015,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 304050,
//         name: "Trove",
//         developer: "Trion Worlds",
//         positive: 61691,
//         negative: 15352,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 755790,
//         name: "Ring of Elysium",
//         developer: "Aurora Studio",
//         positive: 68951,
//         negative: 22414,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 386360,
//         name: "SMITE",
//         developer: "Titan Forge Games",
//         positive: 59983,
//         negative: 14145,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 433850,
//         name: "Z1 Battle Royale",
//         developer: "Daybreak Game Company",
//         positive: 114787,
//         negative: 93575,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 431960,
//         name: "Wallpaper Engine",
//         developer: "Wallpaper Engine Team",
//         positive: 241510,
//         negative: 4388,
//         owners: "10,000,000 .. 20,000,000",
//         price: 3.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 320,
//         name: "Half-Life 2: Deathmatch",
//         developer: "Valve",
//         positive: 7885,
//         negative: 909,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 44350,
//         name: "GRID 2",
//         developer: "Codemasters Racing",
//         positive: 21100,
//         negative: 4342,
//         owners: "10,000,000 .. 20,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 219990,
//         name: "Grim Dawn",
//         developer: "Crate Entertainment",
//         positive: 52929,
//         negative: 4022,
//         owners: "10,000,000 .. 20,000,000",
//         price: 6.24
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 360,
//         name: "Half-Life Deathmatch: Source",
//         developer: "Valve",
//         positive: 1919,
//         negative: 619,
//         owners: "10,000,000 .. 20,000,000",
//         price: 1.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 8930,
//         name: "Sid Meier's Civilization V",
//         developer: "Firaxis Games, Aspyr (Mac), Aspyr (Linux)",
//         positive: 161387,
//         negative: 6492,
//         owners: "5,000,000 .. 10,000,000",
//         price: 29.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 582010,
//         name: "Monster Hunter: World",
//         developer: "CAPCOM Co., Ltd.",
//         positive: 229821,
//         negative: 45135,
//         owners: "5,000,000 .. 10,000,000",
//         price: 19.79
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 292030,
//         name: "The Witcher 3: Wild Hunt",
//         developer: "CD PROJEKT RED",
//         positive: 418151,
//         negative: 8272,
//         owners: "5,000,000 .. 10,000,000",
//         price: 11.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 70,
//         name: "Half-Life",
//         developer: "Valve",
//         positive: 50266,
//         negative: 1874,
//         owners: "5,000,000 .. 10,000,000",
//         price: 1.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 72850,
//         name: "The Elder Scrolls V: Skyrim",
//         developer: "Bethesda Game Studios",
//         positive: 275257,
//         negative: 15453,
//         owners: "5,000,000 .. 10,000,000",
//         price: 19.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 477160,
//         name: "Human: Fall Flat",
//         developer: "No Brakes Games",
//         positive: 105256,
//         negative: 6628,
//         owners: "5,000,000 .. 10,000,000",
//         price: 5.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 227300,
//         name: "Euro Truck Simulator 2",
//         developer: "SCS Software",
//         positive: 342086,
//         negative: 9070,
//         owners: "5,000,000 .. 10,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 346110,
//         name: "ARK: Survival Evolved",
//         developer: "Studio Wildcard, Instinct Games, Efecto Studios, Virtual Basement LLC",
//         positive: 288451,
//         negative: 82435,
//         owners: "5,000,000 .. 10,000,000",
//         price: 9.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 400,
//         name: "Portal",
//         developer: "Valve",
//         positive: 75941,
//         negative: 1345,
//         owners: "5,000,000 .. 10,000,000",
//         price: 1.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 224260,
//         name: "No More Room in Hell",
//         developer: "No More Room in Hell Team",
//         positive: 52876,
//         negative: 6164,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 50,
//         name: "Half-Life: Opposing Force",
//         developer: "Gearbox Software",
//         positive: 9386,
//         negative: 492,
//         owners: "5,000,000 .. 10,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 218230,
//         name: "PlanetSide 2",
//         developer: "Rogue Planet Games",
//         positive: 47581,
//         negative: 9899,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 333930,
//         name: "Dirty Bomb",
//         developer: "Splash Damage",
//         positive: 46863,
//         negative: 11050,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 381210,
//         name: "Dead by Daylight",
//         developer: "Behaviour Interactive Inc.",
//         positive: 311855,
//         negative: 69477,
//         owners: "5,000,000 .. 10,000,000",
//         price: 7.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 130,
//         name: "Half-Life: Blue Shift",
//         developer: "Gearbox Software",
//         positive: 6738,
//         negative: 697,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 739630,
//         name: "Phasmophobia",
//         developer: "Kinetic Games",
//         positive: 72450,
//         negative: 2363,
//         owners: "5,000,000 .. 10,000,000",
//         price: 12.59
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 203160,
//         name: "Tomb Raider",
//         developer: "Crystal Dynamics, Eidos-Montréal, Feral Interactive (Mac), Feral Interactive (Linux)",
//         positive: 165973,
//         negative: 6437,
//         owners: "5,000,000 .. 10,000,000",
//         price: 2.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 322330,
//         name: "Don't Starve Together",
//         developer: "Klei Entertainment",
//         positive: 206376,
//         negative: 7934,
//         owners: "5,000,000 .. 10,000,000",
//         price: 5.09
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 1046930,
//         name: "Dota Underlords",
//         developer: "Valve",
//         positive: 71083,
//         negative: 13861,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 582660,
//         name: "Black Desert Online",
//         developer: "Pearl Abyss",
//         positive: 25564,
//         negative: 8757,
//         owners: "5,000,000 .. 10,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 278360,
//         name: "A Story About My Uncle",
//         developer: "Gone North Games",
//         positive: 23889,
//         negative: 2088,
//         owners: "5,000,000 .. 10,000,000",
//         price: 4.49
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 60,
//         name: "Ricochet",
//         developer: "Valve",
//         positive: 3310,
//         negative: 774,
//         owners: "5,000,000 .. 10,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 444200,
//         name: "World of Tanks Blitz",
//         developer: "Wargaming Group Limited",
//         positive: 44650,
//         negative: 12169,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 273110,
//         name: "Counter-Strike Nexon: Studio",
//         developer: "Valve Corporation, Nexon Korea Corporation",
//         positive: 24648,
//         negative: 12928,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 261550,
//         name: "Mount & Blade II: Bannerlord",
//         developer: "TaleWorlds Entertainment",
//         positive: 117436,
//         negative: 17753,
//         owners: "5,000,000 .. 10,000,000",
//         price: 44.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 255710,
//         name: "Cities: Skylines",
//         developer: "Colossal Order Ltd.",
//         positive: 125961,
//         negative: 10034,
//         owners: "5,000,000 .. 10,000,000",
//         price: 29.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 413150,
//         name: "Stardew Valley",
//         developer: "ConcernedApe",
//         positive: 269633,
//         negative: 6437,
//         owners: "5,000,000 .. 10,000,000",
//         price: 11.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 1089350,
//         name: "NBA 2K20",
//         developer: "Visual Concepts",
//         positive: 25539,
//         negative: 26364,
//         owners: "5,000,000 .. 10,000,000",
//         price: 59.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 417910,
//         name: "Street Warriors Online",
//         developer: "Crazy Rocks Studios",
//         positive: 977,
//         negative: 722,
//         owners: "5,000,000 .. 10,000,000",
//         price: 1.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 588430,
//         name: "Fallout Shelter",
//         developer: "Bethesda Game Studios",
//         positive: 33281,
//         negative: 4679,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 221380,
//         name: "Age of Empires II (2013)",
//         developer: "Skybox Labs, Hidden Path Entertainment, Ensemble Studios, Forgotten Empires",
//         positive: 80281,
//         negative: 3836,
//         owners: "5,000,000 .. 10,000,000",
//         price: 19.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 500,
//         name: "Left 4 Dead",
//         developer: "Valve",
//         positive: 27732,
//         negative: 1242,
//         owners: "5,000,000 .. 10,000,000",
//         price: 1.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 10180,
//         name: "Call of Duty: Modern Warfare 2",
//         developer: "Infinity Ward",
//         positive: 37028,
//         negative: 3089,
//         owners: "5,000,000 .. 10,000,000",
//         price: 19.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 439700,
//         name: "Z1 Battle Royale: Test Server",
//         developer: "Daybreak Game Company",
//         positive: 1282,
//         negative: 1131,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 700330,
//         name: "SCP: Secret Laboratory",
//         developer: "Northwood Studios",
//         positive: 71171,
//         negative: 7316,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 601150,
//         name: "Devil May Cry 5",
//         developer: "CAPCOM Co., Ltd.",
//         positive: 46853,
//         negative: 3584,
//         owners: "5,000,000 .. 10,000,000",
//         price: 19.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 30,
//         name: "Day of Defeat",
//         developer: "Valve",
//         positive: 4402,
//         negative: 486,
//         owners: "5,000,000 .. 10,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 300,
//         name: "Day of Defeat: Source",
//         developer: "Valve",
//         positive: 13498,
//         negative: 1419,
//         owners: "5,000,000 .. 10,000,000",
//         price: 9.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 377160,
//         name: "Fallout 4",
//         developer: "Bethesda Game Studios",
//         positive: 168692,
//         negative: 49256,
//         owners: "5,000,000 .. 10,000,000",
//         price: 29.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 863550,
//         name: "HITMAN 2",
//         developer: "IO Interactive A/S",
//         positive: 38733,
//         negative: 4280,
//         owners: "5,000,000 .. 10,000,000",
//         price: 29.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 40,
//         name: "Deathmatch Classic",
//         developer: "Valve",
//         positive: 1618,
//         negative: 350,
//         owners: "5,000,000 .. 10,000,000",
//         price: 4.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 420,
//         name: "Half-Life 2: Episode Two",
//         developer: "Valve",
//         positive: 21088,
//         negative: 789,
//         owners: "5,000,000 .. 10,000,000",
//         price: 1.59
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 813820,
//         name: "Realm Royale",
//         developer: "Heroic Leap Games",
//         positive: 31909,
//         negative: 11760,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 648800,
//         name: "Raft",
//         developer: "Redbeet Interactive",
//         positive: 67111,
//         negative: 7048,
//         owners: "5,000,000 .. 10,000,000",
//         price: 19.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 109600,
//         name: "Neverwinter",
//         developer: "Cryptic Studios",
//         positive: 23013,
//         negative: 6490,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 219740,
//         name: "Don't Starve",
//         developer: "Klei Entertainment",
//         positive: 79327,
//         negative: 2607,
//         owners: "5,000,000 .. 10,000,000",
//         price: 2.49
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 204360,
//         name: "Castle Crashers",
//         developer: "The Behemoth",
//         positive: 66821,
//         negative: 2780,
//         owners: "5,000,000 .. 10,000,000",
//         price: 2.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 380,
//         name: "Half-Life 2: Episode One",
//         developer: "Valve",
//         positive: 13633,
//         negative: 727,
//         owners: "5,000,000 .. 10,000,000",
//         price: 1.59
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 239140,
//         name: "Dying Light",
//         developer: "Techland",
//         positive: 184739,
//         negative: 10276,
//         owners: "5,000,000 .. 10,000,000",
//         price: 13.59
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 253710,
//         name: "theHunter Classic",
//         developer: "Expansive Worlds, Avalanche Studios",
//         positive: 15811,
//         negative: 16040,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 532210,
//         name: "Life is Strange 2",
//         developer: "DONTNOD Entertainment, Feral Interactive (Mac), Feral Interactive (Linux)",
//         positive: 15112,
//         negative: 2981,
//         owners: "5,000,000 .. 10,000,000",
//         price: 14.4
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 555570,
//         name: "Infestation: The New Z",
//         developer: "Fredaikis AB",
//         positive: 16299,
//         negative: 15175,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 273350,
//         name: "Evolve Stage 2",
//         developer: "Turtle Rock Studios",
//         positive: 30953,
//         negative: 14897,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 208090,
//         name: "Loadout",
//         developer: "Edge of Reality",
//         positive: 35148,
//         negative: 5431,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 1097150,
//         name: "Fall Guys: Ultimate Knockout",
//         developer: "Mediatonic",
//         positive: 206684,
//         negative: 51183,
//         owners: "5,000,000 .. 10,000,000",
//         price: 19.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 15700,
//         name: "Oddworld: Abe's Oddysee",
//         developer: "Oddworld Inhabitants",
//         positive: 3105,
//         negative: 504,
//         owners: "5,000,000 .. 10,000,000",
//         price: 2.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 407530,
//         name: "ARK: Survival Of The Fittest",
//         developer: "Studio Wildcard, Instinct Games, Efecto Studios, Virtual Basement LLC",
//         positive: 5501,
//         negative: 3449,
//         owners: "5,000,000 .. 10,000,000",
//         price: 9.99
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 346900,
//         name: "AdVenture Capitalist",
//         developer: "Hyper Hippo Games",
//         positive: 39275,
//         negative: 5078,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 113400,
//         name: "APB Reloaded",
//         developer: "Little Orbit",
//         positive: 22014,
//         negative: 12601,
//         owners: "5,000,000 .. 10,000,000",
//         price: 0.0
//     }));
//     games.push(new Game({
//         id: 0,
//         appid: 387990,
//         name: "Scrap Mechanic",
//         developer: "Axolot Games",
//         positive: 52973,
//         negative: 5050,
//         owners: "5,000,000 .. 10,000,000",
//         price: 13.39
//     }));
//
// }

let lastUpdated = games[games.length - 1].date;
let lastId = games[games.length - 1].id;
// const pageSize = 10;

const broadcast = data =>
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });

const router = new Router();

router.get('/games', ctx => {
    // const ifModifiedSince = ctx.request.get('If-Modif ied-Since');
    // if (ifModifiedSince && new Date(ifModifiedSince).getTime() >= lastUpdated.getTime() - lastUpdated.getMilliseconds()) {
    //     ctx.response.status = 304; // NOT MODIFIED
    //     return;
    // }
    // const name = ctx.request.query.name;
    // const page = parseInt(ctx.request.query.page) || 1;
    // ctx.response.set('Last-Modified', lastUpdated.toUTCString());
    // const sortedGames = games
    //     .filter(game => name ? game.name.indexOf(name) !== -1 : true)
    //     .sort((n1, n2) => -(n1.date.getTime() - n2.date.getTime()));
    // const offset = (page - 1) * pageSize;
    // ctx.response.body = {
    //   page,
    //   games: sortedGames.slice(offset, offset + pageSize),
    //   more: offset + pageSize < sortedGames.length
    // };
    ctx.response.body = games;
    ctx.response.status = 200;
});

router.get('/games/:id', async (ctx) => {
    const gameId = ctx.request.params.id;
    const game = games.find(game => gameId === game.id);
    if (game) {
        ctx.response.body = game;
        ctx.response.status = 200; // ok
    } else {
        ctx.response.body = {issue: [{warning: `game with id ${gameId} not found`}]};
        ctx.response.status = 404; // NOT FOUND (if you know the resource was deleted, then return 410 GONE)
    }
});

const createGame = async (ctx) => {
    const game = ctx.request.body;
    if (!game.name || !game.appid || !game.developer || !game.positive || !game.negative || !game.owners || !game.owners) { // validation
        ctx.response.body = {issue: [{error: 'Text is missing'}]};
        ctx.response.status = 400; //  BAD REQUEST
        return;
    }
    game.id = lastId + 1;
    lastId = game.id;
    games.push(game);
    ctx.response.body = game;
    ctx.response.status = 201; // CREATED
    broadcast({event: 'created', payload: {game}});
};

router.post('/games', async (ctx) => {
    await createGame(ctx);
});

router.put('/games/:id', async (ctx) => {
    const id = Number(ctx.params.id);
    const game = ctx.request.body;
    const gameId = game.id;
    if (gameId && id !== game.id) {
        ctx.response.body = {issue: [{error: `Param id and body id should be the same`}]};
        ctx.response.status = 400; // BAD REQUEST
        return;
    }
    if (!gameId) {
        await createGame(ctx);
        return;
    }
    const index = games.findIndex(game => game.id === id);
    if (index === -1) {
        ctx.response.body = {issue: [{error: `game with id ${id} not found`}]};
        ctx.response.status = 400; // BAD REQUEST
        return;
    }
    // const gameVersion = parseInt(ctx.request.get('ETag')) || game.version;
    // if (gameVersion < games[index].version) {
    //     ctx.response.body = {issue: [{error: `Version conflict`}]};
    //     ctx.response.status = 409; // CONFLICT
    //     return;
    // }
    game.version++;
    games[index] = game;
    lastUpdated = new Date();
    ctx.response.body = game;
    ctx.response.status = 200; // OK
    broadcast({event: 'updated', payload: {game}});
});

router.del('/games/:id', ctx => {
    const id = Number(ctx.params.id);
    const index = games.findIndex(game => id === game.id);
    console.log(index);
    if (index !== -1) {
        const game = games[index];
        games.splice(index, 1);
        lastUpdated = new Date();
        broadcast({event: 'deleted', payload: {game}});
    }
    ctx.response.status = 204; // no content
});

setInterval(() => {
    lastUpdated = new Date();
    lastId = lastId + 1;
    const game = new Game({
        id: lastId,
        appid: 730,
        name: `game ${lastId}`,
        developer: "Valve, Hidden Path Entertainment",
        positive: 4290831,
        negative: 589655,
        owners: "100,000,000 .. 200,000,000",
        price: 0.0,
        date: lastUpdated,
        version: 1
    });
    games.push(game);
    console.log(`${game.name}`);
    broadcast({event: 'created', payload: {game}});
}, 10000);

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(3000);
