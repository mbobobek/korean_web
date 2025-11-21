import { enableTilt } from "../utils/tilt.js";
import { enableSwipe } from "../utils/swipe.js";
import { ttsKorean } from "../utils/helpers.js";

export function FlashCard({ word, isSaved, onSwipe, onToggleSave }) {
    const card = document.createElement("div");
    card.className = `
        w-[90%] max-w-md h-[340px] mx-auto mt-6
        flashcard-glass tilt swipe-shadow
        flex flex-col justify-between items-stretch p-5
    `;

    card.innerHTML = `
        <div class="flex justify-between items-center text-xs text-white/70">
            <span>Swipe: ◀ Qiyin • ▶ Bilaman • ▲ Saqlash • ▼ Takror</span>
            <button id="ttsBtn" class="text-lg">🔊</button>
        </div>

        <div class="flex-1 flex items-center justify-center">
            <div class="front text-4xl font-bold">${word.kr}</div>
            <div class="back hidden text-3xl font-semibold">${word.uz}</div>
        </div>

        <div class="flex justify-between items-center pt-2">
            <button id="flipBtn"
                class="text-sm px-3 py-1 rounded-full bg-white/10">
                ↻ Tomonini almashtirish
            </button>
            <button id="saveBtn"
                class="text-sm px-3 py-1 rounded-full ${
                    isSaved ? "bg-yellow-400 text-black" : "bg-white/10"
                }">
                ${isSaved ? "⭐ MyDeckda" : "☆ Saqlash"}
            </button>
        </div>
    `;

    const front = card.querySelector(".front");
    const back = card.querySelector(".back");
    const flipBtn = card.querySelector("#flipBtn");
    const ttsBtn = card.querySelector("#ttsBtn");
    const saveBtn = card.querySelector("#saveBtn");

    let flipped = false;

    flipBtn.onclick = () => {
        flipped = !flipped;
        front.classList.toggle("hidden");
        back.classList.toggle("hidden");
    };

    ttsBtn.onclick = () => ttsKorean(word.kr);

    saveBtn.onclick = () => {
        onToggleSave();
    };

    enableTilt(card);
    enableSwipe(card, {
        onRight: () => onSwipe("know"),
        onLeft: () => onSwipe("hard"),
        onDown: () => onSwipe("repeat"),
        onUp: () => onSwipe("save")
    });

    return card;
}
