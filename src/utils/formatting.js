/**
 * Formats a number as Indian Rupee
 * @param {number} amount 
 * @returns {string} e.g., "₹1,200"
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};
