export const taxCalculator = (min, max, rate, prev) => {
  // Calculate tax for this bracket: (max - min) * rate
  const bracketTax = (max - min) * rate;
  // Add to previous cumulative tax
  const cumulativeTax = prev + bracketTax;
  return cumulativeTax;
}

export const getTaxBracket = (taxBracket = []) => {
  if (taxBracket.length === 0) return [];

  let cumulativeAmount = 0;

  return taxBracket.map((bracket) => {
    const maxTax = taxCalculator(bracket.startAt, bracket.endAt, bracket.rate, cumulativeAmount);
    cumulativeAmount = maxTax; // Update cumulative for next iteration
    return {
      ...bracket,
      maxTax: Math.ceil(maxTax)
    };
  });
}