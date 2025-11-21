export function HomeScreen({ onFlash, onTypeCheck }) {
  const root = document.createElement("div");
  root.className = "screen";

  root.innerHTML = `
    <h1 class="text-3xl font-bold mb-4">Korean Bot</h1>
    <div class="grid-books">
      <button class="pill mode-card" id="flashBtn" style="background:linear-gradient(135deg,#fce4ec,#e1bee7);">
        📚 Flashcards
      </button>
      <button class="pill mode-card" id="typeBtn" style="background:linear-gradient(135deg,#e3f2fd,#a7ffeb);">
        ⌨️ Type & Check
      </button>
    </div>
  `;

  root.querySelector("#flashBtn").onclick = onFlash;
  root.querySelector("#typeBtn").onclick = onTypeCheck;

  return root;
}
