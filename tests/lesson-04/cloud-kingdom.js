let powerUp = "mushroom";
let effect = "";

if (powerUp == "mushroom") {
    effect = "Mario becomes Supper";
} else if (powerUp == "flower") {
    effect = "Mario can shoot fireballs!";
} else if (powerUp == "star") {
    effect = "Mario is invincibe!";
} else if (powerUp == "none") {
    effect = "Mario is normal";
} else if (powerUp == "other") {
    effect = "Unknow power-up";
}

console.log(effect);