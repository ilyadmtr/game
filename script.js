class Game {
    constructor() {
        this.isGame = false
        this.counterShowCard = 0;
        this.counterCorrect = 0;
    }
    setIsGame(value){
        this.isGame = value;
    }
}
let icons = ['⬛', '⬛', '🧡', '🧡', '⭐', '⭐', '🔥', '🔥', '🤡', '🤡']
let game = new Game();
function shuffle(array) {
    return array.slice(0).sort(() => Math.random() - 0.5);
}


function randomCards() {
    let array = shuffle(icons);
    $('.cards .box-front').each(function (index, html) {
        $(html).text(array[index]);
    })
}
function hideCards(){
    $('.box-inner').css('transform', 'rotateY(180deg)')
}

$('.start-btn').on('click',  function (){
    randomCards();
    $('.box-inner').css('transform', 'rotateY(0deg)')
    setTimeout(hideCards, 3000 )
    game.setIsGame(true);
    $('.card').css('cursor', 'pointer');
})

$('.card').on('click', function (e){
    if(game.isGame){
    game.counterShowCard++;
    if(game.counterShowCard <= 2){
        $(e.currentTarget).addClass('clicked');
    }
    if(game.counterShowCard === 2){
        if($('.clicked .box-front')[0].innerText === $('.clicked .box-front')[1].innerText){
            game.counterShowCard = 0;
            setTimeout(()=>{
                $('.clicked').addClass('win-card');
                $('.clicked').removeClass('clicked');
            }, 500)
        }
        else{
            setTimeout(()=>{
                game.counterShowCard = 0;
                $('.clicked').removeClass('clicked');
            }, 500)
        }
    }
    }
})



