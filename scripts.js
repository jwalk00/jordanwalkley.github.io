document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default instant jump

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Triggers native smooth scrolling
                    block: 'start'      // Aligns the top of the element with the top of the viewport
                });

                // Optional: Update URL hash without causing a jump
                history.pushState(null, null, targetId);
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class to trigger the CSS transition
                entry.target.classList.add('in-view');
                // Optional: Stop observing if you only want the animation to run once
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.25 });

    // Target all elements with the animation class
    document.querySelectorAll('section, header, footer').forEach(el => observer.observe(el));
});