// Global game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// 1. startGame()
function startGame() {
    let nameInput = document.getElementById("playerName").value.trim();

    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// 2. getComputerChoice()
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// 3. playRound(playerChoice)
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let roundOutcome = "";
    let resultEl = document.getElementById("result");

    // Update player and computer images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    // Decide winner using if...else
    if (playerChoice === computerChoice) {
        roundOutcome = "Draw";
        draws++;
        resultEl.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundOutcome = "Win";
        wins++;
        resultEl.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultEl.style.color = "green";
    } else {
        roundOutcome = "Lose";
        losses++;
        resultEl.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultEl.style.color = "red";
    }

    // Update scoreboard numbers
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in array and append row to history table
    roundCount++;
    results.push(roundOutcome);

    let historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + roundOutcome + "</td>" +
        "</tr>";
}

// 4. showSummary()
function showSummary() {
    if (results.length === 0) {
        alert("Play at least one round first!");
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let percentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + results.length + " rounds and won " + percentage + "%";
}

// 5. resetGame()
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}