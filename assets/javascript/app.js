
var init = function(){
// Array of questions with wrong answers and a correct one.
  var questions = [
    {"question": "This is a question", "correctAnswer": "snarf", "wrongAnswer1": "tygra", "wrongAnswer2": "cheetarah", "wrongAnswer3": "panthero" },
    {"question": "This is another question", "correctAnswer": "strider", "wrongAnswer1": "frodo", "wrongAnswer2": "samwise", "wrongAnswer3": "gandalf" },
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
  randomizer(questions);

  // Global Variables
  var arrayCounter = 0;
  var questionClock = 30;
  var intervalId;
  var tempAnswers= [];

  var propagateTempAnswers = function(){
    tempAnswers.push(questions[arrayCounter].wrongAnswer1);
    tempAnswers.push(questions[arrayCounter].wrongAnswer2);
    tempAnswers.push(questions[arrayCounter].wrongAnswer3);
    tempAnswers.push(questions[arrayCounter].correctAnswer);
    console.log("temp: " + tempAnswers);
    randomizer(tempAnswers);
  };
  propagateTempAnswers();



  // append the array to the HTML;
  var population = function(){
    $(".answersWrap").empty();
    $("h3").html(questions[arrayCounter].question);
    for (var i = 0; i < tempAnswers.length; i++) {
      var but = $("<button>");
      but.text(tempAnswers[i]);
      but.addClass("btn");
      but.addClass("btn-"+(i+1));

      $(".answersWrap").append(but);
    }
    arrayCounter++;
    console.log(arrayCounter);
    if (questions.length === arrayCounter){
      count= 0;
      //finish game
      clearInterval(intervalId);
    }
    tempAnswers=[];
    propagateTempAnswers();

  };
  population();

  var startCountdown = function() {
    intervalId = clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  };

  function decrement() {
    questionClock--;
    //console.log("clock: "+questionClock);
    $("#clock").html("Clock: "+questionClock+"s");
    if (questionClock === 0) {
      startCountdown();
      population();
      questionClock =30;
    }
  }
  startCountdown();

  // If correct =correct modal with timeout, if incorrect a wrong modal with time out and a else (for time out) with a modal.

  // when the user finishes a tally of correct and wrong answers.

  // reset of game on a click event.

};

//runs init onload
window.onload = function(){
  init();
};
