import { ttsKorean } from "../utils/helpers.js";

function normalize(text) {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .normalize("NFC");
}

function compareText(expected, actual) {
  const expTokens = normalize(expected).split(" ");
  const actTokens = normalize(actual).split(" ");
  const maxLen = Math.max(expTokens.length, actTokens.length);
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    const exp = expTokens[i] || "";
    const act = actTokens[i] || "";
    const ok = exp === act;
    result.push({ exp, act, ok });
  }
  const correct = result.filter(r => r.ok).length;
  const score = maxLen ? Math.round((correct / maxLen) * 100) : 0;
  return { result, score };
}

export function TypeCheckScreen({ onBack }) {
  const root = document.createElement("div");
  root.className = "screen typecheck";

  root.innerHTML = `
    <div class="flex-between mb-3">
      <h2 class="text-2xl font-bold">Type & Check</h2>
      <button class="btn btn-soft w-fit" id="backBtn">← Ortga</button>
    </div>
    <p class="muted mb-3">Koreyscha yoki aralash matnni yozing va o'zingizni tekshiring.</p>
    <div class="tc-grid">
      <div>
        <label class="muted text-xs">Namuna matn</label>
        <textarea id="expected" class="pill tc-input" rows="4" placeholder="예: 저는 한국어를 공부합니다."></textarea>
        <div class="flex gap-2 mt-2">
          <button class="btn btn-soft w-fit" id="ttsBtn">🔊 Tinglash</button>
          <button class="btn btn-soft w-fit" id="clearExp">Tozalash</button>
        </div>
      </div>
      <div>
        <label class="muted text-xs">Sizning javob</label>
        <textarea id="actual" class="pill tc-input" rows="4" placeholder="O'z javobingizni yozing"></textarea>
        <div class="flex gap-2 mt-2">
          <button class="btn btn-soft w-fit" id="checkBtn">Tekshirish</button>
          <button class="btn btn-soft w-fit" id="clearAct">Tozalash</button>
        </div>
      </div>
    </div>
    <div class="mt-4" id="result"></div>
  `;

  root.querySelector("#backBtn").onclick = onBack;

  root.querySelector("#clearExp").onclick = () => {
    root.querySelector("#expected").value = "";
  };
  root.querySelector("#clearAct").onclick = () => {
    root.querySelector("#actual").value = "";
  };
  root.querySelector("#ttsBtn").onclick = () => {
    const text = root.querySelector("#expected").value.trim();
    if (text) ttsKorean(text);
  };

  root.querySelector("#checkBtn").onclick = () => {
    const expected = root.querySelector("#expected").value;
    const actual = root.querySelector("#actual").value;
    const { result, score } = compareText(expected, actual);
    const box = root.querySelector("#result");
    if (!expected || !actual) {
      box.innerHTML = `<div class="pill">Iltimos, ikkala maydonga ham matn yozing.</div>`;
      return;
    }
    const chips = result.map(r => {
      const cls = r.ok ? "chip-ok" : "chip-err";
      const label = r.ok ? r.exp : `${r.exp || "–"} | ${r.act || "–"}`;
      return `<span class="chip ${cls}">${label}</span>`;
    }).join(" ");
    box.innerHTML = `
      <div class="pill mb-2">Natija: ${score}% to'g'ri</div>
      <div class="chip-wrap">${chips}</div>
    `;
  };

  return root;
}
