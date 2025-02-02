<div align="center">
  <img src="https://github.com/MaratBektemirov/alif/raw/master/logo.png" width="128" height="128">
  <br>
  <br>
	<a href="https://badge.fury.io/js/alif">
		<img src="https://badge.fury.io/js/alif.svg">
	</a>
  <br>
  <br>
</div>

Alif — это высокопроизводительный инструмент для нечеткого поиска слов и приблизительного сопоставления по AF-парам.

Zero-dependency, меньше 16Kb в несжатом виде

Alif — is a high-perfomance tool for fuzzy word search and approximate matching by AF-pairs.

Zero-dependency, less than 16Kb in uncompressed form

## Установка

```
npm install alif
```

<font size = 7>[Демо](https://maratbektemirov.github.io/alif/)</font>

## Примеры  
### Определение расстояния меж слов
```javascript
import { ABGD } from "alif"

const abgd = new ABGD('russian');

const result = (score, maxScore) => maxScore - score;

const abgd = new ABGD('russian');

abgd.matchStr('день', 'день', result);
-> 0
abgd.matchStr('день', 'дня', result);
-> 4
abgd.matchStr('пескарь', 'пискарь', result);
-> 4
abgd.matchStr('охота', 'ахота', result);
-> 15
abgd.matchStr('ясный', 'ясная', result);
-> 24
abgd.matchStr('ромео', 'ромио', result);
-> 3
abgd.matchStr('машина', 'машинист', result);
-> 3
abgd.matchStr('отец', 'отца', result);
-> 6
abgd.matchStr('день', 'надень', result);
-> 4
abgd.matchStr('день', 'пень', result);
-> 12
abgd.matchStr('отец', 'праотца', result);
-> 15
abgd.matchStr('машина', 'мошына', result);
-> 6
```  
### Сопоставление кортежа с кортежами-шаблонами 
```javascript
import { ABGD } from "alif"

const probabilityResult = (score, maxScore, templatePermanentLength, wordPermanentLength, x1) => {
  return score/maxScore;
};

const abgd = new ABGD('russian');

const templateTuples = [
  ['отец','мыл','машину'],
  ['мама','мыла','раму'],
  ['машина','отца','помыта'],
  ['отец','отец','отец','отец','мыл','машину'],
  ['рама','мамы','моется'],
].map((arrString) => abgd.getTuple(arrString))

const tuple = abgd.getTuple(['мама','мыла','раму'])

abgd.getTuplesProbabilities(
  templateTuples,
  tuple,
  probabilityResult
)
-> [
    [1,1],
    [0.5555555555555556,4],
    [0.2777777777777778,0],
    [0.1388888888888889,3],
    [0,2]
  ]
```  
Грубо говоря мы можем определить, насколько та или иная строка соответствует заранее определенным шаблонам. Возвращается массив, каждый элемент массива состоит из вероятности и индекса. Массив отсортирован по убыванию, в зависимости от вероятности. Первый элемент в массиве и покажет наиболее вероятный шаблон.