import { chunkArray } from "../utils/helpers.js";

export function buildSessions(words, size = 20) {
    const chunks = chunkArray(words, size);
    return chunks.map((chunk, i) => ({
        id: i,
        title: `Session ${i + 1}`,
        startIndex: i * size + 1,
        endIndex: i * size + chunk.length,
        words: chunk
    }));
}
