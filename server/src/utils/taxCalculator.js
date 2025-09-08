export const taxCalculator = (min, max, rate, prev) => {
  const current = prev + (max - min) * rate;
  prev = current;
  return current;
}

export const getTaxBracket = (taxBracket = []) => {
  if(taxBracket.length === 0) return [];
  
  let cumulativeAmount = 0;

  return taxBracket.map((bracket) => {
    const maxTax = taxCalculator(bracket.startAt, bracket.endAt, bracket.rate, cumulativeAmount);
    cumulativeAmount = maxTax; // Update cumulative for next iteration
    return {
      ...bracket,
      maxTax: Math.round(maxTax)
    };
  });
}