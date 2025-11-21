import { ttsKorean } from "../utils/helpers.js";

export function FlashCard({ word, onKnow, onHard, onLater, onSaveToggle, saved }) {
  const shell = document.createElement("div");
  shell.className = "card-shell flex flex-col items-center gap-3";

  const card = document.createElement("div");
  card.className = "flashcard";
  card.innerHTML = `
    <div class="card-side front">${word.kr}</div>
    <div class="card-side card-back">${word.uz}</div>
  `;

  let flipped = false;
  card.onclick = () => {
    flipped = !flipped;
    card.classList.toggle("flipped", flipped);
  };

  const ttsBtn = document.createElement("button");
  ttsBtn.className = "btn btn-soft";
  ttsBtn.textContent = "🔊 Tinglash";
  ttsBtn.onclick = () => ttsKorean(word.kr);

  const row = document.createElement("div");
  row.className = "grid grid-cols-2 gap-3 w-full";
  row.innerHTML = `
    <button class="btn" style="background:#def7ec;color:#03543f;">Bilaman</button>
    <button class="btn" style="background:#fff4e6;color:#7c2d12;">Qiyin</button>
  `;

  const laterBtn = document.createElement("button");
  laterBtn.className = "btn btn-soft";
  laterBtn.style.background = "#e1bee7";
  laterBtn.style.color = "#4a148c";
  laterBtn.textContent = "Keyinroq";

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-soft";
  saveBtn.style.background = "#fce4ec";
  saveBtn.style.color = "#9c1b5a";
  saveBtn.textContent = saved ? "⭐ Saqlangan" : "☆ Saqlash";

  row.children[0].onclick = onKnow;
  row.children[1].onclick = onHard;
  laterBtn.onclick = onLater;
  saveBtn.onclick = () => onSaveToggle(saveBtn);

  shell.appendChild(card);
  shell.appendChild(ttsBtn);
  shell.appendChild(row);
  shell.appendChild(laterBtn);
  shell.appendChild(saveBtn);
  return shell;
}
