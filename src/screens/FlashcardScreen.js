import { FlashCard } from "../components/FlashCard.js";
import { ProgressBar } from "../components/ProgressBar.js";
import { Modal } from "../components/Modal.js";
import { store } from "../state/store.js";

export function FlashcardScreen({ store: s, onEnd, onBack }) {
  const root = document.createElement("div");
  root.className = "screen flex flex-col items-center";

  const modal = Modal({
    decks: s.decks,
    onSelect: (deck) => {
      s.addWordToDeck(deck.id, s.currentWord());
      modal.classList.remove("active");
      render();
    },
    onCreate: () => {
      const name = prompt("Yangi deck nomi");
      if (!name) return;
      s.addDeck(name);
      modal.classList.remove("active");
      render();
    }
  });
  document.body.appendChild(modal);

  function render() {
    root.innerHTML = "";
    const word = s.currentWord();
    if (!word) {
      onEnd();
      return;
    }

    const header = document.createElement("div");
    header.className = "w-full flex items-center justify-between mb-2";
    header.innerHTML = `
      <div>
        <div class="muted text-xs uppercase tracking-wide">Session ${s.currentSessionIndex + 1}</div>
        <div class="font-bold">Card ${s.currentCardIndex + 1}/${s.currentSession().length}</div>
      </div>
      <button class="icon-btn" id="backBtn">←</button>
    `;
    header.querySelector("#backBtn").onclick = () => {
      modal.remove();
      onBack();
    };

    const card = FlashCard({
      word,
      saved: s.wordInAnyDeck(word),
      onKnow: () => { s.answerCurrent("know"); s.nextCard() ? render() : onEnd(); },
      onHard: () => { s.answerCurrent("hard"); s.nextCard() ? render() : onEnd(); },
      onLater: () => { s.answerCurrent("later"); s.nextCard() ? render() : onEnd(); },
      onSaveToggle: () => {
        modal.classList.add("active");
      }
    });

    const progress = ProgressBar({
      value: s.currentCardIndex,
      total: s.currentSession().length
    });

    root.appendChild(header);
    root.appendChild(progress);
    root.appendChild(card);
  }

  render();
  return root;
}
