var ji = {
  name: "Ji Firepaw",
  healthPoints: 180,
  attackPower: 10,
  counterAttackPower: 18
};

var aysa = {
  name: "Aysa Cloudsinger",
  healthPoints: 160,
  attackPower: 25,
  counterAttackPower: 12
};

var chen = {
  name: "Chen Stormstout",
  healthPoints: 200,
  attackPower: 18,
  counterAttackPower: 10
};

var taoshi = {
  name: "Taoshi",
  healthPoints: 140,
  attackPower: 30,
  counterAttackPower: 15
};

var charHP;
var charAP;
var charCAP;
var opponentHP;
var opponentAP;
var opponentCAP;
var yourChar = null;
var yourOpponent = null;

$(document).ready(function() {
  $("#attack").on("click", function() {
    //debugger;
    charHP = yourChar.healthPoints;
    charAP = yourChar.attackPower;
    charCAP = yourChar.counterAttackPower;
    opponentHP = yourOpponent.healthPoints;
    opponentAP = yourOpponent.attackPower;
    opponentCAP = yourOpponent.counterAttackPower;

    if (charHP > 0 && opponentHP > 0) {
      $(".attack").css("display", "block");
      $(".counterattack").css("display", "block");
      $(".attack").text(
        "You attacked " + yourOpponent.name + " for " + charAP + " damage."
      );

      $(".counterattack").text(
        yourOpponent.name + " attacked you back for " + opponentCAP + " damage."
      );

      yourChar.healthPoints = yourChar.healthPoints - opponentCAP;
      yourChar.attackPower = yourChar.attackPower + 6;
      yourOpponent.healthPoints = yourOpponent.healthPoints - charAP;
      $(".curentChar .health").text(yourChar.healthPoints);
      $(".curentOp .health").text(yourOpponent.healthPoints);
    }

    if (yourChar.healthPoints <= 0) {
      alert("GAME OVER! YOU LOST");
      location.reload();
    } else if (
      yourOpponent.healthPoints <= 0 &&
      $("#allCharacters")
        .html()
        .trim().length !== 0
    ) {
      alert(yourOpponent.name + " defeated! Choose the next opponent!");
      $("#yourOpponent").empty();
      $(".attack").text("Choose the next opponent!");
      $(".counterattack").css("display", "none");

      $("#choseChar").css("display", "block");
      chooseYourOpponent();
    } else if (
      yourOpponent.healthPoints <= 0 &&
      $("#allCharacters")
        .html()
        .trim().length == 0
    ) {
      $("#choseChar").css("display", "none");
      alert("YOU WIN");
      location.reload();
    }
  });

  $(".character").on("click", function() {
    if (yourChar == null) {
      $("#yourChar").css("display", "block");

      $("#allCharacters .character img").css("height", "200px");
      $("#allCharacters .character").css("font-size", "16pt");
      $(".wrapper").css("margin", "20px");
      $(this).addClass("curentChar");
      $(".curentChar img").css("height", "350px");
      $(".curentChar").css("font-size", "18pt");
      yourChar = window[$(this).attr("id")];
      //debugger;
      $("#yourChar").append($(this));

      $("#choseChar").html("<h2>Choose your opponent</h2>");
    }
    chooseYourOpponent();
  });

  function chooseYourOpponent() {
    $(".character")
      .not(".curentChar")
      .on("click", function() {
        $("#yourOpponent").css("display", "block");
        $("#yourOpponent").html("<h2>Your opponent</h2>");
        $("#yourOpponent").append($(this));

        $(this).addClass("curentOp");
        $(".curentOp img").css("height", "350px");
        $(".curentOp").css("font-size", "18pt");
        yourOpponent = window[$(this).attr("id")];

        $("#choseChar").css("display", "none");
        $("#attack").css("display", "block");
        $(".attack").css("display", "block");
        $(".attack").text("Attack your enemy!");
      });
  }
});
