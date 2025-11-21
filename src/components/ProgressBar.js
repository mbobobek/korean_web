export function ProgressBar({ value, max }) {
    const root = document.createElement("div");
    root.className = "w-full max-w-md mx-auto mt-3";

    const percent = max ? Math.round((value / max) * 100) : 0;

    root.innerHTML = `
        <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-indigo-400 to-pink-400 progress-animate"
                 style="width:${percent}%"></div>
        </div>
        <div class="mt-1 text-xs text-white/70 text-right">
            ${value}/${max}
        </div>
    `;

    return root;
}
