const THEME_STORAGE_KEY = 'netflix-theme';
const ACTIVE_PROFILE_STORAGE_KEY = 'netflix-active-profile';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

const root = document.documentElement;
const themeToggleButton = document.querySelector('[data-theme-toggle]');
const profileLinks = document.querySelectorAll('.profile');
const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');

function normalizeProfileImagePath(rawPath) {
    if (!rawPath) {
        return '';
    }

    if (/^https?:\/\//i.test(rawPath)) {
        return rawPath;
    }

    return rawPath.replace(/^\.\//, '');
}

function saveActiveProfile(profileElement) {
    const profileName = profileElement.querySelector('figcaption')?.textContent?.trim();
    const profileImage = profileElement.querySelector('img')?.getAttribute('src');

    if (!profileName || !profileImage) {
        return;
    }

    const profilePayload = {
        name: profileName,
        image: normalizeProfileImagePath(profileImage)
    };

    localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, JSON.stringify(profilePayload));
}

function buildCatalogUrl(profileElement) {
    const rawHref = profileElement.getAttribute('href') || 'catalogo/catalogo.html';
    const href = normalizeProfileImagePath(rawHref);
    const profileName = profileElement.querySelector('figcaption')?.textContent?.trim();
    const profileImage = normalizeProfileImagePath(
        profileElement.querySelector('img')?.getAttribute('src') || ''
    );

    if (!profileName || !profileImage) {
        return href;
    }

    const separator = href.includes('?') ? '&' : '?';
    return `${href}${separator}profileName=${encodeURIComponent(profileName)}&profileImage=${encodeURIComponent(profileImage)}`;
}

function updateThemeButton(theme) {
    if (!themeToggleButton) {
        return;
    }

    const isLightTheme = theme === THEME_LIGHT;
    themeToggleButton.setAttribute('aria-pressed', String(isLightTheme));
    themeToggleButton.setAttribute(
        'aria-label',
        isLightTheme ? 'Ativar modo escuro' : 'Ativar modo claro'
    );
}

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    updateThemeButton(theme);
}

function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
        return savedTheme;
    }

    return colorSchemeQuery.matches ? THEME_LIGHT : THEME_DARK;
}

function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || THEME_DARK;
    const nextTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;

    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
}

applyTheme(getInitialTheme());

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
}

profileLinks.forEach((profileLink) => {
    profileLink.addEventListener('click', (event) => {
        event.preventDefault();
        saveActiveProfile(profileLink);

        const targetUrl = buildCatalogUrl(profileLink);
        window.location.href = targetUrl;
    });
});

colorSchemeQuery.addEventListener('change', (event) => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
        return;
    }

    applyTheme(event.matches ? THEME_LIGHT : THEME_DARK);
});
