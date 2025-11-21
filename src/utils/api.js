const API_BASE = "https://koreanapi-production.up.railway.app/api";

export async function fetchWords(book, gwa) {
  const url = `${API_BASE}/flashcards?book=${encodeURIComponent(book)}&gwa=${encodeURIComponent(gwa)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("API xatosi");
  const data = await res.json();
  return data.words || [];
}
