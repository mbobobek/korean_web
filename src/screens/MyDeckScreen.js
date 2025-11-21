import { MyDeckCard } from "../components/MyDeckCard.js";

export function MyDeckScreen({ store, onBack, onStartDeckSession }) {
    const root = document.createElement("div");
    root.className = "screen-fade flex flex-col items-center mt-4 px-4";

    root.innerHTML = `
        <h2 class="text-2xl font-semibold mb-2">MyDeck — Sevimli so‘zlar</h2>
        <p class="text-sm text-white/70 mb-3">
            O‘zingiz belgilagan so‘zlarni bu yerda alohida o‘rganishingiz mumkin.
        </p>
        <div id="listDeck" class="w-full max-w-md flex flex-col gap-2 mb-4"></div>
        <div class="flex gap-3">
            <button id="startBtn"
                class="px-4 py-2 rounded-2xl bg-indigo-500 text-sm">
                ▶ MyDeck bilan o‘qish
            </button>
            <button id="backBtn"
                class="px-4 py-2 rounded-2xl bg-white/10 text-sm">
                ⬅ Ortga
            </button>
        </div>
    `;

    const list = root.querySelector("#listDeck");

    if (!store.deck.length) {
        const empty = document.createElement("div");
        empty.className = "text-white/60 text-sm mt-4";
        empty.textContent = "Hali saqlangan so‘zlar yo‘q.";
        list.appendChild(empty);
    } else {
        store.deck.forEach(w => list.appendChild(MyDeckCard(w)));
    }

    root.querySelector("#backBtn").onclick = onBack;
    root.querySelector("#startBtn").onclick = () => {
        if (!store.deck.length) {
            alert("Hali MyDeck bo‘sh.");
            return;
        }
        onStartDeckSession();
    };

    return root;
}
