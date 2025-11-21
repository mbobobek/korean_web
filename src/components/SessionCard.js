export function SessionCard(session, onClick) {
    const el = document.createElement("button");
    el.className = `
        flashcard-glass w-full text-left px-4 py-3 rounded-2xl
        flex justify-between items-center hover:scale-[1.02]
    `;

    el.innerHTML = `
        <div>
            <div class="text-sm text-indigo-200/80">${session.title}</div>
            <div class="text-xs text-white/70">
                So‘zlar: ${session.startIndex} – ${session.endIndex}
            </div>
        </div>
        <div class="text-lg">▶</div>
    `;

    el.onclick = onClick;
    return el;
}
