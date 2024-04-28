const { ABGD } = require('../index');

const testPerfomance = (repeats, description, func) => {
  const t1 = Date.now();
  for (let i = 0; i < repeats; ++i) {
    func();
  }
  const t2 = Date.now();
  const dt = t2 - t1;

  return dt;
};

const testWords = {
  english: {
    words: [
      'car',
      'machine',
      'test',
      'aberration',
      'abjure',
      'abrogate',
      'anachronism',
      'arrant', 
      'artless', 
      'asperity', 
      'belie', 
      'byzantine', 
      'cajole', 
      'conciliate', 
      'connecticutian', 
      'consanguineous', 
      'demagogue', 
      'diatribe', 
      'dilatory', 
      'embourgeoisement', 
      'equivocate', 
      'fatuous', 
      'gaffe', 
      'garrulous', 
      'polloi', 
      'hubris', 
      'iconoclast', 
      'impedimenta', 
      'inchoate', 
      'indefatigable', 
      'inundate', 
      'invective', 
      'jackasseries', 
      'martinet', 
      'myrmecophilous', 
      'nonplussed', 
      'omphaloskepsis', 
      'panache', 
      'pillory', 
      'polyphiloprogenitive', 
      'psychotomimetic', 
      'puissant', 
      'powerful', 
      'pulchritudinous', 
      'physically', 
      'beautiful',
      'quattuordecillion',
    ],
    wordsPermanent: [
      'cr',
      'mchn',
      'tst',
      'abrrton',
      'abjr',
      'abrgt',
      'anchrnsm',
      'arrnt', 
      'artlss', 
      'asprt', 
      'ble', 
      'bzntn', 
      'cjl', 
      'cnclat', 
      'cnnctctan', 
      'cnsnginous', 
      'dmgge', 
      'datrb', 
      'dltr', 
      'emburgoismnt', 
      'eqivct', 
      'ftous', 
      'gff', 
      'grrlus', 
      'plli', 
      'hbrs', 
      'icnclst', 
      'impdmnt', 
      'inchat', 
      'indftgbl', 
      'inndt', 
      'invctv', 
      'jckssres', 
      'mrtnt', 
      'mrmcphlus', 
      'nnplssd', 
      'omphlskpss', 
      'pnch', 
      'pllr', 
      'plphlprgntv', 
      'pschtmmtc', 
      'pissnt', 
      'pwrfl', 
      'plchrtdnus', 
      'phscll', 
      'bautfl',
      'qattordcllon',
    ],
  },
  russian: {
    words: [
      'радиоаэронавигация',
      'радиоаудитория',
      'ротмистрство',
      'адъюнктство',
      'метеоаэробюллетень',
      'гидроаэроионизация',
      'фельдъегерь',
      'телегаммааппарат',
      'водоворотоподобно',
      'водоворотозасососпособность',
      'цецецница',
      'тригонометрия',
      'ротатор',
      'тартрат',
      'скелет',
      'телекс',
      'четырёхдюймовка',
      'поздравительный',
    ],
    wordsPermanent: [
      'рдоаэрнвгця',
      'рдоаудтря',
      'ртмстрств',
      'адюнктств',
      'мтоаэрбллтн',
      'гдраэрионзця',
      'флдегр',
      'тлгммаппрт',
      'вдвртпдбн',
      'вдвртзссспсбнст',
      'цццнц',
      'тргнмтря',
      'рттр',
      'тртрт',
      'склт',
      'тлкс',
      'чтрхдймвк',
      'пздрвтлнй',
    ],
  }
}

test('word consonant russian', () => {
  const result = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    const scoreTest = (maxScore - score) === 0 ? 1 : 0;
    const consonantLength = templatePermanentLength === wordPermanentLength && templatePermanentLength === x1 ? 1 : 0;

    return scoreTest && consonantLength;
  };

  const abgd = new ABGD('russian');
  let test = 1;
  let i = 0;

  while (i < testWords.russian.words.length) {
    test = test && abgd.matchStr(testWords.russian.words[i], testWords.russian.words[i], result, testWords.russian.wordsPermanent[i].length);
    i++;
  }

  expect(test).toStrictEqual(1);
});

test('word score russian 1', () => {
  const result = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    const scoreTest = score === 4 * templatePermanentLength * templatePermanentLength ? 1 : 0;

    return scoreTest;
  };

  const abgd = new ABGD('russian');

  let test = 1;
  let i = 0;
  const after = 'коза';
  const before = 'коза';

  while (i < testWords.russian.words.length) {
    test = test && abgd.matchStr(testWords.russian.words[i], testWords.russian.words[i], result, i);
    i++;
  }

  expect(test).toStrictEqual(1);
});

test('word score russian 2', () => {
  const result = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    const scoreTest = maxScore - score ? 0 : 1;

    return scoreTest;
  };

  const abgd = new ABGD('russian');

  let test = 1;
  let i = 0;
  const before = 'коза';

  while (i < testWords.russian.words.length) {
    test = test && abgd.matchStr(testWords.russian.words[i], testWords.russian.words[i] + before, result, i);
    i++;
  }

  expect(test).toStrictEqual(1);
});

test('word score russian 3', () => {
  const result = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    return maxScore - score;
  };

  const abgd = new ABGD('russian');

  const a = abgd.matchStr('день', 'день', result);
  const b = abgd.matchStr('день', 'дня', result);
  const c = abgd.matchStr('пескарь', 'пискарь', result);
  const d = abgd.matchStr('охота', 'ахота', result);
  const e = abgd.matchStr('ясный', 'ясная', result);
  const f = abgd.matchStr('ромео', 'ромио', result);
  const g = abgd.matchStr('машина', 'машинист', result);
  const h = abgd.matchStr('отец', 'отца', result);
  const i = abgd.matchStr('день', 'надень', result);
  const j = abgd.matchStr('день', 'пень', result);
  const z = abgd.matchStr('машина', 'мошына', result);

  expect({
    a,b,c,d,e,f,g,h,j,i,z
  }).toStrictEqual({
    a: 0,
    b: 6,
    c: 4,
    d: 20,
    e: 31,
    f: 3,
    g: 3,
    h: 12,
    i: 4,
    j: 16,
    z: 6,
  });
});

test('word russian input error 1', () => {
  const result = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    return maxScore - score;
  };

  const abgd = new ABGD('russian');

  expect(abgd.matchStr('день', 'day', result)).toStrictEqual(16);
});

test('word russian input error 2', () => {
  const result = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    return maxScore - score;
  };

  const abgd = new ABGD('russian');

  expect(abgd.matchStr('day', 'день', result)).toStrictEqual(0);
});

test('tuples 1', () => {
  const probabilityResult = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    return score/maxScore;
  };

  const abgd = new ABGD('russian');

  const probability_1 = abgd.getTupleProbability(['мама','мыла','раму'], ['мама','мыла','раму'], probabilityResult)
  const probability_2 = abgd.getTupleProbability(['мама','мыла','раму'], ['рама','мамы','моется'], probabilityResult)

  const probability_3 = abgd.getTupleProbability(['отец','мыл','машину'], ['отец','мыл','машину'], probabilityResult)
  const probability_4 = abgd.getTupleProbability(['отец','мыл','машину'], ['машина','отца','помыта'], probabilityResult)
  const probability_5 = abgd.getTupleProbability(['отец','мыл','машину'], ['отец','отец','отец','отец','мыл','машину'], probabilityResult)

  const test = {
    probability_1, probability_2, probability_3, probability_4, probability_5
  }

  expect(test).toStrictEqual({
    probability_1: 1, 
    probability_2: 0.5833333333333334, 
    probability_3: 1, 
    probability_4: 0.5277777777777778, 
    probability_5: 1
  });
});

test('tuples 2', () => {
  const probabilityResult = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    return score/maxScore;
  };

  const abgd = new ABGD('russian');

  const probabilities = abgd.getTuplesProbabilities(
    [
      ['отец','мыл','машину'],
      ['мама','мыла','раму'],
      ['машина','отца','помыта'],
      ['отец','отец','отец','отец','мыл','машину'],
      ['рама','мамы','моется'],
    ],
    ['мама','мыла','раму'],
    probabilityResult
  )

  expect(probabilities).toStrictEqual([
    [1,1],
    [0.5833333333333334,4],
    [0.25,0],
    [0.125,3],
    [0,2]
  ]);
});

test('word consonant english', () => {
  const result = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
    const scoreTest = (maxScore - score) === 0 ? 1 : 0;
    const consonantLength = templatePermanentLength === wordPermanentLength && templatePermanentLength === x1 ? 1 : 0;

    return scoreTest && consonantLength;
  };

  const abgd = new ABGD('english');
  let test = 1;
  let i = 0;

  while (i < testWords.english.words.length) {
    test = test && abgd.matchStr(testWords.english.words[i], testWords.english.words[i], result, testWords.english.wordsPermanent[i].length, i);
    i++;
  }

  expect(test).toStrictEqual(1);
});

test('perfomance test 1', () => {
  const result = (score, maxScore) => maxScore - score;
  const abgd = new ABGD('russian');

  const t = testPerfomance(1_000_000, 'create hash test', () => {
    abgd.matchStr('высокоскоростной', 'высокаскорастная', result);
  })

  expect(t).toBeLessThan(1000);
})

test('perfomance test 2', () => {
  const result = (score, maxScore) => maxScore - score;
  const abgd = new ABGD('russian');

  const t = testPerfomance(100_000, 'create hash test', () => {
    const probabilityResult = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
      return score/maxScore;
    };
  
    const probabilities = abgd.getTuplesProbabilities( 
      [
        ['отец','мыл','машину'],
        ['мама','мыла','раму'],
        ['машина','отца','помыта'],
        ['отец','отец','отец','отец','мыл','машину'],
        ['рама','мамы','моется'],
      ],
      ['мама','мыла','раму'],
      probabilityResult
    )
  })

  expect(t).toBeLessThan(1000);
})