let words = [];
let index = 0;
let selectedBook = null;
let selectedGwa = null;

// ---- API URL ----
const API_BASE = "https://koreanapi-production.up.railway.app";

// ---- Elements ----
const card = document.getElementById("card");
const front = document.getElementById("front");
const back = document.getElementById("back");

let isFlipped = false;

// ------------------------------
// 🔥 TOUCH (MOBILE)
// ------------------------------
card.addEventListener("touchstart", () => {
    isFlipped = true;
    card.style.transform = "rotateY(180deg)";
});

card.addEventListener("touchend", () => {
    setTimeout(() => {
        isFlipped = false;
        card.style.transform = "rotateY(0deg)";
    }, 150);
});

// ------------------------------
// 💻 DESKTOP CLICK FLIP
// ------------------------------
card.addEventListener("click", () => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    if (isFlipped) {
        card.style.transform = "rotateY(0deg)";
        isFlipped = false;
    } else {
        card.style.transform = "rotateY(180deg)";
        isFlipped = true;
    }
});


// ------------------------------
// 🔄 LOAD WORDS FROM BACKEND
// ------------------------------
async function loadWords(book, gwa) {
    front.innerText = "⏳ Yuklanmoqda...";
    back.innerText = "";

    const url = `${API_BASE}/api/flashcards?book=${book}&gwa=${gwa}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        words = data.words || [];
        index = 0;

        loadCard();
    } catch (error) {
        front.innerText = "❌ API xatosi";
        back.innerText = "";
    }
}


// ------------------------------
// 🃏 LOAD SINGLE CARD
// ------------------------------
function loadCard() {
    if (words.length === 0) {
        front.innerText = "🚫 So‘zlar topilmadi";
        back.innerText = "";
        return;
    }

    const w = words[index];

    // Smooth animation
    card.style.opacity = "0";

    setTimeout(() => {
        front.innerText = w.kr; // Korean
        back.innerText = w.uz;  // Uzbek

        card.style.transform = "rotateY(0deg)";
        isFlipped = false;
        card.style.opacity = "1";
    }, 200);
}


// ------------------------------
// ▶ NEXT CARD
// ------------------------------
document.getElementById("nextBtn").onclick = () => {
    if (words.length === 0) return;

    index = (index + 1) % words.length;
    loadCard();
};


// ------------------------------
// 🔊 KOREAN TTS
// ------------------------------
document.getElementById("ttsBtn").onclick = () => {
    if (words.length === 0) return;

    const t = new SpeechSynthesisUtterance(words[index].kr);
    t.lang = "ko-KR";
    t.rate = 0.9;
    t.pitch = 1.1;

    speechSynthesis.cancel();
    speechSynthesis.speak(t);
};


// ------------------------------
// 📘 BOOK SELECTION
// ------------------------------
document.querySelectorAll(".bookBtn").forEach(btn => {
    btn.onclick = () => {
        selectedBook = btn.dataset.book;

        const gwaList = document.getElementById("gwaList");
        gwaList.innerHTML = "";

        for (let i = 1; i <= 8; i++) {
            const b = document.createElement("button");
            b.className =
                "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-2 rounded-xl shadow";
            b.innerText = `${i}과`;

            b.onclick = () => {
                selectedGwa = i;
                loadWords(selectedBook, selectedGwa);
                showScreen("screen-flashcards");
            };

            gwaList.appendChild(b);
        }

        showScreen("screen-gwa");
    };
});


// ------------------------------
// 🔙 BACK BUTTONS
// ------------------------------
document.getElementById("backToBooks").onclick = () =>
    showScreen("screen-books");

document.getElementById("backToGwa").onclick = () =>
    showScreen("screen-gwa");


// ------------------------------
// 🖥 SCREEN MANAGER
// ------------------------------
function showScreen(id) {
    const screens = ["screen-books", "screen-gwa", "screen-flashcards"];
    screens.forEach(s => document.getElementById(s).classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}
