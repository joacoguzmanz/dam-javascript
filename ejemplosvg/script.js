document.addEventListener("DOMContentLoaded", () => {
    const svgMover = document.getElementById("svg-mover");
    let x = 50; // Posición inicial
    let y = 50; // Posición inicial
    let dx = 2; // Desplazamiento horizontal
    let dy = 2; // Desplazamiento vertical
    const interval = 10; // Intervalo para la animación
    let moving = true;
    let animationInterval;

    function move() {
        if (!moving) return;

        const svgWidth = window.innerWidth - svgMover.clientWidth;
        const svgHeight = window.innerHeight - svgMover.clientHeight;

        // Rebotar si se sale del límite
        if (x + dx > svgWidth || x + dx < 0) {
            dx *= -1;
        }
        if (y + dy > svgHeight || y + dy < 0) {
            dy *= -1;
        }

        x += dx;
        y += dy;

        svgMover.style.left = `${x}px`;
        svgMover.style.top = `${y}px`;
    }

    const paraActivar = () => {
        moving = !moving
        if (moving) {
            animationInterval = setInterval(move, interval)
        } else {
            clearInterval(animationInterval);
        }
    }

    animationInterval = setInterval(move, interval);

    // svgMover.addEventListener('mouseover', paraActivar);
    document.addEventListener('keydown', e => {
        if (e.code === "Space") {
            paraActivar();
        }
    })
    /*svgMover.addEventListener('contextmenu', e => {
        e.preventDefault();
        paraActivar();
    })*/
});
