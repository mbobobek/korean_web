export function GwaScreen({ book, onBack, onSelectGwa }) {
    const root = document.createElement("div");
    root.className = "screen-fade flex flex-col items-center mt-4";

    root.innerHTML = `
        <h2 class="text-2xl font-semibold mb-2">${book} — bo‘limni tanlang</h2>
        <div class="grid grid-cols-3 gap-3 w-full max-w-xs mb-5" id="gwaGrid"></div>
        <button class="mt-2 text-sm text-white/70 underline" id="backBtn">
            ⬅ Kitobga qaytish
        </button>
    `;

    const grid = root.querySelector("#gwaGrid");
    for (let i = 1; i <= 8; i++) {
        const b = document.createElement("button");
        b.className = `
            flashcard-glass py-2 rounded-2xl text-lg
            hover:scale-[1.05]
        `;
        b.textContent = `${i}과`;
        b.onclick = () => onSelectGwa(i);
        grid.appendChild(b);
    }

    root.querySelector("#backBtn").onclick = onBack;

    return root;
}
