export function enableSwipe(card, callbacks = {}) {
    let startX = 0;
    let startY = 0;

    function handleEnd(endX, endY) {
        const diffX = endX - startX;
        const diffY = endY - startY;

        const absX = Math.abs(diffX);
        const absY = Math.abs(diffY);

        const threshold = 60;

        if (absX < threshold && absY < threshold) return;

        if (absX > absY) {
            if (diffX > 0) callbacks.onRight && callbacks.onRight();
            else callbacks.onLeft && callbacks.onLeft();
        } else {
            if (diffY > 0) callbacks.onDown && callbacks.onDown();
            else callbacks.onUp && callbacks.onUp();
        }
    }

    card.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    card.addEventListener("touchend", (e) => {
        handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    });

    // Desktop uchun ham
    card.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;

        function onUp(ev) {
            handleEnd(ev.clientX, ev.clientY);
            window.removeEventListener("mouseup", onUp);
        }
        window.addEventListener("mouseup", onUp);
    });
}
