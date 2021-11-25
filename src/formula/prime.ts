export namespace Prime {
  export function isPrime(n: number) {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
    var m = Math.sqrt(n); //returns the square root of the passed value
    for (var i = 2; i <= m; i++) if (n % i == 0) return false;
    return true;
  }
}
