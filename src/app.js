import { store } from "./state/store.js";
import { fetchWords } from "./utils/api.js";
import { renderTopBar } from "./components/TopBar.js";
import {
  showHome,
  showBookSelect,
  showGwa,
  showIntro,
  showSessions,
  showFlashcards,
  showEnd,
  showMyDeck,
  showCreateDeck,
  showTypeCheck
} from "./router.js";

const screenRoot = document.getElementById("screen-root");
const topbarRoot = document.getElementById("topbar-root");
const body = document.body;

const applyTheme = () => body.classList.toggle("dark", store.theme === "dark");
const withLoading = (fn) => async (...args) => {
  screenRoot.innerHTML = `<div class="screen text-center py-10">Yuklanmoqda...</div>`;
  await fn(...args);
};

async function handleSelectGwa(gwa) {
  try {
    store.setGwa(gwa);
    const words = await fetchWords(store.book, gwa);
    store.setWords(words);
    showIntro(screenRoot, { onStart: () => showSessions(screenRoot, sessionsProps) });
  } catch (err) {
    alert("API xatosi yoki Internet muammosi");
    console.error(err);
    showHome(screenRoot, homeProps);
  }
}

async function handleSelectGwaType(gwa) {
  try {
    store.setGwa(gwa);
    const words = await fetchWords(store.book, gwa);
    showTypeCheck(screenRoot, {
      words,
      onBack: () => showGwa(screenRoot, typeGwaProps())
    });
  } catch (err) {
    alert("API xatosi yoki Internet muammosi");
    console.error(err);
    showHome(screenRoot, homeProps);
  }
}

function handleSelectSession(idx) {
  store.selectSession(idx);
  showFlashcards(screenRoot, {
    store,
    onEnd: () => showEnd(screenRoot, endProps),
    onBack: () => showSessions(screenRoot, sessionsProps)
  });
}

function retryHard() {
  const hard = store.stats.hard;
  if (!hard.length) return showEnd(screenRoot, endProps);
  store.setWords(hard);
  showSessions(screenRoot, sessionsProps);
}

const homeProps = {
  onFlash: () => showBookSelect(screenRoot, flashBookProps),
  onTypeCheck: () => showBookSelect(screenRoot, typeBookProps)
};

const flashBookProps = {
  title: "Flashcards uchun kitob",
  subtitle: "1A, 1B, 2A, 2B",
  onBack: () => showHome(screenRoot, homeProps),
  onSelectBook: (book) => {
    store.setBook(book);
    showGwa(screenRoot, flashGwaProps());
  }
};

const typeBookProps = {
  title: "Type & Check uchun kitob",
  subtitle: "1A, 1B, 2A, 2B",
  onBack: () => showHome(screenRoot, homeProps),
  onSelectBook: (book) => {
    store.setBook(book);
    showGwa(screenRoot, typeGwaProps());
  }
};

const flashGwaProps = () => ({
  book: store.book,
  onBack: () => showBookSelect(screenRoot, flashBookProps),
  onSelectGwa: withLoading(handleSelectGwa)
});

const typeGwaProps = () => ({
  book: store.book,
  onBack: () => showBookSelect(screenRoot, typeBookProps),
  onSelectGwa: withLoading(handleSelectGwaType)
});

const sessionsProps = {
  onBack: () => showGwa(screenRoot, flashGwaProps()),
  onSelect: handleSelectSession
};

const deckProps = {
  store,
  onBack: () => showHome(screenRoot, homeProps),
  onCreate: () => showCreateDeck(screenRoot, {
    onBack: () => showMyDeck(screenRoot, deckProps),
    onDone: (name) => { store.addDeck(name); showMyDeck(screenRoot, deckProps); }
  }),
  onOpenDeck: (deck) => {
    if (!deck.words.length) return alert("Deck bo'sh");
    store.setWords(deck.words);
    showSessions(screenRoot, sessionsProps);
  }
};

const endProps = {
  store,
  onHome: () => showHome(screenRoot, homeProps),
  onRetryHard: retryHard
};

const topProps = {
  theme: store.theme,
  onHome: () => showHome(screenRoot, homeProps),
  onDeck: () => showMyDeck(screenRoot, deckProps),
  onThemeToggle: () => {
    store.toggleTheme();
    applyTheme();
    renderTopBar(topbarRoot, { ...topProps, theme: store.theme });
  }
};

function bootstrap() {
  applyTheme();
  renderTopBar(topbarRoot, topProps);
  showHome(screenRoot, homeProps);
}

bootstrap();
