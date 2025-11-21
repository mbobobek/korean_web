export function shake(element) {
    element.classList.add("animate-[wiggle_0.3s]");
    setTimeout(() => element.classList.remove("animate-[wiggle_0.3s]"), 300);
}
