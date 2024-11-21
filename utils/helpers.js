const splitData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;
  
    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
        if (item === item.toLowerCase() && (!highestLowercase || item > highestLowercase)) {
          highestLowercase = item;
        }
      }
    });
  
    return { numbers, alphabets, highestLowercase };
  };
  
  const detectPrimes = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  module.exports = { splitData, detectPrimes };
  
