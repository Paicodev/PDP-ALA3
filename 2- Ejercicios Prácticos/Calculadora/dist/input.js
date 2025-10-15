"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = input;
exports.close = close;
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
/** Devuelve una promesa que resuelve un string */
function input(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}
function close() {
    rl.close();
}
