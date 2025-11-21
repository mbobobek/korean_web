const DECK_KEY = "korean_flash_mydeck";

export function loadDeck() {
    try {
        return JSON.parse(localStorage.getItem(DECK_KEY)) || [];
    } catch {
        return [];
    }
}

export function saveDeck(deck) {
    localStorage.setItem(DECK_KEY, JSON.stringify(deck));
}

export function toggleInDeck(deck, word) {
    const idx = deck.findIndex(w => w.kr === word.kr && w.uz === word.uz);
    if (idx >= 0) {
        const copy = [...deck];
        copy.splice(idx, 1);
        return copy;
    }
    return [...deck, word];
}

export function isInDeck(deck, word) {
    return deck.some(w => w.kr === word.kr && w.uz === word.uz);
}
