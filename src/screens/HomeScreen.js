export function HomeScreen({ onSelectBook, onMyDeck }) {
  const root = document.createElement("div");
  root.className = "screen";

  root.innerHTML = `
    <div class="mb-4">
      <h1 class="text-3xl font-bold">Kitobni tanlang</h1>
    </div>
    <div class="grid-books">
      ${["1A", "1B", "2A", "2B"].map(book => `
        <button class="pill" data-book="${book}" style="background:linear-gradient(135deg,#fce4ec,#e1bee7);">
          ${book}
        </button>
      `).join("")}
    </div>
    <div class="mt-6">
      <button class="btn btn-soft" id="deckBtn">📚 MyDeck</button>
    </div>
  `;

  root.querySelectorAll("[data-book]").forEach(btn => {
    btn.onclick = () => onSelectBook(btn.dataset.book);
  });
  root.querySelector("#deckBtn").onclick = onMyDeck;

  return root;
}
