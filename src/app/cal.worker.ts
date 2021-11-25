/// <reference lib="webworker" />

import { Fibonacci } from 'src/formula/fibonacci';
import { Prime } from 'src/formula/prime';

addEventListener('message', ({ data }) => {
  const valueAsNumber = data.valueAsNumber;
  const calculateOption = data.calculateOption;
  const id = data.id;
  let result = null;
  if (calculateOption === 'isFibonacci') {
    result = Fibonacci.isFibonacci(valueAsNumber);
  } else if (calculateOption === 'isPrime') {
    result = Prime.isPrime(valueAsNumber);
  }

  postMessage({ id, result });
});

addEventListener('error', (error) => {
  console.error(error.message);
});
