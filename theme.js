/**
 * Mercedes-Benz Theme Controller (Dark / Light Mode)
 * Matches the luxury automotive brand aesthetic:
 * - Obsidian Dark: Deep carbon, polished silver & gold accents
 * - Platinum Light: Refined showroom white, brushed chrome & charcoal
 */

(function () {
    'use strict';

    const THEME_KEY = 'mb_theme_preference';

    // SVG Icons
    const SUN_ICON = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const MOON_ICON = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // Get current theme from storage or default to dark
    function getPreferredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        return 'dark'; // Default to Mercedes-Benz signature dark aesthetic
    }

    // Apply theme to document and update toggle buttons
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {
            // In case localStorage is blocked by private mode
        }

        const buttons = document.querySelectorAll('.theme-toggle-btn');
        buttons.forEach(btn => {
            const isDark = theme === 'dark';
            const iconContainer = btn.querySelector('.theme-icon');
            const textContainer = btn.querySelector('.theme-text');

            if (iconContainer) {
                iconContainer.innerHTML = isDark ? SUN_ICON : MOON_ICON;
            }
            if (textContainer) {
                textContainer.textContent = isDark ? 'Light' : 'Dark';
            }

            btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        });
    }

    // Toggle theme
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    }

    // Immediately apply theme before full DOM rendering to avoid flashing
    const initialTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Initialize UI listeners on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        setTheme(document.documentElement.getAttribute('data-theme') || initialTheme);

        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.removeEventListener('click', toggleTheme);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTheme();
            });
        });
    });

    // Synchronize across multiple browser tabs
    window.addEventListener('storage', (e) => {
        if (e.key === THEME_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
            setTheme(e.newValue);
        }
    });

    // Export toggle function globally if needed
    window.toggleMercedesTheme = toggleTheme;
})();
