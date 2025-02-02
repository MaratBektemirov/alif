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
    * @param {number[][][]} templateTuples - word tuple templates
    * @param {number[][]} tuple - matched word tuple
    * @param {resultCallback} probabilityResult
    * @param {number} [x1]
    * @param {number} [x2]
    * @param {number} [x3]
    * @param {number} [x4]
    * @param {number} [x5]
    * @param {number} [x6]
    * @return {[number, number][]} probabilities
    */
    getTuplesProbabilities(templateTuples: number[][][], tuple: number[][], probabilityResult: resultCallback, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number): [number, number][];
    /**
     * @param {number[][]} templateTuple - tuple of word templates
     * @param {number[][]} tuple - tuple of matched words
     * @param {resultCallback} probabilityResult
     * @param {number} [x1]
     * @param {number} [x2]
     * @param {number} [x3]
     * @param {number} [x4]
     * @param {number} [x5]
     * @param {number} [x6]
     * @return {number} probability
     */
    getTupleProbability(templateTuple: number[][], tuple: number[][], probabilityResult: resultCallback, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number): number;
    /**
     * @param {string[]} arrString
     * @return {number[][]}
    */
    getTuple(arrString: string[]): number[][];
    /**
     * @param {string} str
     * @param {number[]} codesArr
     * @return {void}
    */
    updateCodesByString(str: string, codesArr: number[]): void;
    /**
     * @param {number[]} arr
     * @param {number[]} codesArr
     * @return {void}
    */
    updateCodes(arr: number[], codesArr: number[]): void;
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
     * @param {number} [x1]
     * @param {number} [x2]
     * @param {number} [x3]
     * @param {number} [x4]
     * @param {number} [x5]
     * @param {number} [x6]
     * @param {resultCallback} result
     * @return {number}
     */
    match(result: resultCallback, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number): number;
    /**
    * @param {number[]} templateCodesArr - template codes arr
    * @param {number[]} wordCodesArr - words codes arr
    * @param {resultCallback} result
    * @param {number} [x1]
    * @param {number} [x2]
    * @param {number} [x3]
    * @param {number} [x4]
    * @param {number} [x5]
    * @param {number} [x6]
    * @return {number} score
    */
    matchCodes(templateCodesArr: number[], wordCodesArr: number[], result: resultCallback, x1?: number, x2?: number, x3?: number, x4?: number, x5?: number, x6?: number): number;
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
}
