export namespace Fibonacci {
  function isPerfectSquare(x: number) {
    const s = Math.sqrt(x);
    return s * s == x;
  }

  export function isFibonacci(n: number) {
    return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
  }
}
