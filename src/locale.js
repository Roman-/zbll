import {createI18n} from 'vue-i18n'

import en from '@/assets/i18n/en.json'
import af from '@/assets/i18n/af.json'
import cs from '@/assets/i18n/cs.json'
import da from '@/assets/i18n/da.json'
import de from '@/assets/i18n/de.json'
import es from '@/assets/i18n/es.json'
import fr from '@/assets/i18n/fr.json'
import he from '@/assets/i18n/he.json'
import ru from '@/assets/i18n/ru.json'
import it from '@/assets/i18n/it.json'
import ja from '@/assets/i18n/ja.json'
import ko from '@/assets/i18n/ko.json'
import pl from '@/assets/i18n/pl.json'
import pt from '@/assets/i18n/pt.json'
import tr from '@/assets/i18n/tr.json'
import uk from '@/assets/i18n/uk.json'
import zh from '@/assets/i18n/zh.json'

export const supportedLocales = [
    {code: "af", messages: af, name: "Afrikaans", emoji: "🇿🇦"},
    {code: "cs", messages: cs, name: "Čeština", emoji: "🇨🇿"},
    {code: "da", messages: da, name: "Dansk", emoji: "🇩🇰"},
    {code: "de", messages: de, name: "Deutsch", emoji: "🇩🇪"},
    {code: "en", messages: en, name: "English", emoji: "🇬🇧"},
    {code: "es", messages: es, name: "Español", emoji: "🇪🇸"},
    {code: "fr", messages: fr, name: "Français", emoji: "🇫🇷"},
    {code: "he", messages: he, name: "עברית", emoji: "🇮🇱"},
    {code: "it", messages: it, name: "Italiano", emoji: "🇮🇹"},
    {code: "ja", messages: ja, name: "日本語", emoji: "🇯🇵"},
    {code: "ko", messages: ko, name: "한국어", emoji: "🇰🇷"},
    {code: "pl", messages: pl, name: "Polski", emoji: "🇵🇱"},
    {code: "pt", messages: pt, name: "Português", emoji: "🇵🇹"},
    {code: "ru", messages: ru, name: "Русский", emoji: "🇷🇺"},
    {code: "tr", messages: tr, name: "Türkçe", emoji: "🇹🇷"},
    {code: "uk", messages: uk, name: "Українська", emoji: "🇺🇦"},
    {code: "zh", messages: zh, name: "中文", emoji: "🇨🇳"},
]
const localStorageKey = "zbll_locale"
const defaultLocale = 'en';
export const addTranslationUrl = "https://docs.google.com/forms/d/1rhjD0q8zQRkH6i7QiAmNGEd5W-8tyJoOK-Q2UFQx5Jc/";

const supportedLocalesSet = new Set(supportedLocales.map(locale => locale.code));

const getUserLocale = () => {
    const localeFromStorage = localStorage.getItem(localStorageKey);
    if (supportedLocalesSet.has(localeFromStorage)) {
        return localeFromStorage;
    }
    const secondGuess = (window.navigator.language || window.navigator.userLanguage || defaultLocale)
        .split('-')[0].toLowerCase();
    return supportedLocalesSet.has(secondGuess) ? secondGuess : defaultLocale;
}

const userLocale = getUserLocale();
document.querySelector("html").setAttribute("lang", userLocale);

export const i18n = createI18n({
    legacy: false,
    locale: userLocale,
    fallbackLocale: defaultLocale,
    messages: supportedLocales.find(o => o.code === userLocale).messages
});

// code: 2-letter locale code
export const setLocaleAndReload = (code) => {
    if (!supportedLocales.find(o => o.code === code)) {
        console.error("setLocaleAndReload(", code, "). Supported: ", supportedLocales);
        return;
    }
    localStorage.setItem(localStorageKey, code);
    location.reload();
}

