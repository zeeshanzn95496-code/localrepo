/**
 * Mercedes-Benz Luxury Theme Controller with Cinematic Screen Transition
 * Features:
 * - View Transitions API circular reveal (Chrome, Edge, Safari 18+)
 * - Radial sweep overlay fallback (Firefox & older browsers)
 * - Tactile icon spin & ripple
 * - Preference persistence in localStorage & cross-tab synchronization
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
        return 'dark'; // Mercedes-Benz signature dark aesthetic by default
    }

    // Apply theme attribute to document and update toggle button state
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {
            // In case localStorage is blocked in private browsing
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

    // Animated Theme Transition with Screen Ripple Effect
    function toggleThemeWithAnimation(event) {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';

        // Trigger icon rotation feedback
        const targetBtn = event ? event.currentTarget : null;
        if (targetBtn) {
            const icon = targetBtn.querySelector('.theme-icon');
            if (icon) {
                icon.classList.remove('rotating');
                void icon.offsetWidth; // trigger reflow
                icon.classList.add('rotating');
                setTimeout(() => icon.classList.remove('rotating'), 650);
            }
        }

        // Determine click origin coordinates
        let x = window.innerWidth / 2;
        let y = 60;
        if (event && (event.clientX || event.clientY)) {
            x = event.clientX;
            y = event.clientY;
        } else if (targetBtn) {
            const rect = targetBtn.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }

        // Calculate maximum distance to screen corners for full coverage
        const maxRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Path 1: Native View Transitions API (Modern Chrome, Edge, Safari 18+)
        if (document.startViewTransition && !prefersReducedMotion) {
            const transition = document.startViewTransition(() => {
                setTheme(next);
            });

            transition.ready.then(() => {
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${maxRadius}px at ${x}px ${y}px)`
                        ]
                    },
                    {
                        duration: 650,
                        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                        pseudoElement: '::view-transition-new(root)'
                    }
                );
            });
            return;
        }

        // Path 2: Fallback Radial Overlay Transition (Firefox, older browsers, or reduced motion)
        if (prefersReducedMotion) {
            setTheme(next);
            return;
        }

        let overlay = document.getElementById('themeTransitionOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'themeTransitionOverlay';
            overlay.className = 'theme-transition-overlay';
            document.body.appendChild(overlay);
        }

        overlay.style.setProperty('--clip-x', `${x}px`);
        overlay.style.setProperty('--clip-y', `${y}px`);
        overlay.style.backgroundColor = next === 'light' ? '#f5f6f8' : '#121212';

        overlay.classList.remove('active');
        void overlay.offsetWidth; // Force reflow
        overlay.classList.add('active');

        // Switch theme midway through expansion
        setTimeout(() => {
            setTheme(next);
        }, 280);

        // Remove overlay after animation completes
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 700);
    }

    // Immediately apply theme before DOM renders to prevent flash
    const initialTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Initialize UI listeners on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        setTheme(document.documentElement.getAttribute('data-theme') || initialTheme);

        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleThemeWithAnimation(e);
            });
        });
    });

    // Synchronize across multiple browser tabs
    window.addEventListener('storage', (e) => {
        if (e.key === THEME_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
            setTheme(e.newValue);
        }
    });

    // Expose for external access
    window.toggleMercedesTheme = toggleThemeWithAnimation;
})();
