if (typeof exports === 'undefined') {
    exports = {};
}

Object.defineProperty(exports, "__esModule", { value: true });
exports.ABGD = void 0;

const LANGUAGES = {
    'russian' : {
        vowel: ['а','и','о','у','ы','э','е','я','ь','ъ','ю'],
        consonant: ['б','в','г','д','ж','з','й','к','л','м','н','п','р','с','т','ф','х','ц','ч','ш','щ',],
    },
    'english' : {
        vowel: ['a','e','i','o','u','y'],
        consonant: ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'],
    },
}

const len8tab = new Uint32Array([
    0x00, 0x01, 0x02, 0x02, 0x03, 0x03, 0x03, 0x03, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04,
    0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05,
    0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06,
    0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06, 0x06,
    0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07,
    0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07,
    0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07,
    0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08,
])

function getLastBit(set) {
    let n = 0;

    if (set >= 1<<16) {
        set >>= 16
        n = 16
    }

    if (set >= 1<<8) {
        set >>= 8
        n += 8
    }

    return n + len8tab[set];
}

function getFirstBit(set) {
    return getLastBit(set & -set);
}

function firstBitToZero(set, firstBitIndex) {
    return set >> firstBitIndex << firstBitIndex;
}

function max(x, y) {
    return x ^ ((x ^ y) & -(x < y));
}

const wordSize = 32;

let indexedSetSize = 0;
const indexedSetValues = new Uint32Array(wordSize);
const indexedSetIndexes = new Int32Array(wordSize * 4);
indexedSetIndexes.fill(-1);

function addToIndexetSet(n) {
    if (indexedSetValues[indexedSetIndexes[n]]) {
        return;
    }

    indexedSetValues[indexedSetSize] = n;
    indexedSetIndexes[n] = indexedSetSize;
    indexedSetSize++;
}

const maxAlphabetSize = 64;
const wordPermanent = new Uint32Array(maxAlphabetSize);
const wordVariable = new Uint32Array(wordSize);
const wordCodes = new Uint32Array(wordSize);

const templatePermanentMatches = new Uint32Array(wordSize);
const templateVariable = new Uint32Array(wordSize);
const templateIndexes = new Uint32Array(wordSize);
const templateCodes = new Uint32Array(wordSize);

const sequencesPower = new Uint32Array(wordSize);
const deltas = new Int32Array(wordSize);

function fillSequencesAndGetMaxPowerSequence(cursor) {
    let maxSequencePower = 0;
    let delta = 0;

    while (cursor > 0) {
        templatePermanentMatches[cursor - 1] <<= ++delta;

        let sequence = templatePermanentMatches[cursor] & templatePermanentMatches[cursor - 1];

        while (sequence)
        {
            const index = getFirstBit(sequence);
    
            addToIndexetSet(index);
            const orderedIndex = indexedSetIndexes[index];
        
            templateIndexes[orderedIndex] = cursor;
            sequencesPower[orderedIndex]++;        
            deltas[orderedIndex] = cursor - index + delta;
            maxSequencePower = max(maxSequencePower, sequencesPower[orderedIndex]);
    
            sequence = firstBitToZero(sequence, index);
        }

        cursor--;
    }

    return maxSequencePower;
}

function getMaxSeqScore(index, maxSeqScore, power) {
    let seqScore = 0;
    
    const delta = deltas[indexedSetSize];
    const nullDelta = +(delta === 0);
    
    let i = 0;
    while (i < power)
    {
        i++;
        seqScore += addSeqScore(index++, delta, nullDelta);
    }

    return max(maxSeqScore, seqScore);
}

function addSeqScore(index, delta, nullDelta) {
    const templateIndex = index - 1;
    const wordIndex = templateIndex - delta;

    const templateVar = templateVariable[templateIndex];
    const wordVar = wordVariable[wordIndex];

    const templateVarExists = templateVar > 0;
    const wordVarExists = wordVar > 0;

    return 1 + (templateVar === wordVar) + (templateVarExists && wordVarExists) + (!templateVarExists && !wordVarExists) + nullDelta;
}

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

class ABGD {
    /**
     * @param {'russian' | 'english'} language
     */
    constructor(language) {
        this.LANGUAGES = LANGUAGES;
        const alphabet = LANGUAGES[language];
        this.alphabet = this._toIndexedArray(alphabet.consonant, alphabet.vowel);
        this.consonantLength = alphabet.consonant.length;
        this.alphabetLength = alphabet.consonant.length + alphabet.vowel.length;
    }
    
    _toIndexedArray(consonant, vowel) {
        const consonantLength = consonant.length;
    
        const arr = [];
    
        let i = consonantLength;
        while (i) {
            const code = consonant[i - 1].charCodeAt(0);
            arr[code] = i;
            i--;
        }
    
        i = vowel.length;
        while (i) {
            const code = vowel[i - 1].charCodeAt(0);
            arr[code] = i + consonantLength;
            i--;
        }
    
        return new Uint32Array(arr);
    }

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
    getTuplesProbabilities(templateTuples, tuple, probabilityResult, x1, x2, x3, x4, x5, x6) {
        const probabilities = []

        let i = 0
        while (i < templateTuples.length) {
            probabilities.push([
                this.getTupleProbability(templateTuples[i], tuple, probabilityResult, x1, x2, x3, x4, x5, x6),
                i,
            ])
            i++
        }

        probabilities.sort((a, b) => b[0] - a[0])

        return probabilities
    }

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
    getTupleProbability(templateTuple, tuple, probabilityResult, x1, x2, x3, x4, x5, x6) {
        let probability = 0;
    
        const m = [];
    
        let i = 0
        while (i < templateTuple.length) {
          const templateWord = templateTuple[i];
    
          let j = 0
          while (j < tuple.length) {
            const inputWord = tuple[j];
            const p = this.matchStr(templateWord, inputWord, probabilityResult, x1, x2, x3, x4, x5, x6)
            m.push([p,i,j])
            j++
          }
    
          i++
        }
    
        m.sort((a,b) => b[0] - a[0])
        i = 0
    
        let countedTemplateItems = 0;
        let countedInputItems = 0;
    
        while (i < m.length) {
          const m_i = m[i];
    
          const templateWord = 1 << m_i[1]
          const inputWord = 1 << m_i[2]
    
          if ((countedTemplateItems & templateWord) || (countedInputItems & inputWord)) {
            i++;
            continue;
          }
    
          countedTemplateItems |= templateWord
          countedInputItems |= inputWord
    
          probability += m_i[0]
    
          i++
        }

        if (probability > 0) {
            return probability/templateTuple.length;
        }

        return 0
    }

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
    matchStr(template, word, result, x1, x2, x3, x4, x5, x6) {
        const wordStrLength = word.length;
        let i = 0;
        while (i < wordStrLength) 
        {
            wordCodes[i] = word.charCodeAt(i);    
            i++;
        }

        const templateStrLength = template.length;
        i = 0;
        while (i < templateStrLength) 
        {
            templateCodes[i] = template.charCodeAt(i);    
            i++;
        }

        return this.match(templateCodes, wordCodes, result, x1, x2, x3, x4, x5, x6);
    }

    /**
     * @param {number} letter
     * @return {1 | 0}
     */
    letterIsConsonant(letter) {
        return +(letter <= this.consonantLength);
    }
    
    /**
     * @param {number} letter
     * @return {1 | 0}
     */
    letterIsVowel(letter) {
        return +(letter > this.consonantLength);
    }

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
    match(templateCodes, wordCodes, result, x1, x2, x3, x4, x5, x6) {
        const alphabet = this.alphabet;

        let wordPermanentLength = 0;
        let i = 0;
        while (wordCodes[i])
        {
            const letter = alphabet[wordCodes[i]];

            if (!letter) {
                i++;
                continue;
            }

            wordPermanent[letter] |= 1 << wordPermanentLength;

            let nextLetter = 0;

            if (this.letterIsConsonant(letter) && this.letterIsVowel(nextLetter = alphabet[wordCodes[i + 1]])) {
                wordVariable[wordPermanentLength] = nextLetter;
                i++;
            }
    
            wordPermanentLength++;
            i++;
        }
    
        let templatePermanentLength = 0;
        i = 0;
        while (templateCodes[i]) 
        {
            const letter = alphabet[templateCodes[i]];

            if (!letter) {
                i++;
                continue;
            }
            
            templatePermanentMatches[templatePermanentLength] = wordPermanent[letter];
    
            let nextLetter = 0;

            if (this.letterIsConsonant(letter) && this.letterIsVowel(nextLetter = alphabet[templateCodes[i + 1]])) {
                templateVariable[templatePermanentLength] = nextLetter;
                i++;
            }
    
            templatePermanentLength++;
            i++;
        }
  
        const maxSequencePower = fillSequencesAndGetMaxPowerSequence(templatePermanentLength - 1);
    
        let maxSeqScore = 0;
        while (indexedSetSize)
        {
            indexedSetSize--;

            if (sequencesPower[indexedSetSize] === maxSequencePower) {
                maxSeqScore = getMaxSeqScore(templateIndexes[indexedSetSize], maxSeqScore, maxSequencePower + 1);
            }

            deltas[indexedSetSize] = 0;
            templateIndexes[indexedSetSize] = 0;
            sequencesPower[indexedSetSize] = 0;
            indexedSetIndexes[indexedSetValues[indexedSetSize]] = -1;
            indexedSetValues[indexedSetSize] = 0;
        }

        let clearCursor = wordSize;
        while (clearCursor)
        {
            clearCursor--;
            wordVariable[clearCursor] = 0;
            templatePermanentMatches[clearCursor] = 0;
            templateVariable[clearCursor] = 0;
            templateCodes[clearCursor] = 0;
            wordCodes[clearCursor] = 0;
        }

        clearCursor = this.alphabetLength;
        while (clearCursor)
        {
            wordPermanent[clearCursor] = 0;
            clearCursor--;
        }
    
        const maxScore = templatePermanentLength * templatePermanentLength * 4;
        const score = maxSeqScore * (maxSequencePower + 1);

        return result(score, maxScore, templatePermanentLength, wordPermanentLength, x1, x2, x3, x4, x5, x6);
    }
}

exports.ABGD = ABGD;