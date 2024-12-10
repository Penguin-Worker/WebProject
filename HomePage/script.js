document.getElementById('languageSelect').addEventListener('change', function() {
    const selectedLanguage = this.value;
    setLanguage(selectedLanguage);
    saveLanguagePreference(selectedLanguage);
});

const supportedLanguages = ['en', 'ru'];
let currentLanguage = getSavedLanguage() || 'en';

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

function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

function getSavedLanguage() {
    return localStorage.getItem('preferredLanguage');
}

// Set the initial language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = getSavedLanguage();
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        document.getElementById('languageSelect').value = savedLanguage;
    }
    setLanguage(currentLanguage);
});


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

document.addEventListener('DOMContentLoaded', function () {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');

    function showRandomSlide() {
        // Скрыть все слайды
        slides.forEach(slide => slide.classList.remove('active'));

        // Выбрать случайный индекс слайда
        const randomIndex = Math.floor(Math.random() * slides.length);

        // Показать выбранный случайный слайд
        slides[randomIndex].classList.add('active');
    }

    // Показываем случайный слайд при загрузке страницы
    showRandomSlide();

    // Через определенный интервал времени показываем новый случайный слайд
    setInterval(() => {
        showRandomSlide();
    }, 2000); // Интервал в миллисекундах (например, каждые 3 секунды)
});
function callPhoneNumber(phoneNumber) {
    window.location.href = 'tel:' + phoneNumber;
}