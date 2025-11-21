export function MyDeckCard(word) {
    const el = document.createElement("div");
    el.className = `
        flashcard-glass px-4 py-3 rounded-2xl
        flex justify-between items-center
    `;
    el.innerHTML = `
        <div>
            <div class="text-base font-semibold">${word.kr}</div>
            <div class="text-xs text-white/70">${word.uz}</div>
        </div>
    `;
    return el;
}
