import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

const ACTIVE_PROFILE_STORAGE_KEY = 'netflix-active-profile';

function normalizeStoredImagePath(path) {
    if (!path) {
        return '';
    }

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    return path.replace(/^\.\//, '');
}

function resolveCatalogImagePath(path) {
    const normalizedPath = normalizeStoredImagePath(path);

    if (!normalizedPath) {
        return '';
    }

    if (/^https?:\/\//i.test(normalizedPath)) {
        return normalizedPath;
    }

    if (normalizedPath.startsWith('assets/')) {
        return `../${normalizedPath}`;
    }

    return normalizedPath;
}

function readProfileFromQuery() {
    const url = new URL(window.location.href);
    const name = url.searchParams.get('profileName')?.trim();
    const image = normalizeStoredImagePath(url.searchParams.get('profileImage')?.trim() || '');

    if (!name || !image) {
        return null;
    }

    return {
        name,
        image
    };
}

function getActiveProfile() {
    const queryProfile = readProfileFromQuery();

    if (queryProfile) {
        localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, JSON.stringify(queryProfile));
        return queryProfile;
    }

    const rawProfile = localStorage.getItem(ACTIVE_PROFILE_STORAGE_KEY);

    if (rawProfile) {
        try {
            const parsedProfile = JSON.parse(rawProfile);

            if (parsedProfile?.name && parsedProfile?.image) {
                return parsedProfile;
            }
        } catch {
            // Ignora valor invalido e usa fallback das chaves antigas.
        }
    }

    const legacyName = localStorage.getItem('perfilAtivoNome');
    const legacyImage = localStorage.getItem('perfilAtivoImagem');

    if (legacyName && legacyImage) {
        return {
            name: legacyName,
            image: legacyImage
        };
    }

    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const activeProfile = getActiveProfile();

    if (activeProfile) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');

        if (kidsLink) kidsLink.textContent = activeProfile.name;
        if (profileIcon) {
            profileIcon.src = resolveCatalogImagePath(activeProfile.image);
        }
    }

    const container = document.getElementById('main-content');
    
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
