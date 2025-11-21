import { loadDeck, saveDeck, toggleInDeck } from "./deck.js";
import { loadStats, saveStats, updateStats } from "./stats.js";
import { buildSessions } from "./session.js";

const THEME_KEY = "korean_flash_theme";

function loadTheme() {
    return localStorage.getItem(THEME_KEY) || "dark";
}
function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

class Store {
    constructor() {
        this.book = null;
        this.gwa = null;
        this.words = [];
        this.sessions = [];
        this.currentSessionIndex = 0;
        this.currentCardIndex = 0;
        this.deck = loadDeck();
        this.stats = loadStats();
        this.theme = loadTheme();
    }

    setBook(book) {
        this.book = book;
    }

    setGwa(gwa) {
        this.gwa = gwa;
    }

    setWords(words) {
        this.words = words;
        this.sessions = buildSessions(words, 20);
        this.currentSessionIndex = 0;
        this.currentCardIndex = 0;
    }

    selectSession(idx) {
        this.currentSessionIndex = idx;
        this.currentCardIndex = 0;
    }

    getCurrentSession() {
        return this.sessions[this.currentSessionIndex] || { words: [] };
    }

    getCurrentWord() {
        const session = this.getCurrentSession();
        return session.words[this.currentCardIndex] || null;
    }

    nextCard() {
        const session = this.getCurrentSession();
        if (!session.words.length) return;
        this.currentCardIndex =
            (this.currentCardIndex + 1) % session.words.length;
    }

    prevCard() {
        const session = this.getCurrentSession();
        if (!session.words.length) return;
        this.currentCardIndex =
            (this.currentCardIndex - 1 + session.words.length) %
            session.words.length;
    }

    swipe(action) {
        this.stats = updateStats(this.stats, action);
        saveStats(this.stats);
        this.nextCard();
    }

    toggleSave(word) {
        this.deck = toggleInDeck(this.deck, word);
        saveDeck(this.deck);
    }

    isSaved(word) {
        return word && this.deck.some(
            w => w.kr === word.kr && w.uz === word.uz
        );
    }

    setTheme(theme) {
        this.theme = theme;
        saveTheme(theme);
    }
}

export const store = new Store();
