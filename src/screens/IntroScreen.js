export function IntroScreen({ onStart }) {
  const root = document.createElement("div");
  root.className = "screen";

  root.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">Qoidalar</h2>
    <div class="pill mb-3">
      ⭐ Bilaman – chiqaramiz<br/>
      ⚠️ Qiyin – keyingi qismga<br/>
      🔁 Keyinroq – oxiriga qaytariladi<br/>
      ☆ Saqlash – MyDeck’ga
    </div>
    <button class="btn btn-soft" id="startBtn" style="background:linear-gradient(135deg,#fce4ec,#a7ffeb);color:#0f172a;font-weight:700;">Boshlash →</button>
  `;

  root.querySelector("#startBtn").onclick = onStart;
  return root;
}
