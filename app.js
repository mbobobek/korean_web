let words = [];
let index = 0;
let selectedBook = null;
let selectedGwa = null;
let shuffle = false;

const API_BASE = "https://koreanapi-production.up.railway.app";

// Elements
const body = document.getElementById("body");
const card = document.getElementById("card");
const front = document.getElementById("front");
const back = document.getElementById("back");

let isFlipped = false;

// 🔀 SHUFFLE MODE
document.getElementById("shuffleBtn").onclick = () => {
    shuffle = !shuffle;
    document.getElementById("shuffleBtn").innerText =
        shuffle ? "🔀 Shuffle ON" : "🔀 Shuffle OFF";
};

// 🌗 THEME MODE
document.getElementById("themeBtn").onclick = () => {
    body.classList.toggle("light");
    document.getElementById("themeBtn").innerText =
        body.classList.contains("light") ? "☀️ Light" : "🌙 Dark";
};

// 🖼 CLICK–FLIP (universal)
card.addEventListener("click", () => {
    isFlipped = !isFlipped;
    card.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
});

// 🔄 LOAD WORDS
async function loadWords(book, gwa) {
    front.innerText = "⏳ Yuklanmoqda...";
    back.innerText = "";

    const res = await fetch(`${API_BASE}/api/flashcards?book=${book}&gwa=${gwa}`);
    const data = await res.json();

    words = data.words || [];

    if (shuffle) shuffleArray(words);

    index = 0;
    loadCard();
    loadStats();
}

// 🔀 SHUFFLE FUNCTION
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// 🃏 LOAD CARD
function loadCard() {
    if (words.length === 0) {
        front.innerText = "🚫 So‘zlar topilmadi";
        back.innerText = "";
        return;
    }

    const w = words[index];

    card.style.opacity = "0";
    setTimeout(() => {
        front.innerText = w.kr;
        back.innerText = w.uz;

        card.style.transform = "rotateY(0deg)";
        isFlipped = false;

        card.style.opacity = "1";

        saveProgress();
        loadStats();
    }, 150);
}

// ▶ NEXT
document.getElementById("nextBtn").onclick = () => {
    index = (index + 1) % words.length;
    loadCard();
};

// ◀ PREVIOUS
document.getElementById("prevBtn").onclick = () => {
    index = (index - 1 + words.length) % words.length;
    loadCard();
};

// 🔊 TTS
document.getElementById("ttsBtn").onclick = () => {
    const t = new SpeechSynthesisUtterance(words[index].kr);
    t.lang = "ko-KR";
    t.rate = 0.9;
    t.pitch = 1.1;
    speechSynthesis.cancel();
    speechSynthesis.speak(t);
};

// 📘 BOOK SELECTION
document.querySelectorAll(".bookBtn").forEach(btn => {
    btn.onclick = () => {
        selectedBook = btn.dataset.book;

        const gwaList = document.getElementById("gwaList");
        gwaList.innerHTML = "";

        for (let i = 1; i <= 8; i++) {
            const b = document.createElement("button");
            b.className = "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-2 rounded-xl shadow";
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

// 🔙 BACK BUTTONS
document.getElementById("backToBooks").onclick = () => showScreen("screen-books");
document.getElementById("backToGwa").onclick = () => showScreen("screen-gwa");

// 🖥 SCREEN MANAGER
function showScreen(id) {
    const screens = ["screen-books", "screen-gwa", "screen-flashcards"];
    screens.forEach(s => document.getElementById(s).classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// 📊 STATS (localStorage)
function saveProgress() {
    const key = `${selectedBook}_${selectedGwa}`;
    let stats = JSON.parse(localStorage.getItem("flash_stats") || "{}");

    stats[key] = {
        total: words.length,
        viewed: index + 1
    };

    localStorage.setItem("flash_stats", JSON.stringify(stats));
}

function loadStats() {
    const key = `${selectedBook}_${selectedGwa}`;
    let stats = JSON.parse(localStorage.getItem("flash_stats") || "{}");

    if (!stats[key]) {
        document.getElementById("statsBox").innerText = "";
        return;
    }

    const { viewed, total } = stats[key];

    const percent = ((viewed / total) * 100).toFixed(1);

    document.getElementById("statsBox").innerText =
        `📊 Progress: ${percent}% (${viewed}/${total})`;
}
