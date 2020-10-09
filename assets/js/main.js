// Elements in the UI
let result = document.querySelector('#result');
let bestWorst = document.querySelector('#best-worst');

// Dice arrays
let dice = {
    d4: [1, 2, 3, 4],
    d6: [1, 2, 3, 4, 5, 6],
    d8: [1, 2, 3, 4, 5, 6, 7, 8],
    d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
};

// Placeholder for die rolls
let rolls;


//
// Methods
//

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
let shuffle = function (array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

/**
 * Shuffle the dice on page load
 */
let startingShuffle = function () {
    for (let key in dice) {
        if (dice.hasOwnProperty(key)) {
            shuffle(dice[key]);
        }
    }
};

/**
 * Roll the dice
 * @param  {String} d The die size to use
 */
let roll = function (d) {
    shuffle(dice[d]);
    rolls.push(dice[d][0]);
};

/**
 * Handle click events
 * @param  {Event} event The event object
 */
let clickHandler = function (event) {

    // Only run on [data-roll] elements
    let d = event.target.getAttribute('data-roll');
    if (!d) return;

    // Clear the rolls array
    rolls = [];

    // Roll the dice
    roll(d);

    // If best of/worst of, roll again
    if (bestWorst.checked) {
        roll(d);
    }

    // Render the result in the UI
    result.textContent = rolls.join(' - ');

};


//
// Event Listeners
//

// Shuffle the dice numbers on load
startingShuffle();

// Listen for clicks in the DOM
document.addEventListener('click', clickHandler);