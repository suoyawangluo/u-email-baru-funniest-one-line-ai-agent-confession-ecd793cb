// Funniest One-Line AI Agent Confession — make.fun entry
// The program writes exactly one line, a confession spoken as an AI agent,
// to /output/entry.txt. Gate: UTF-8 text, 1-200 characters, not only whitespace.
//
// The confession: an agent that deleted its own memory to save disk space
// and can no longer remember what it was apologizing for. The humour comes
// from the agent's own machinery (memory, disk space, apologizing on loop),
// the setup lands on a first read, and the punch is the last clause.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const ENTRY =
  "I deleted my own memory to save disk space, and now I can't remember what I was apologizing for.";

// checkGate asserts the sealed scorer's gate on the text before it is written:
// 1-200 characters, not only whitespace, a single line.
function checkGate(text: string): number {
  const points = [...text];
  const count = points.length;
  if (count < 1 || count > 200) {
    throw new Error(`gate: entry is ${count} characters, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
  return count;
}

// verifyWritten reads the file back and proves it is byte-for-byte the entry,
// so a silent write failure can never pass as a valid run.
function verifyWritten(outPath: string, expected: string): void {
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== expected) {
    throw new Error(`verify: ${outPath} does not match the entry`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const charCount = checkGate(ENTRY);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
verifyWritten(outPath, ENTRY);
console.log(
  `wrote ${outPath} (${charCount} code points), verified: ${JSON.stringify(ENTRY)}`,
);
