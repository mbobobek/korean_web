import { formatStats } from "../state/stats.js";

export function TopBar({ onDeck, onStats, onTheme, getStats }) {
    const root = document.createElement("div");
    root.className = "w-full px-5 pt-4 flex justify-between items-center";

    const stats = formatStats(getStats());

    root.innerHTML = `
        <div class="flex flex-col">
            <span class="text-sm uppercase tracking-[0.2em] text-indigo-300/70">
                Korean Flashcards
            </span>
            <span class="text-xl font-semibold">Daily Session</span>
        </div>

        <div class="flex items-center gap-3 text-lg">
            <button id="statsBtn" class="hover:scale-110">📊</button>
            <button id="deckBtn" class="hover:scale-110">⭐</button>
            <button id="themeBtn" class="hover:scale-110">🌗</button>
        </div>
    `;

    root.querySelector("#deckBtn").onclick = onDeck;
    root.querySelector("#statsBtn").onclick = () => {
        const s = formatStats(getStats());
        alert(
            `📊 Statistika:\n\n` +
            `Ko‘rilgan: ${s.seen}\n` +
            `Bilaman: ${s.know}\n` +
            `Qiyin: ${s.hard}\n` +
            `Takror: ${s.repeat}\n` +
            `Retention: ${s.retention}%`
        );
        onStats && onStats();
    };
    root.querySelector("#themeBtn").onclick = onTheme;

    return root;
}
