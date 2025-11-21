import { FlashCard } from "../components/FlashCard.js";
import { ProgressBar } from "../components/ProgressBar.js";

export function FlashcardScreen({
    store,
    onBackToSessions,
    onGoDeckFromSession
}) {
    const root = document.createElement("div");
    root.className = "screen-fade flex flex-col items-center mt-2";

    const session = store.getCurrentSession();
    const total = session.words.length || 1;
    const currentIndex = store.currentCardIndex + 1;

    const title = document.createElement("div");
    title.className = "mt-1 text-sm text-white/70";
    title.textContent =
        `${store.book} • ${store.gwa}과 • Session ${store.currentSessionIndex + 1}`;

    root.appendChild(title);

    const progress = ProgressBar({ value: currentIndex, max: total });
    root.appendChild(progress);

    const word = store.getCurrentWord();
    if (!word) {
        const info = document.createElement("div");
        info.className = "mt-10 text-center text-white/70";
        info.textContent = "So‘zlar topilmadi.";
        root.appendChild(info);
    } else {
        const card = FlashCard({
            word,
            isSaved: store.isSaved(word),
            onSwipe: (action) => {
                if (action === "save") {
                    store.toggleSave(word);
                    alert("MyDeck yangilandi.");
                } else {
                    store.swipe(action);
                }
                // qayta render qilamiz
                onGoDeckFromSession(false); // flag emas, shunchaki trigger
            },
            onToggleSave: () => {
                store.toggleSave(word);
                alert("MyDeck yangilandi.");
            }
        });
        root.appendChild(card);
    }

    const bottom = document.createElement("div");
    bottom.className = "mt-5 flex gap-3";
    bottom.innerHTML = `
        <button id="prevBtn"
            class="px-4 py-2 rounded-2xl bg-white/10 text-sm">
            ⬅ Oldingi
        </button>
        <button id="nextBtn"
            class="px-4 py-2 rounded-2xl bg-indigo-500 text-sm">
            Keyingi ➡
        </button>
    `;
    root.appendChild(bottom);

    bottom.querySelector("#prevBtn").onclick = () => {
        store.prevCard();
        onGoDeckFromSession(false);
    };
    bottom.querySelector("#nextBtn").onclick = () => {
        store.nextCard();
        onGoDeckFromSession(false);
    };

    const backBtn = document.createElement("button");
    backBtn.className = "mt-3 text-sm text-white/70 underline";
    backBtn.textContent = "⬅ Sessionlarga qaytish";
    backBtn.onclick = onBackToSessions;
    root.appendChild(backBtn);

    return root;
}
