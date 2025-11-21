import { TopBar } from "./components/TopBar.js";
import { HomeScreen } from "./screens/HomeScreen.js";
import { GwaScreen } from "./screens/GwaScreen.js";
import { SessionScreen } from "./screens/SessionScreen.js";
import { FlashcardScreen } from "./screens/FlashcardScreen.js";
import { MyDeckScreen } from "./screens/MyDeckScreen.js";

import { store } from "./state/store.js";
import { fetchWords } from "./utils/api.js";

const body = document.getElementById("body");
const screenRoot = document.getElementById("screen-root");
const topbarRoot = document.getElementById("topbar-root");

function renderTopbar() {
    topbarRoot.innerHTML = "";
    topbarRoot.appendChild(
        TopBar({
            getStats: () => store.stats,
            onDeck: () => navigate("deck"),
            onStats: () => {}, // alert ichida ko'rsatdik
            onTheme: toggleTheme
        })
    );
}

function toggleTheme() {
    const next = store.theme === "dark" ? "light" : "dark";
    store.setTheme(next);
    if (next === "light") {
        body.classList.add("bg-white", "text-black");
    } else {
        body.classList.remove("bg-white", "text-black");
    }
}

// Router state
let currentScreen = "home";
let fromDeck = false;

async function navigate(screen) {
    currentScreen = screen;
    screenRoot.innerHTML = "";

    if (screen === "home") {
        const home = HomeScreen({
            onSelectBook: (book) => {
                store.setBook(book);
                navigate("gwa");
            }
        });
        screenRoot.appendChild(home);
    }

    if (screen === "gwa") {
        const gwa = GwaScreen({
            book: store.book,
            onBack: () => navigate("home"),
            onSelectGwa: async (gwaNum) => {
                try {
                    store.setGwa(gwaNum);
                    const words = await fetchWords(store.book, gwaNum);
                    store.setWords(words);
                    navigate("session");
                } catch (e) {
                    alert("API xatosi: " + e.message);
                }
            }
        });
        screenRoot.appendChild(gwa);
    }

    if (screen === "session") {
        const session = SessionScreen({
            book: store.book,
            gwa: store.gwa,
            sessions: store.sessions,
            onBack: () => navigate("gwa"),
            onSelectSession: (idx) => {
                store.selectSession(idx);
                navigate("flashcards");
            }
        });
        screenRoot.appendChild(session);
    }

    if (screen === "flashcards") {
        const screenEl = FlashcardScreen({
            store,
            onBackToSessions: () => navigate("session"),
            onGoDeckFromSession: (goDeck) => {
                // goDeck false bo'lsa ham, shunchaki qayta chizamiz
                navigate("flashcards");
            }
        });
        screenRoot.appendChild(screenEl);
    }

    if (screen === "deck") {
        const deckScreen = MyDeckScreen({
            store,
            onBack: () => navigate("home"),
            onStartDeckSession: () => {
                // MyDeckdagi so'zlardan vaqtincha session yasaymiz
                store.setWords(store.deck);
                navigate("session");
            }
        });
        screenRoot.appendChild(deckScreen);
    }
}

// Init
renderTopbar();
navigate("home");

// apply saved theme
if (store.theme === "light") {
    body.classList.add("bg-white", "text-black");
}
