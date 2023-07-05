

window.addEventListener("message", function (event) {
    switch (event.data.action) {
        case "StartMinigame":
                start()
            break;

    }




});

$(document).ready(function() {
    let first = 1
    let symbol = '+'
    let second = 2
    let count = 1
})



  


function start() {
    count = 1

    $('.hack-container').fadeIn(500)
    $('.main').fadeIn(500)
    $('.math-count').text(count + '/10')

    let symbols = ["*", "+", "-"];
    let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let randomNumber2 = Math.floor(Math.random() * 10) + 1;



    if (randomNumber > randomNumber2){
        first = randomNumber
        symbol = randomSymbol
        second = randomNumber2
    }else{
        first = randomNumber2
        symbol = randomSymbol
        second = randomNumber
    }


    $('.math').text(randomNumber + randomSymbol + randomNumber2)

    startProgressBar(50000, function () {
        $('.main').fadeOut(500)
        $('.przegrales').fadeIn(500)
        let audio = document.getElementById("error");
        audio.volume = 0.5
        audio.play();
        startProgressBar2(5000, function () {
            $('.przegrales').fadeOut(500) 
            $('.hack-container').fadeOut(500)
            $.post(`http://${GetParentResourceName()}/nieudane`)
        });
    });
    
}

$('#input').keypress(function(event) {
    if (event.keyCode === 13) { // Sprawdź, czy został wciśnięty klawisz Enter
      event.preventDefault(); // Zapobiegnij domyślnej akcji przeglądarki (np. wysłanie formularza)
      let text = $(this).val(); // Pobierz zawartość pola tekstowego
      $(this).val(""); // Wyczyść zawartość pola tekstowego

      let result = 0
      
      if (symbol == '+'){
        result = first + second
      } else if (symbol == "-"){
        result = first - second
      }else if (symbol == '*'){
        result = first * second
      }

      console.log(result)

      if (text == result){
        count = count + 1
        next(count)
      }else{
        $('.main').fadeOut(500)
        setTimeout(() => {
            let audio = document.getElementById("error");
            audio.volume = 0.5
            audio.play();
            $('.przegrales').fadeIn(500) 
            startProgressBar2(5000, function () {
                $('.przegrales').fadeOut(500) 
                $('.hack-container').fadeOut(500)

                $.post(`http://${GetParentResourceName()}/nieudane`)
            });
        }, 500);

      }
    }
  });



function startProgressBar(duration, onComplete) {
    var progressBar = document.getElementById("fill");
    var progress = 100;
    var interval = 10;
    var timer = setInterval(function() {
      if (progress <= 0) {
        clearInterval(timer);
        if (typeof onComplete === "function") {
          onComplete();
        }
      } else {
        progress -= (interval / duration) * 100;
        $('.time').text((progress / 2).toFixed(1) + 's');

        if (progress < 0) {
          progress = 0;
        }
        progressBar.style.width = progress + "%";
      }
    }, interval);
  }


  function startProgressBar2(duration, onComplete) {
    var progressBar = document.getElementById("fill2");
    var progress = 100;
    var interval = 10;
    var timer = setInterval(function() {
      if (progress <= 0) {
        clearInterval(timer);
        if (typeof onComplete === "function") {
          onComplete();
        }
      } else {
        progress -= (interval / duration) * 100;
        $('.time').text((progress / 2).toFixed(1) + 's');

        if (progress < 0) {
          progress = 0;
        }
        progressBar.style.width = progress + "%";
      }
    }, interval);
  }

function next(id) {
    if (id == 10){
        let audio = document.getElementById("win");
        audio.volume = 0.5
        audio.play();
        $('.main').fadeOut(500)
        $('.wygrales').fadeIn(500)
        startProgressBar3(5000, function () {
            $('.wygrales').fadeOut(500) 
            $('.hack-container').fadeOut(500)
            $.post(`http://${GetParentResourceName()}/udane`)
        });
    }else{
        $('.math-count').text(count + '/10')

        let symbols = ["*", "+", "-"];
        let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        let randomNumber2 = Math.floor(Math.random() * 10) + 1;
    
    
        if (randomNumber > randomNumber2){
            first = randomNumber
            symbol = randomSymbol
            second = randomNumber2
        }else{
            first = randomNumber2
            symbol = randomSymbol
            second = randomNumber
        }
    
        $('.math').text(randomNumber + randomSymbol + randomNumber2)
    }

}

function startProgressBar3(duration, onComplete) {
    var progressBar = document.getElementById("fill3");
    var progress = 100;
    var interval = 10;
    var timer = setInterval(function() {
      if (progress <= 0) {
        clearInterval(timer);
        if (typeof onComplete === "function") {
          onComplete();
        }
      } else {
        progress -= (interval / duration) * 100;
        $('.time').text((progress / 2).toFixed(1) + 's');

        if (progress < 0) {
          progress = 0;
        }
        progressBar.style.width = progress + "%";
      }
    }, interval);
  }