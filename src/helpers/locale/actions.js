import { extractSession, saveSession } from '../session';
import i18n from '~configs/i18n';

export const SET_LOCALE = 'SET_LOCALE';

export const setLocale = (language = 'en') => (dispatch) => {
  const store = extractSession();

  dispatch({
    type: SET_LOCALE,
    payload: { lang: language },
  });

  if (language !== store.lang) {
    window.location.reload();
  }

  saveSession({ ...store, lang: language });
  i18n.changeLanguage(language);

  const isRTL = i18n.dir() === 'rtl';
  const rootHtml = document.documentElement;
  rootHtml.setAttribute('lang', language);
  if (isRTL) {
    rootHtml.setAttribute('dir', 'rtl');
  } else {
    rootHtml.setAttribute('dir', 'ltr');
  }
};
