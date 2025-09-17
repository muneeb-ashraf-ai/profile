document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links (guard missing targets)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll animations
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle (safe checks + ARIA)
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('mainNav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const isActive = nav.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', String(isActive));
        });
    }
});