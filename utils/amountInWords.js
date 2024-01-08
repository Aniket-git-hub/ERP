function convertAmountToWords(amount) {
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convertLessThanOneThousand(number) {
        let words = "";
        if (number >= 100) {
            words += units[Math.floor(number / 100)] + " Hundred ";
            number %= 100;
        }
        if (number >= 20) {
            words += tens[Math.floor(number / 10)] + " ";
            number %= 10;
        }
        if (number > 0) {
            if (number < 10) {
                words += units[number] + " ";
            } else {
                words += teens[number - 10] + " ";
            }
        }
        return words;
    }

    if (amount === 0) {
        return "Zero";
    }

    let words = "";
    let billions = Math.floor(amount / 1000000000);
    let millions = Math.floor((amount % 1000000000) / 1000000);
    let thousands = Math.floor((amount % 1000000) / 1000);
    let remainder = amount % 1000;

    if (billions) {
        words += convertLessThanOneThousand(billions) + "Billion ";
    }

    if (millions) {
        words += convertLessThanOneThousand(millions) + "Million ";
    }

    if (thousands) {
        words += convertLessThanOneThousand(thousands) + "Thousand ";
    }

    if (remainder) {
        words += convertLessThanOneThousand(remainder);
    }

    return words.trim();
}


export default convertAmountToWords