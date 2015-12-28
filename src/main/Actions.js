import Action               from 'utils/Action';

/**
 * update the selected locale.
 * @param {string} locale
 * @param {func}
 */
export const updateLocale = new Action().async();

/**
 * add translation.
 * @param {string} ref
 * @param {object} translations {locale -> { key -> value}}
 * @param {func} callback
 */
export const addTranslation = new Action().async();
