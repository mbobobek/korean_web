const STATS_KEY = "korean_flash_stats";

export function loadStats() {
    try {
        return JSON.parse(localStorage.getItem(STATS_KEY)) || {
            seen: 0,
            know: 0,
            hard: 0,
            repeat: 0
        };
    } catch {
        return { seen: 0, know: 0, hard: 0, repeat: 0 };
    }
}

export function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function updateStats(stats, action) {
    const copy = { ...stats };
    copy.seen += 1;
    if (action === "know") copy.know += 1;
    if (action === "hard") copy.hard += 1;
    if (action === "repeat") copy.repeat += 1;
    return copy;
}

export function formatStats(stats) {
    const { seen, know, hard, repeat } = stats;
    const retention = seen ? Math.round((know / seen) * 100) : 0;
    return { seen, know, hard, repeat, retention };
}
