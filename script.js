// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

let matchedCard = document.getElementsByClassName("match");
let modal = document.getElementById("all-matched")
let clock = document.querySelector(".clock");

// array for opened cards
let openedCards = [];

// shuffleCards array returns card array
function shuffleCards(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// every time called when page is refreshed / loads
document.body.onload = startGame();

// function to start a new play 
function startGame() {
    // remove modal if
    modal.classList.remove("show")
    // empty the openCards array whenever the game restart
    openedCards = [];

    // shuffle deck to ensure each time cards shuffled
    cards = shuffleCards(cards);
    /* 
        remove all exisiting classes from each card like show, 
        open, match and disabled; clear existing cards position and 
        append shuffled one 
    */
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item).addEventListener("click", openCard);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset timer
    second = 0; minute = 0; hour = 0;
    clock.innerHTML = "00:00:00";
    clearInterval(interval);
}

// @description game timer
var second = 0, minute = 0; hour = 0;
var interval;
function startTimer(){
    interval = setInterval(function() {
        hours = hour < 10 ? "0" + hour : hour
        minutes = minute < 10 ? "0" + minute : minute
        seconds = second < 10 ? "0" + second : second
        clock.innerHTML = hours + ":" + minutes+ ":" + seconds;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// toggles open and show class to display cards
function openCard() {
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        second = 0; minute = 0; hour = 0;
        startTimer();
    }
    this.classList.add("open", "show", "disabled");
    openedCards.push(this);

    if(openedCards[0].type === openedCards[1].type) {
        openedCards[0].classList.add("match", "disabled");
        openedCards[1].classList.add("match", "disabled");
        openedCards[0].classList.remove("show", "open", "no-event");
        openedCards[1].classList.remove("show", "open", "no-event");
        // empty it once match class appended
        openedCards = [];
        if (matchedCard.length == 16) {
            clearInterval(interval);

            modal.classList.add("show");
            document.getElementById("finalMove").innerHTML = moves;
            document.getElementById("finalTime").innerHTML = clock.innerHTML;
        }
    } else {
        openedCards[0].classList.add("unmatched");
        openedCards[1].classList.add("unmatched");
        Array.prototype.filter.call(cards, function(card) {
            card.classList.add('disabled');
        });
        setTimeout(function(){
            openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
            openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
            Array.prototype.filter.call(cards, function(card) {
                card.classList.remove('disabled');
            });
            openedCards = [];
        }, 500);
    }
};
