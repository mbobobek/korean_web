export function HomeScreen({ onSelectBook, onMyDeck, onTypeCheck }) {
  const root = document.createElement("div");
  root.className = "screen";

  root.innerHTML = `
    <div class="mb-4 flex-between">
      <div>
        <h1 class="text-3xl font-bold">Kitobni tanlang</h1>
        <p class="muted">Pastel gradient tugmalar</p>
      </div>
      <button class="btn btn-soft" id="typeCheckBtn">Type & Check</button>
    </div>
    <div class="grid-books">
      ${["1A", "1B", "2A", "2B"].map(book => `
        <button class="pill" data-book="${book}" style="background:linear-gradient(135deg,#fce4ec,#e1bee7);">
          ${book}
        </button>
      `).join("")}
    </div>
    <div class="mt-6 flex gap-3">
      <button class="btn btn-soft" id="deckBtn">📚 MyDeck</button>
    </div>
  `;

  root.querySelectorAll("[data-book]").forEach(btn => {
    btn.onclick = () => onSelectBook(btn.dataset.book);
  });
  root.querySelector("#deckBtn").onclick = onMyDeck;
  root.querySelector("#typeCheckBtn").onclick = onTypeCheck;

  return root;
}
