class ThemeSwitcher {
    constructor() {
        this.currentTheme = 'light';
        this.preferredTheme = null;
        this.lightBtn = null;
        this.darkBtn = null;
        
        this.init();
    }

    fixHeaderSticky() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        requestAnimationFrame(() => {
            const currentDisplay = header.style.display;
            header.style.display = 'none';
            

            header.offsetHeight;
            
            header.style.display = currentDisplay || '';
            
            const computedStyle = window.getComputedStyle(header);
            if (computedStyle.position !== 'sticky') {
                header.style.position = 'sticky';
                header.style.top = '0';
                header.style.zIndex = '1000';
            }
        });
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.getElements();
        this.detectInitialTheme();
        this.applyTheme(this.currentTheme);
        this.attachEventListeners();
        this.updateButtonStates();
        
        // Add smooth transition class after initial setup
        setTimeout(() => {
            document.body.classList.add('theme-transition');
        }, 100);
    }
    getElements() {
        this.lightBtn = document.getElementById('light-btn');
        this.darkBtn = document.getElementById('dark-btn');
        
        if (!this.lightBtn || !this.darkBtn) {
            console.warn('Theme switcher buttons not found. Make sure you have elements with IDs "light-btn" and "dark-btn"');
            return;
        }
    }

    detectInitialTheme() {
        const savedTheme = localStorage.getItem('preferred-theme');
        
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            this.currentTheme = savedTheme;
            this.preferredTheme = savedTheme;
        } else {
            const systemPrefersDark = window.matchMedia && 
                                    window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            this.currentTheme = systemPrefersDark ? 'dark' : 'light';
            
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', (e) => {
                    if (!this.preferredTheme) {
                        this.switchToTheme(e.matches ? 'dark' : 'light', false);
                    }
                });
            }
        }
    }

    applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;
        
        html.removeAttribute('data-theme');
        body.classList.remove('light-theme', 'dark-theme');
        
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            body.classList.add('dark-theme');
        } else {
            body.classList.add('light-theme');
        }
        
        this.currentTheme = theme;
        
        this.fixHeaderSticky();
        
        this.dispatchThemeChangeEvent(theme);
    }


    switchToTheme(theme, savePreference = true) {
        if (theme === this.currentTheme) return;
        
        if (!document.body.classList.contains('theme-transition')) {
            document.body.classList.add('theme-transition');
        }
        
        this.applyTheme(theme);
        this.updateButtonStates();
        
        if (savePreference) {
            this.saveThemePreference(theme);
        }
        

        this.addSwitchFeedback(theme);
    }


    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.switchToTheme(newTheme);
    }

    saveThemePreference(theme) {
        try {
            localStorage.setItem('preferred-theme', theme);
            this.preferredTheme = theme;
        } catch (error) {
            console.warn('Could not save theme preference to localStorage:', error);
        }
    }

    updateButtonStates() {
        if (!this.lightBtn || !this.darkBtn) return;
        
        this.lightBtn.classList.remove('active');
        this.darkBtn.classList.remove('active');
        
        if (this.currentTheme === 'dark') {
            this.darkBtn.classList.add('active');
        } else {
            this.lightBtn.classList.add('active');
        }
    }

    attachEventListeners() {
        if (!this.lightBtn || !this.darkBtn) return;
        
        this.lightBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToTheme('light');
        });
        
        this.darkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToTheme('dark');
        });
        
        this.lightBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.switchToTheme('light');
            }
        });
        
        this.darkBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.switchToTheme('dark');
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    addSwitchFeedback(theme) {
        const activeBtn = theme === 'dark' ? this.darkBtn : this.lightBtn;
        
        if (!activeBtn) return;

        activeBtn.classList.add('theme-switch-feedback');
        
        setTimeout(() => {
            activeBtn.classList.remove('theme-switch-feedback');
        }, 300);
    }

    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themechange', {
            detail: { 
                theme: theme,
                previousTheme: this.currentTheme === 'dark' ? 'light' : 'dark'
            }
        });
        
        document.dispatchEvent(event);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.switchToTheme(theme);
        } else {
            console.warn('Invalid theme. Use "light" or "dark".');
        }
    }

    resetToSystemPreference() {
        try {
            localStorage.removeItem('preferred-theme');
        } catch (error) {
            console.warn('Could not remove theme preference from localStorage:', error);
        }
        
        this.preferredTheme = null;
        
        const systemPrefersDark = window.matchMedia && 
                                window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        this.switchToTheme(systemPrefersDark ? 'dark' : 'light', false);
    }
}

let themeSwitcher = null;

function initThemeSwitcher() {
    if (!themeSwitcher) {
        themeSwitcher = new ThemeSwitcher();
    }
    return themeSwitcher;
}

window.ThemeManager = {
    getInstance: function() {
        return themeSwitcher || initThemeSwitcher();
    },
    
    setTheme: function(theme) {
        const instance = this.getInstance();
        instance.setTheme(theme);
    },
    
    toggle: function() {
        const instance = this.getInstance();
        instance.toggleTheme();
    },
    
    getCurrentTheme: function() {
        const instance = this.getInstance();
        return instance.getCurrentTheme();
    },
    
    resetToSystem: function() {
        const instance = this.getInstance();
        instance.resetToSystemPreference();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
    initThemeSwitcher();
}

const headerStickyCSS = `
.header {
    position: sticky !important;
    top: 0 !important;
    z-index: 1000 !important;
}

[data-theme="dark"] .header {
    position: sticky !important;
    top: 0 !important;
    z-index: 1000 !important;
}

/* Force sticky behavior after theme transitions */
.theme-transition .header {
    position: sticky !important;
    top: 0 !important;
}
`;

if (!document.getElementById('header-sticky-fix')) {
    const headerStyle = document.createElement('style');
    headerStyle.id = 'header-sticky-fix';
    headerStyle.textContent = headerStickyCSS;
    document.head.appendChild(headerStyle);
}


const themeTransitionCSS = `
.theme-transition,
.theme-transition *,
.theme-transition *:before,
.theme-transition *:after {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    transition-delay: 0s !important;
}

.theme-switch-feedback {
    transform: scale(1.1) !important;
    filter: brightness(1.2) !important;
}
`;

if (!document.getElementById('theme-transition-styles')) {
    const style = document.createElement('style');
    style.id = 'theme-transition-styles';
    style.textContent = themeTransitionCSS;
    document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeSwitcher, ThemeManager: window.ThemeManager };
}