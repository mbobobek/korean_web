export function IntroScreen({ onStart }) {
  const root = document.createElement("div");
  root.className = "screen";

  root.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">Qoidalar</h2>
    <div class="pill mb-3">
      ⭐ Bilaman – sessiondan chiqariladi<br/>
      ⚠️ Qiyin – keyingi Hard session<br/>
      🔁 Keyinroq – session oxiriga qaytadi<br/>
      ☆ Saqlash – MyDeck ga saqlanadi
    </div>
    <p class="muted mb-4">Pastel Korean uslubida. TTS bilan o'qish.</p>
    <button class="btn btn-soft" id="startBtn" style="background:linear-gradient(135deg,#fce4ec,#a7ffeb);color:#0f172a;font-weight:700;">Boshlash →</button>
  `;

  root.querySelector("#startBtn").onclick = onStart;
  return root;
}
