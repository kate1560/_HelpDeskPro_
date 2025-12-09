"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDb = readDb;
exports.writeDb = writeDb;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path")); 

// Path to the JSON database file
const DB_PATH = path_1.default.join(__dirname, "../data/db.json");
async function ensureDbFile() {
    try {
        await fs_1.promises.access(DB_PATH);
    }
    catch {
        const initial = { users: [], requests: [] };
        await fs_1.promises.mkdir(path_1.default.dirname(DB_PATH), { recursive: true });
        await fs_1.promises.writeFile(DB_PATH, JSON.stringify(initial, null, 2), "utf8");
    }
}

// Reads and returns the database JSON content
async function readDb() {
    await ensureDbFile();
    const raw = await fs_1.promises.readFile(DB_PATH, "utf8");
    return JSON.parse(raw);
}
async function writeDb(db) {
    await fs_1.promises.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}
