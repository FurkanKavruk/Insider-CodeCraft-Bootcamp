function collatzSequenceLength(n, memo) {
    if (n in memo) return memo[n];  
    
    let original = n;
    let count = 1;
    
    while (n !== 1) {
        if (n in memo) {  
            count += memo[n] - 1;
            break;
        }
        n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
        count++;
    }
    
    memo[original] = count;  
    return count;
}

function longestCollatz(limit) {
    let maxStart = 0;
    let maxLength = 0;
    let memo = {};  

    for (let i = 1; i < limit; i++) {
        let length = collatzSequenceLength(i, memo);
        if (length > maxLength) {
            maxLength = length;
            maxStart = i;
        }
    }

    return maxStart;
}

console.log(longestCollatz(1000000));  