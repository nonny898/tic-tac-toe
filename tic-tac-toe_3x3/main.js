$(document).ready(function () {
    const boards = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    const winningBoards = [
        ['0','3','6'],
        ['1','4','7'],
        ['2','5','8'],
        ['0','1','2'],
        ['3','4','5'],
        ['6','7','8'],
        ['0','4','8'],
        ['2','4','6'],
    ];
    const computer = "O";
    const player = "X";
    let count = 0;
    let gameOver = false;
    reset();

    // noinspection JSJQueryEfficiency
    $(".tic").click(function () {
        let slot = $(this).attr('id');
        playerTurn(slot);
    });

    $("#reset").click(function () {
        reset();
    });

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const computersTurn = () => {
        let empty = false;
        let id;
        count++;
        console.log("Computer's turn: count: " + count);
        while (!empty) {
            id = getRandomInt(boards.length);
            empty = $("#" + id).text() === "";
        }
        $('#' + id).text(computer);
        boards[id] = computer;
        if (winCondition(boards,id.toString())) {
            gameOver = true;
            $("#message").html("Game Over! Computer Wins");
        }
    };

    function playerTurn(id) {
        let spotTaken = $("#" + id).text();
        if (spotTaken === "" && !gameOver) {
            count++;
            console.log("Player's turn: count: " + count);
            $('#' + id).text(player);
            boards[id] = player;
            if (winCondition(boards,id)) {
                gameOver = true;
                $("#message").html("Game Over! Player Wins");
            } else if (count >= 9) {
                gameOver = true;
                $("#message").html("Game Over! It's a draw");
            } else {
                computersTurn();
            }
        }
    }

    function winCondition(boards, index) {
        for (let i in winningBoards) {
            if (winningBoards[i].includes(index)) {
                let result = 0;
                for (let j in winningBoards[i]){
                    if (boards[winningBoards[i][j]] === boards[index]) {
                        result++;
                    }
                }
                if (result === 3) {
                    return true
                }
            }
        }
    }

    function reset() {
        boards.fill('');
        count = 0;
        $(".tic").text('');
        $("#message").html("Player " + player + " gets to start!");
        gameOver = false;
    }

});

