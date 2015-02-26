$(document).ready(function(){
    var cardDeck = $("#cardDeck").playingCards();
    cardDeck.spread(); // show it

    var discardPile = $("#discardPile").playingCards();
    discardPile.spread();

    var hand = [];
    var hand1 = [];

    var showError = function(msg){
        $('#error').html(msg).show();
        setTimeout(function(){
            $('#error').fadeOut('slow');
        },3000);
    }
    var showHands = function(){
        var el = $('#yourHand')
        el.html('');
        for (var i=0; i<hand.length; i++){
            el.append(hand[i].getHTML());
        }
        el = $('#computerHand')
        el.html('');
        for (var i=0; i<hand1.length; i++){
            el.append(hand1[i].getHTML());
        }
    }
    var doShuffle = function(){
        cardDeck.shuffle();
        cardDeck.spread(); // update card table
    }
    var doDiscard = function(){
        if(!hand.length){
            showError('your hand is empty');
            return;
        }
        var c = hand.pop();
        discardPile.addCard(c);
        showHands();
        discardPile.spread();
    }
    var doDiscard1 = function(){
        if(!hand1.length){
            showError('your hand is empty');
            return;
        }
        var c = hand1.pop();
        discardPile.addCard(c);
        showHands();
        discardPile.spread();
    }    
    var doDrawCard = function(){
        var c = cardDeck.draw();
        if(!c){
            showError('no more cards');
            return;
        }
        hand[hand.length] = c;
        cardDeck.spread();
        showHands();
    }
    var doDrawCard1 = function(){
        var c = cardDeck.draw();
        if(!c){
            showError('no more cards');
            return;
        }
        hand1[hand1.length] = c;
        cardDeck.spread();
        showHands();
    }
    var doBackToDeck = function(){
        var c = discardPile.draw();
        if(!c){
            showError('no more cards');
            return;
        }
        cardDeck.addCard(c);
        cardDeck.spread();
        discardPile.spread();
        showHands();
    }
    var doDeal = function(){
        for (var i=0; i<7; i++){
            doDrawCard();
            doDrawCard1();
        }
    }
    $('#emptyDiscardPile').click(doEmptyDiscardPile);
    $('#backToDeck').click(doBackToDeck);
    $('#shuffler').click(doShuffle);
    $('#dealer').click(doDeal);
    $('#draw').click(doDrawCard);
    $('#draw1').click(doDrawCard1);
    $('#discard').click(doDiscard);
    $('#discard1').click(doDiscard1);
});
/*
// if we weren't using jquery to handle the document ready state, we would do this:
if (window.addEventListener) {
    window.addEventListener("load",initPlayingCards,false);
} else if (window.attachEvent) {
    window.attachEvent("onload",initPlayingCards);
} else {
    window.onload = function() {initPlayingCards();}
}
function initPlayingCards() {
    cardDeck = new playingCards();
}
*/
