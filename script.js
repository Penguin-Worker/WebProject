document.getElementById('languageSelect').addEventListener('change', function() {
    setLanguage(this.value);
});

let currentLanguage = 'en';
const supportedLanguages = ['en', 'ru'];

async function fetchTranslations(lang) {
    const response = await fetch(`/locales/${lang}/strings.json`);
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
