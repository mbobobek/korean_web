import { SessionCard } from "../components/SessionCard.js";

export function SessionScreen({ book, gwa, sessions, onBack, onSelectSession }) {
    const root = document.createElement("div");
    root.className = "screen-fade flex flex-col items-center mt-4 px-4";

    root.innerHTML = `
        <h2 class="text-2xl font-semibold mb-1">
            ${book} — ${gwa}과
        </h2>
        <p class="text-sm text-white/70 mb-4">
            So‘zlarni qulay bo‘lish uchun sessionlarga ajratdik.
        </p>
        <div class="w-full max-w-md flex flex-col gap-3" id="sessionList"></div>
        <button id="backBtn" class="mt-4 text-sm text-white/70 underline">
            ⬅ Bo‘limga qaytish
        </button>
    `;

    const list = root.querySelector("#sessionList");
    sessions.forEach((s, idx) => {
        const c = SessionCard(s, () => onSelectSession(idx));
        list.appendChild(c);
    });

    root.querySelector("#backBtn").onclick = onBack;

    return root;
}
