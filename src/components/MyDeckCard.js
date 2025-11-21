export function MyDeckCard({ deck, onOpen }) {
  const btn = document.createElement("button");
  btn.className = "session-card";
  btn.innerHTML = `
    <div>
      <div class="font-semibold">${deck.name}</div>
      <div class="muted">${deck.words.length} ta so'z</div>
    </div>
    <div>➜</div>
  `;
  btn.onclick = onOpen;
  return btn;
}
