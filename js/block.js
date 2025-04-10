let url = '/videos/Righthere.mp4';

(function devtoolsDetector() {
    const threshold = 160;
    let lastTime = performance.now();

    function check() {
        const start = performance.now();

        setTimeout(() => {
            requestAnimationFrame(() => {
                const delta = performance.now() - start;
                const delay = performance.now() - lastTime;

                if (delta > threshold || delay > threshold * 2) {
                    window.location = url;
                }

                lastTime = performance.now();
                check();
            });
        }, 0);

        try {
            Function('debugger')();
        } catch (e) {
        }
    }

    check();

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 500) {
            window.location = url;
        }
    });

    window.addEventListener('devtoolschange', function(e) {
        if (e.detail.open) {
            window.location = url;
        }
    });

})();
