import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(__dirname, "../data/db.json");

export type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  role: string;
};

// NEW TYPE: Comments within a request
export type CommentItem = {
  id: string;          // unique id of the comment
  author: string;      // email or name of the user who comments
  text: string;        // content of the comment
  timestamp: string;   // ISO date
};

export type RequestItem = {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userEmail: string;
  comments?: CommentItem[];   // NEW — List of comments
};

export type Database = {
  users: User[];
  requests: RequestItem[];
};

async function ensureDbFile() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initial: Database = { users: [], requests: [] };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(initial, null, 2), "utf8");
  }
}

export async function readDb(): Promise<Database> {
  await ensureDbFile();
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw) as Database;
}

export async function writeDb(db: Database): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}
