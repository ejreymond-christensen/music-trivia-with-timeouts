
var init = function(){
// Array of questions with wrong answers and a correct one.
  var questions = [
    {"question": "Who sings Wuthering Heights? Such a badass song!", "correctAnswer": "Kate Bush", "wrongAnswer1": "Susan Vega", "wrongAnswer2": "Bonnie Tyler", "wrongAnswer3": "Björk", "audio": "assets/audio/kb.mp3", "photo": "assets/imgs/kb.jpg"},
    {"question": "Who is the master at weaving dreams?", "correctAnswer": "Gary Wright", "wrongAnswer1": "Yes!", "wrongAnswer2": "Seals and Crofts", "wrongAnswer3": "E-L-P", "audio": "assets/audio/dream.mp3", "photo": "assets/imgs/dream.jpeg" },
    {"question": "Who's gonna sock it to the boys?", "correctAnswer": "Yelle", "wrongAnswer1": "Alizé", "wrongAnswer2": "Brigitte Bardot", "wrongAnswer3": "-M-" , "audio": "#", "photo": "assets/imgs/yelle.jpg"},
    {"question": "Fresh French beats by...", "correctAnswer": "Justice", "wrongAnswer1": "Daft Punk", "wrongAnswer2": "French Horn Rebellion", "wrongAnswer3": "-M-", "audio": "#", "photo": "assets/imgs/justice.jpeg" },
    {"question": "Who's gonna take you home when it's too late?", "correctAnswer": "The Cars", "wrongAnswer1": "The Romantics", "wrongAnswer2": "Cheap Trick", "wrongAnswer3": "Loverboy", "audio": "#", "photo": "assets/imgs/cars.jpg" },
    {"question": "Who's got the Beat?", "correctAnswer": "Miami Sound Machine", "wrongAnswer1": "Martika", "wrongAnswer2": "Exposé", "wrongAnswer3": "Paula Abdul", "audio": "#", "photo": "assets/imgs/msm.jpg" },
    {"question": "Tejano legend, before Queen B", "correctAnswer": "Selena", "wrongAnswer1": "Gloria Estefani", "wrongAnswer2": "Paulina Rubio", "wrongAnswer3": "Jennifer Lopez" , "audio": "#", "photo": "assets/imgs/selena.jpg"},
    {"question": "Urgent! Who is this Juke Box hero?", "correctAnswer": "Foreigner", "wrongAnswer1": "Journey", "wrongAnswer2": "Cheap Trick", "wrongAnswer3": "Styx" , "audio": "#", "photo": "assets/imgs/foreigner.jpg"},
    {"question": "Pinkfloyd Question", "correctAnswer": "Pink Floyd", "wrongAnswer1": "Yes!", "wrongAnswer2": "King Crimson", "wrongAnswer3": "E-L-P" , "audio": "#", "photo": "assets/imgs/pinkf.jpg"}
  ];
  // randomize the Array (hangman)
  var randomizer = function(x){
    x= x.sort(function(a, b){
       return 0.5 - Math.random();
    });
    console.log(x);
  };


  // Global Variables
  var arrayCounter= 0;
  var questionClock= 30;
  var intervalId;
  var tempAnswers= [];
  var correctAnswerThisRound= "";
  var playerCorrect = 0;
  var playerWrong = 0;
  var playerUnguessed =0;
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
      displayTempModal(correctAnswerThisRound +" is really disappointed in you...");
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

  var displayResultsModal = function(){
    $("#modalTitle").html("Results");
    $(".results").append('<p>Correctly guessed: '+playerCorrect+'</p>');
    $(".results").append('<p>Incorrect guesses: '+playerWrong+'</p>');
    $(".results").append('<p>Unguessed: '+playerUnguessed+'</p>');
    toggleModal();
    toggleButton();
  };



  // when the user finishes a tally of correct and wrong answers.
  var timeoutModule = function(){
    console.log("arrayCounter: "+arrayCounter);
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
    if (questions.length === arrayCounter){
      count= 0;
      displayResultsModal();
      clearInterval(intervalId);
    }
    else{
      tempAnswers=[];
      correctAnswerThisRound = "";
      propagateTempAnswers();
      population();
      console.log("correct: "+playerCorrect);
      clearInterval(intervalId);
    }
  };

  // reset of game on a click event.
  var start= function(){
    playerCorrect= 0;
    playerWrong= 0;
    playerUnguessed=0;
    arrayCounter= 0;
    questionClock= 30;
    tempAnswers= [];
    correctAnswerThisRound= "";
    intervalId = clearInterval(intervalId);
    randomizer(questions);
    propagateTempAnswers();
    population();
    toggleModal();
    startCountdown();
    $(".results").empty();
  };
};

//runs init onload
window.onload = function(){
  init();
};
