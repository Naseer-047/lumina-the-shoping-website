if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

const UI = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

export const pageTransition = (container) => {
    if (UI.reducedMotion) return;
    gsap.fromTo(container, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
};

export const revealHero = (selectors) => {
    if (UI.reducedMotion) return;
    gsap.from(selectors, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
    });
};

export const staggerGrid = (selector, trigger) => {
    if (UI.reducedMotion) return;
    gsap.from(selector, {
        scrollTrigger: {
            trigger: trigger || selector,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
    });
};

export const flyToCart = (sourceEl) => {
    if (UI.reducedMotion || !sourceEl) return;

    const cartIcon = document.getElementById('cart-badge');
    if (!cartIcon) return;

    const clone = sourceEl.cloneNode(true);
    const rect = sourceEl.getBoundingClientRect();
    const targetRect = cartIcon.getBoundingClientRect();

    clone.style.cssText = `
        position: fixed;
        z-index: 1000;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        pointer-events: none;
        border-radius: 50%;
        opacity: 0.8;
    `;
    document.body.appendChild(clone);

    const tl = gsap.timeline({
        onComplete: () => clone.remove()
    });

    tl.to(clone, {
        top: targetRect.top,
        left: targetRect.left,
        width: 20,
        height: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut"
    })
    .to(cartIcon, {
        scale: 1.5,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    }, "-=0.2");
};

export const animateValue = (obj, start, end, duration = 0.5) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        obj.innerHTML = (progress * (end - start) + start).toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

export const revealImage = (imgSelector) => {
    if (UI.reducedMotion) return;
    gsap.fromTo(imgSelector, 
        { scale: 1.1, filter: 'blur(10px)', opacity: 0 },
        { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.2, ease: "power2.out" }
    );
};
