export function HomeScreen({ onSelectBook }) {
    const root = document.createElement("div");
    root.className = "screen-fade w-full flex flex-col items-center mt-5";

    root.innerHTML = `
        <h1 class="text-3xl font-bold mb-4">
            Kitobni tanlang
        </h1>

        <div class="w-full max-w-xs flex flex-col gap-3">
            <button data-book="1A"
                class="bg-gradient-to-r from-indigo-500 to-indigo-700 py-3 rounded-2xl shadow-lg">
                📘 1A
            </button>
            <button data-book="1B"
                class="bg-gradient-to-r from-purple-500 to-purple-700 py-3 rounded-2xl shadow-lg">
                📙 1B
            </button>
            <button data-book="2A"
                class="bg-gradient-to-r from-pink-500 to-pink-700 py-3 rounded-2xl shadow-lg">
                📗 2A
            </button>
            <button data-book="2B"
                class="bg-gradient-to-r from-blue-500 to-blue-700 py-3 rounded-2xl shadow-lg">
                📕 2B
            </button>
        </div>
    `;

    root.querySelectorAll("button[data-book]").forEach(btn => {
        btn.onclick = () => {
            const book = btn.dataset.book;
            onSelectBook(book);
        };
    });

    return root;
}
