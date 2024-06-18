document.getElementById('languageSelect').addEventListener('change', function() {
    setLanguage(this.value);
});

let currentLanguage = 'en';
const supportedLanguages = ['en', 'ru'];

async function fetchTranslations(lang) {
    const response = await fetch(`../locales/${lang}/strings.json`);
    const translations = await response.json();
    return translations;
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}

async function setLanguage(lang) {
    if (!supportedLanguages.includes(lang)) {
        console.error(`Language ${lang} is not supported.`);
        return;
    }
    currentLanguage = lang;
    const translations = await fetchTranslations(lang);
    applyTranslations(translations);
}

// Set the initial language
setLanguage(currentLanguage);

// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu1');
    const burgerMenuContent = document.getElementById('burger-menu-content');

    burgerMenu.addEventListener('click', () => {
        burgerMenuContent.classList.toggle('active');
    });

    // Закрытие меню при нажатии на ссылку
    const menuLinks = document.querySelectorAll('.burger-menu-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenuContent.classList.remove('active');
        });
    });
});

// script.js

// Проверяем сохраненную тему при загрузке страницы
window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Переключение темы и сохранение предпочтений
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.removeItem('theme');
    }
    
});
document.getElementById('theme-toggleL').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.removeItem('theme');
    }
});
