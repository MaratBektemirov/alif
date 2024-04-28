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
```javascript
import { ABGD } from "alif"

const abgd = new ABGD('russian');

const result = (score, maxScore) => maxScore - score;

const abgd = new ABGD('russian');

abgd.matchStr('день', 'день', result);
-> 0
abgd.matchStr('день', 'дня', result);
-> 6
abgd.matchStr('пескарь', 'пискарь', result);
-> 4
abgd.matchStr('охота', 'ахота', result);
-> 20
abgd.matchStr('ясный', 'ясная', result);
-> 31
abgd.matchStr('ромео', 'ромио', result);
-> 3
abgd.matchStr('машина', 'машинист', result);
-> 3
abgd.matchStr('отец', 'отца', result);
-> 12
abgd.matchStr('день', 'надень', result);
-> 4
abgd.matchStr('день', 'пень', result);
-> 16
abgd.matchStr('машина', 'мошына', result);
-> 6
```