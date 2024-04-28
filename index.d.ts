export const __esModule: boolean;
export type resultCallback = (score: number, maxScore: number, templatePermanentLength: number, wordPermanentLength: number, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number) => any;
/**
 *
 * @callback resultCallback
 * @param {number} score
 * @param {number} maxScore
 * @param {number} templatePermanentLength
 * @param {number} wordPermanentLength
 * @param {number} [x1]
 * @param {number} [x2]
 * @param {number} [x3]
 * @param {number} [x4]
 * @param {number} [x5]
 * @param {number} [x6]
 */
export class ABGD {
    /**
     * @param {'russian' | 'english'} language
     */
    constructor(language: 'russian' | 'english');
    LANGUAGES: {
        russian: {
            vowel: string[];
            consonant: string[];
        };
        english: {
            vowel: string[];
            consonant: string[];
        };
    };
    alphabet: Uint32Array;
    consonantLength: number;
    alphabetLength: number;
    _toIndexedArray(consonant: any, vowel: any): Uint32Array;
    /**
    * @param {string[][]} templateTuples - word tuple templates
    * @param {string[]} tuple - matched word tuple
    * @param {resultCallback} probabilityResult
    * @param {number} [x1]
    * @param {number} [x2]
    * @param {number} [x3]
    * @param {number} [x4]
    * @param {number} [x5]
    * @param {number} [x6]
    * @return {[number, number][]} probabilities
    */
    getTuplesProbabilities(templateTuples: string[][], tuple: string[], probabilityResult: resultCallback, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number): [number, number][];
    /**
     * @param {string[]} templateTuple - tuple of word templates
     * @param {string[]} tuple - tuple of matched words
     * @param {resultCallback} probabilityResult
     * @param {number} [x1]
     * @param {number} [x2]
     * @param {number} [x3]
     * @param {number} [x4]
     * @param {number} [x5]
     * @param {number} [x6]
     * @return {number} probability
     */
    getTupleProbability(templateTuple: string[], tuple: string[], probabilityResult: resultCallback, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number): number;
    /**
     * @param {string} template - word template
     * @param {string} word - matched word
     * @param {resultCallback} result
     * @param {number} [x1]
     * @param {number} [x2]
     * @param {number} [x3]
     * @param {number} [x4]
     * @param {number} [x5]
     * @param {number} [x6]
     * @return {number} score
     */
    matchStr(template: string, word: string, result: resultCallback, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number): number;
    /**
     * @param {number} letter
     * @return {1 | 0}
     */
    letterIsConsonant(letter: number): 1 | 0;
    /**
     * @param {number} letter
     * @return {1 | 0}
     */
    letterIsVowel(letter: number): 1 | 0;
    /**
     * @param {number[]} templateCodes
     * @param {number[]} wordCodes
     * @param {number} [x1]
     * @param {number} [x2]
     * @param {number} [x3]
     * @param {number} [x4]
     * @param {number} [x5]
     * @param {number} [x6]
     * @param {resultCallback} result
     * @return {number}
     */
    match(templateCodes: number[], wordCodes: number[], result: resultCallback, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number): number;
}
