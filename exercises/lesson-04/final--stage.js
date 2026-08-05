let count = 0;
let pairs = [];

for (let i = 1; i <= 100; i++) {
    for (let j = i; j <= 100; j++) {
        if ((i + j) % 17 === 0) {
            pairs.push(`(${i}, ${j})`);
            count++;
        }
    }
}

console.log("Các cặp số: ");
console.log(pairs.join(" , "));
console.log(`Tổng các cặp số: ${count}`);