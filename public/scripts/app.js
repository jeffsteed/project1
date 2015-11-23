window.onload = function() {
  console.log("Window has loaded.");

  play();

};

var turns = 0;
var round = 1;
var player1Score = 0;
var player2Score = 0;
//--------------------------------------------------------------------
var playerOneName;
var playerTwoName;
//--------------------------------------------------------------------
var currentPlayer;
var diceArray = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5'];

var diceImgs = {
  img1: 'images/ChineseOne.bmp',
  img2: 'images/ChineseTwo.bmp',
  img3: 'images/ChineseThree.bmp',
  img4: 'images/ChineseFour.bmp',
  img5: 'images/ChineseFive.bmp'
}

var dice = {
  dice1: document.getElementById('dice1'),
  dice2: document.getElementById('dice2'),
  dice3: document.getElementById('dice3'),
  dice4: document.getElementById('dice4'),
  dice5: document.getElementById('dice5'),
  num1: document.getElementById('num1'),
  num2: document.getElementById('num2'),
  num3: document.getElementById('num3'),
  num4: document.getElementById('num4'),
  num5: document.getElementById('num5'),
  rollBtn: document.getElementById('roll-dice'),
  endTurnBtn: document.getElementById('end-turn'),
  dice1Value: null,
  dice2Value: null,
  dice3Value: null,
  dice4Value: null,
  dice5Value: null,
  diceRolled: false,

  // Function to identify selected dice
  setDiceEventListeners: function() {
    console.log("Event listeners added.");
    for (var eachDie in diceArray) {
      var die = dice[diceArray[eachDie]];
      die.addEventListener('click', function() {
        var myDie = this;
        if (myDie.classList.contains('selected')) {
          myDie.classList.remove('selected');
        } else {
          myDie.classList.add('selected');
        }
      });
    }
  },

  // Rolls all dice that have not been selected
  diceRoll: function() {

    var diceToRoll = [];
    for (var eachDie in diceArray) {
      var die = this[diceArray[eachDie]];
      if (!die.classList.contains('selected')) {
        diceToRoll.push(die);
      }
    }
    for (var i = 0; i < diceToRoll.length; i++) {
      diceToRoll[i].style.backgroundImage = "url('" + this.roll(diceToRoll[i]) + "')";
    }
    turns++;
    if (turns == 1 && !dice.diceRolled) {
      dice.setDiceEventListeners();
      dice.diceRolled = true;
    }
    takeTurn();
  },

  // Randomly selects an outcome of each dice roll
  roll: function(diceID) {
    console.log("roll has ran");
    var num = Math.floor(Math.random() * 5 + 1);
    switch (diceID.id) {
      case 'dice1':
        dice.dice1Value = num;
        dice.num1.innerHTML = "<h1>" + dice.dice1Value + "</h1>";
        break;
      case 'dice2':
        dice.dice2Value = num;
        dice.num2.innerHTML = "<h1>" + dice.dice2Value + "</h1>";
        break;
      case 'dice3':
        dice.dice3Value = num;
        dice.num3.innerHTML = "<h1>" + dice.dice3Value + "</h1>";
        break;
      case 'dice4':
        dice.dice4Value = num;
        dice.num4.innerHTML = "<h1>" + dice.dice4Value + "</h1>";
        break;
      case 'dice5':
        dice.dice5Value = num;
        dice.num5.innerHTML = "<h1>" + dice.dice5Value + "</h1>";
        break;
      default:
        console.log("Error: Incorrect ID passed.");
    }

    switch (num) {
      case 1:
        return diceImgs.img1;
        break;
      case 2:
        return diceImgs.img2;
        break;
      case 3:
        return diceImgs.img3;
        break;
      case 4:
        return diceImgs.img4;
        break;
      case 5:
        return diceImgs.img5;
        break;
      default:
        console.log("Error: the number was not between 1 and 5.");
    }
  }
};

function play() {
  var cover = document.createElement('div');
  cover.innerHTML = "<h1>Welcome to<br>Yakuz-ee!</h1>";
  cover.className = 'final';
  //------------------ input form for names ----------
  var form = document.createElement('form');
  var formDiv = document.createElement('div');
  var row1 = document.createElement('div');
  row1.className = "row";
  var space1 = document.createElement('div');
  space1.className = "col-md-5";
  row1.appendChild(space1);
  formDiv.className = "form-group col-md-2";
  var nameOne = document.createElement('input');
  nameOne.id = "player1Name";
  nameOne.className = "form-control";
  nameOne.value = "";
  nameOne.placeholder = "Player One Name";
  row1.appendChild(formDiv);
  var row2 = document.createElement('div');
  row2.className = "row";
  var space2 = document.createElement('div');
  space2.className = "col-md-5";
  row2.appendChild(space2);
  var formDiv2 = document.createElement('div');
  formDiv2.className = "form-group col-md-2";
  var nameTwo = document.createElement('input');
  nameTwo.id = "player2Name";
  nameTwo.className = "form-control";
  nameTwo.placeholder = "Player Two Name";
  row2.appendChild(formDiv2);
  formDiv.appendChild(nameOne);
  formDiv2.appendChild(nameTwo);
  form.appendChild(row1);
  form.appendChild(row2);
  cover.appendChild(form);
  //--------------------------------------------------
  var btn = document.createElement('button');
  btn.className = "btn btn-default";
  btn.id = "play";
  btn.innerText = "PLAY!";
  cover.appendChild(btn);
  document.getElementsByTagName('body')[0].appendChild(cover);
  btn.addEventListener('click', function() {
    //------------------------------------------------------------
    playerOneName = player1Name.value;
    playerTwoName = player2Name.value;
    currentPlayer = playerOneName;
    document.getElementById('playerOne').innerHTML = "<h1>" + playerOneName + "</h1>";
    document.getElementById('playerTwo').innerHTML = "<h1>" + playerTwoName + "</h1>";
    //------------------------------------------------------------
    gameReady();
    cover.style.display = "none";
  });
};

function gameReady() {
  dice.rollBtn.addEventListener('click', function() {
    dice.diceRoll();
  });
  dice.endTurnBtn.addEventListener('click', function() {
    endTurn();
  });
  introMessage();
};

function takeTurn() {
  console.log("takeTurn ran and it is turn: " + turns + " for " + currentPlayer + ".");
  if (turns == 3 && currentPlayer == playerTwoName && round == 5) {
    console.log("Game Over");
  } else if (turns == 3 && currentPlayer == playerTwoName) {
    endOfTurnMessage();
    turns = 0;
  } else if (turns == 3) {
    endOfTurnMessage();
    turns = 0;
  } else { // Turns less than three
    rollMessage();
  }

};

function endTurn() {
  if (currentPlayer == playerOneName) {
    player1Score += calculateScore();
    document.getElementById('playerOneScore').innerHTML = "<h1>" + player1Score + "</h1>";
    setPlayer();
    resetBoard();
  } else {
    player2Score += calculateScore();
    document.getElementById('playerTwoScore').innerHTML = "<h1>" + player2Score + "</h1>";
    setPlayer();
    checkRound();
    resetBoard();
    round++;
  }
  console.log("Player has ended their turn and submitted their dice to be scored.");
};

function resetBoard() {
  var count = 1;
  for (var die in diceArray) {
    dice[diceArray[die]].classList.remove('selected');
    dice[diceArray[die]].style.backgroundImage = "url('" + diceImgs['img' + count] + "')";
    dice['num' + count].innerHTML = "<h1>" + count + "</h1>";
    count++
  }
  turns = 0;
  introMessage();
}

function calculateScore() {
  var count = 1;
  var scores = [];

  ['dice1Value', 'dice2Value', 'dice3Value', 'dice4Value', 'dice5Value'].forEach(function(prop) {
    scores.push(dice[prop]);
  });

  var tally = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0
  };

  scores.forEach(function(score) {
    tally[score.toString()] += 1;
  });

  var matches = tally['1'];

  while (count < 5) {
    if (tally[(count + 1).toString()] > matches) {
      matches = tally[(count + 1).toString()];
    }
    count++;
  }

  if (tally['1'] == 1 && tally['2'] == 1 && tally['3'] == 1 && tally['4'] == 1 && tally['5'] == 1) {
    return 40;
  } else if (matches == 5) {
    yakuzee();
    return 100;
  } else if (matches == 4) {
    return 30;
  } else if (matches == 3) {
    var inc   = 0,
        pair  = false;
    while (inc < 5) {
      if (tally[(inc + 1).toString()] == 2) {
        pair = true;
      }
      inc++;
    }
    if (pair) {
      return 50;
    } else {
      return 20;
    }
  } else if (matches == 2) {
    return 10;
  } else {
    return 0;
  }
}


// This function controls and checks the game state each turn
function checkRound() {
  if (round == 5) {
    resetBoard();
    // var body = document.getElementsByTagName('body')[0];
    // console.log(body);
    // var newBody = body.cloneNode(true);
    // console.log(newBody);
    // body.parentNode.replaceChild(newBody, body);

    var winner = playerOneName;
    var score = player1Score;
    if (player2Score > player1Score) {
      winner = playerTwoName;
      score = player2Score;
    } else if (player2Score == player1Score) {
      winner = playerOneName + " and " + playerTwoName + " tied!";
    }
    var final = document.createElement('div');
    final.innerHTML = "<h1>" + winner + " wins!<br>with " + score + " points!</h1>";
    final.className = 'final';
    document.getElementsByTagName('body')[0].appendChild(final);
    final.addEventListener('click', function() {
      // final.style.display = 'none';
      // round = 1;
      // turns = -1;
      // gameReady();
      player1Score = 0;
      player2Score = 0;
      document.getElementById('playerOneScore').innerHTML = "<h1>" + player1Score + "</h1>";
      document.getElementById('playerTwoScore').innerHTML = "<h1>" + player2Score + "</h1>";
    });
  }
};

function setPlayer() {
  if (currentPlayer == playerOneName) {
    currentPlayer = playerTwoName;
  } else {
    currentPlayer = playerOneName;
  }
}

function introMessage() {
  document.getElementById('messageBoard').innerHTML = "<h3>" + currentPlayer + ", please roll the dice</h3>";
}

function rollMessage() {
  document.getElementById('messageBoard').innerHTML = "<h2>Round: " + round + "<h3>" + currentPlayer + " - Roll: " + turns + "<br>Please select your dice and roll again.</h3>";
};

function endOfTurnMessage() {
  document.getElementById('messageBoard').innerHTML = "<h3>This was your final roll for this round. Click <em>End Turn</em> to calculate your score and pass the turn.</h3>";
};

function yakuzee() {
  console.log("YAKUZ-EE!!!");
}
