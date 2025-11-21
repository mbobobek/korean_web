import { HomeScreen } from "./screens/HomeScreen.js";
import { GwaScreen } from "./screens/GwaScreen.js";
import { IntroScreen } from "./screens/IntroScreen.js";
import { SessionScreen } from "./screens/SessionScreen.js";
import { FlashcardScreen } from "./screens/FlashcardScreen.js";
import { EndScreen } from "./screens/EndScreen.js";
import { MyDeckScreen } from "./screens/MyDeckScreen.js";
import { CreateDeckScreen } from "./screens/CreateDeckScreen.js";
import { TypeCheckScreen } from "./screens/TypeCheckScreen.js";

export function showHome(root, props) {
  root.innerHTML = "";
  root.appendChild(HomeScreen(props));
}

export function showGwa(root, props) {
  root.innerHTML = "";
  root.appendChild(GwaScreen(props));
}

export function showIntro(root, props) {
  root.innerHTML = "";
  root.appendChild(IntroScreen(props));
}

export function showSessions(root, props) {
  root.innerHTML = "";
  root.appendChild(SessionScreen(props));
}

export function showFlashcards(root, props) {
  root.innerHTML = "";
  root.appendChild(FlashcardScreen(props));
}

export function showEnd(root, props) {
  root.innerHTML = "";
  root.appendChild(EndScreen(props));
}

export function showMyDeck(root, props) {
  root.innerHTML = "";
  root.appendChild(MyDeckScreen(props));
}

export function showCreateDeck(root, props) {
  root.innerHTML = "";
  root.appendChild(CreateDeckScreen(props));
}

export function showTypeCheck(root, props) {
  root.innerHTML = "";
  root.appendChild(TypeCheckScreen(props));
}
