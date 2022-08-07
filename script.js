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
$('.start-btn').on('click',  async function (){
    $('.card').removeClass('clicked')
    $('.card').removeClass('win-card')
    $('.card').css('pointer-events', 'auto');
    randomCards();
    setTimeout(()=>{
        $('.box-inner').css('transform', 'rotateY(0deg)')
    }, 1000 )

    setTimeout(()=>{
        $('.box-inner').css('transform', 'rotateY(180deg)')
    game.setIsGame(true);
    $('.card').css('cursor', 'pointer');
    }, 3000 )
    $('.finish-btn').css('display', 'block')
    $('.start-btn').css('display', 'none')
})
$('.card').on('click', function (e){
    if(game.isGame){
        game.counterShowCard++;


    if(game.counterShowCard <= 2){
        $(e.currentTarget).addClass('clicked');
        $('.clicked').css('pointer-events', 'none');
    }
    if(game.counterShowCard === 2){
        if($('.clicked .box-front')[0].innerText === $('.clicked .box-front')[1].innerText){
            game.counterShowCard = 0;
            game.counterCorrect++;
            setTimeout(()=>{
                $('.clicked').addClass('win-card');
                $('.clicked').removeClass('clicked');
            }, 100)
        }
        else{
            setTimeout(()=>{
                game.counterShowCard = 0;
                $('.clicked').css('pointer-events', 'auto');
                $('.clicked').removeClass('clicked');
            }, 500)
        }
    }

    if(game.counterCorrect === 5){
        setTimeout(()=>$('.popup').addClass('show'), 500)
        $('.ok_btn').on('click', function (e){
            game.counterShowCard = 0;
            game.counterCorrect = 0;
            game.setIsGame(false);
            $('.popup').removeClass('show')
            $('.finish-btn').css('display', 'none')
            $('.start-btn').css('display', 'block')
            $('.card').removeClass('win-card')
            $('.card').css('pointer-events', 'auto');
            $('.card').css('cursor', 'auto');
        })
    }
    }
})
$('.finish-btn').on('click', function (e){
    if(game.isGame){
        game.setIsGame(false)
        game.counterShowCard = 0;
        game.counterCorrect = 0;
        $('.card').addClass('clicked');
        $('.finish-btn').css('display', 'none')
        $('.start-btn').css('display', 'block')
    }
})