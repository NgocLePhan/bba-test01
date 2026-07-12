const playerName = "Mario";
let currentLives = 3;
const level1Coins = 25;
const level2Coins = 30;
const level3Coins = 45;

const totalCoins = level1Coins + level2Coins + level3Coins;
const avgCoins = totalCoins / 3;
const remainderCoin = totalCoins % 3;

console.log("Total Coins: " + totalCoins);
console.log("AVG Coins: " + avgCoins);
console.log("Remainder Coins: " + remainderCoin);