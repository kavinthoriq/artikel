document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    // But since this is a static site without build step, we check on DOM load
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        lightIcon?.classList.remove('hidden');
        darkIcon?.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon?.classList.remove('hidden');
        lightIcon?.classList.add('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // toggle icons
            darkIcon?.classList.toggle('hidden');
            lightIcon?.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
            
        });
    }

    // --- Mobile Menu Toggle ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'translate-y-10');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
                backToTopBtn.classList.add('opacity-0', 'translate-y-10');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Active TOC Highlighting (for article-detail) ---
    const tocLinks = document.querySelectorAll('.toc-menu a');
    const headings = document.querySelectorAll('article h2, article h3');

    if (tocLinks.length > 0 && headings.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            headings.forEach(heading => {
                const headingTop = heading.offsetTop;
                if (pageYOffset >= headingTop - 120) {
                    current = heading.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // --- Search Focus from URL Parameter ---
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('focus') === 'search') {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            // Small timeout to ensure DOM layout is complete before focus/scroll
            setTimeout(() => {
                searchInput.focus();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

});
