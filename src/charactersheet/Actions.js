import Action               from 'utils/Action';
import CharacterSheet       from 'model/CharacterSheet';
import * as Api             from 'api/RulesApi';

/**
 * @param {string} ruleSystem.
 */
export const initCreation = new Action().async();

/**
 * @param {string} ruleSystem.
 * @param {CharacterSheet}
 */
export const save = new Action().async( Api.save );