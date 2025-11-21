export function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

export function ttsKorean(text) {
    if (!text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = 0.9;
    u.pitch = 1.05;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
}
