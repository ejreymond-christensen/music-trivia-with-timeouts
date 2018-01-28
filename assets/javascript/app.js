
var init = function(){
// Array of questions with wrong answers and a correct one.
  var questions = [
    {"question": "Who sings Wuthering Heights? Such a badass song!", "correctAnswer": "Kate Bush", "wrongAnswer1": "Susan Vega", "wrongAnswer2": "Bonnie Tyler", "wrongAnswer3": "Björk", "audio": "assets/audio/kb.mp3", "photo": "assets/imgs/kb.jpg"},
    {"question": "Who is the master at weaving dreams?", "correctAnswer": "Gary Wright", "wrongAnswer1": "Yes!", "wrongAnswer2": "Seals and Crofts", "wrongAnswer3": "E-L-P", "audio": "assets/audio/dream.mp3", "photo": "assets/imgs/dream.jpeg" },
    {"question": "This is a new question", "correctAnswer": "tyrion", "wrongAnswer1": "jaime", "wrongAnswer2": "cersie", "wrongAnswer3": "robb" },
    {"question": "This is a newer question", "correctAnswer": "arya", "wrongAnswer1": "sansa", "wrongAnswer2": "brann", "wrongAnswer3": "robb" },
    {"question": "Question anew", "correctAnswer": "snarf", "wrongAnswer1": "snarfsnarf", "wrongAnswer2": "snar", "wrongAnswer3": "sn" },
    {"question": "Boring Question", "correctAnswer": "chewbaka", "wrongAnswer1": "solo", "wrongAnswer2": "soulow", "wrongAnswer3": "so-low" },
    {"question": "Mario Question", "correctAnswer": "Yoshi", "wrongAnswer1": "toad", "wrongAnswer2": "luigi", "wrongAnswer3": "mario" },
    {"question": "This question", "correctAnswer": "foo", "wrongAnswer1": "bar", "wrongAnswer2": "foobar", "wrongAnswer3": "foofoobar" },
  ];
  // randomize the Array (hangman)
  var randomizer = function(x){
    x= x.sort(function(a, b){
       return 0.5 - Math.random();
    });
    console.log(x);
  };


  // Global Variables
  var modalVisable= true;
  var arrayCounter= 0;
  var questionClock= 30;
  var intervalId;
  var tempAnswers= [];
  var correctAnswerThisRound= "";
  var playerCorrect;
  var playerWrong;
  var playerUnguessed;
  var audio;
  var photo;


  var propagateTempAnswers = function(){
    tempAnswers.push(questions[arrayCounter].wrongAnswer1);
    tempAnswers.push(questions[arrayCounter].wrongAnswer2);
    tempAnswers.push(questions[arrayCounter].wrongAnswer3);
    tempAnswers.push(questions[arrayCounter].correctAnswer);
    correctAnswerThisRound = questions[arrayCounter].correctAnswer;
    audio= new Audio(questions[arrayCounter].audio);
    photo= questions[arrayCounter].photo;
    console.log("correct: 3" +correctAnswerThisRound);
    console.log("temp: " + tempAnswers);
    randomizer(tempAnswers);
  };



  // append the array to the HTML;
  var population = function(){
    $(".answersWrap").empty();
    $("h3").html(questions[arrayCounter].question);
    $("img").attr("src", photo);
    for (var i = 0; i < tempAnswers.length; i++) {
      var but = $("<button>");
      var butId = "btn-"+(i+1);
      but.text(tempAnswers[i]);
      but.addClass("btn");
      but.attr("id", butId);

      $(".answersWrap").append(but);
    }
    arrayCounter++;
    console.log(arrayCounter);
    if (questions.length === arrayCounter){
      count= 0;
      //finish game
      clearInterval(intervalId);
    }
  };

  var startCountdown = function() {
    console.log("ding");
    questionClock =30;
    audio.play();
    $("#clock").html("Clock: "+questionClock+"s");
    intervalId = clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  };

  function decrement() {
    questionClock--;
    //console.log("clock: "+questionClock);
    $("#clock").html("Clock: "+questionClock+"s");
    if (questionClock === 0) {
      displayTempModal("too slow");
      audio.pause();
      playerUnguessed++;
      questionClock =30;
    }
  }

  //chosing answer functionality
  $("body").on("click", "button.btn", function(){
    console.log ("hi");
    var selection = $(this).text();
    audio.pause();
    console.log("selection: " +selection);
    console.log("correct: " +correctAnswerThisRound);
    if(selection === correctAnswerThisRound){
      displayTempModal("Correct!");
      playerCorrect++;
    }
    else{
      displayTempModal("Sorry, wrong Answer!");
      playerWrong++;
    }
  });
  // If correct =correct modal with timeout, if incorrect a wrong modal with time out and a else (for time out) with a modal.
  var displayTempModal = function(x){
    $("#modalTitle").html(x);
    toggleModal();
    setTimeout(timeoutModule, 4000);
    setTimeout(startCountdown, 4000);
  };



  // when the user finishes a tally of correct and wrong answers.
  var timeoutModule = function(){
    toggleModal();
    nextLevel();
  };
  //Toggle modal
  var toggleModal = function(){
      $(".modal").toggleClass("hide");
  };

  var toggleButton = function(){
    $("#modalButton").toggleClass("hide");
  };

  // reset & of game on a click event.
  $("#modalButton").on("click", function(){
    start();
    toggleButton();
  });
  var nextLevel= function(){
    tempAnswers=[];
    correctAnswerThisRound = "";
    propagateTempAnswers();
    population();
    console.log("correct: "+playerCorrect);
  };

  // reset of game on a click event.
  var start= function(){
    playerCorrect= "";
    playerWrong= "";
    playerUnguessed="";
    arrayCounter= 0;
    questionClock= 30;
    intervalId= "";
    tempAnswers= [];
    correctAnswerThisRound= "";
    randomizer(questions);
    propagateTempAnswers();
    population();
    toggleModal();
    startCountdown();
  };
};

//runs init onload
window.onload = function(){
  init();
};
