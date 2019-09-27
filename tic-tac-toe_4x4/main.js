$(document).ready(function () {
    const boards = [
        "", "", "", "",
        "", "", "", "",
        "", "", "", "",
        "", "", "", ""
    ];
    const winningBoards = [
        ['0','1','2','3'],
        ['4','5','6','7'],
        ['8','9','10','11'],
        ['12','13','14','15'],
        ['0','4','8','12'],
        ['1','5','9','13'],
        ['2','6','10','14'],
        ['3','7','11','15'],
        ['0','5','10','15'],
        ['3','6','9','12']
    ];
    const computer = "O";
    const player = "X";
    let count = 0;
    let gameOver = false;
    reset();

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
        if (winCondition(boards, id.toString())) {
            gameOver = true;
            $("#message").html("Game Over! Computer Wins");
        } else if (count >= 16) {
            gameOver = true;
            $("#message").html("Game Over! It's a draw");
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
            } else {
                computersTurn();
            }
        }
    }

    function winCondition(boards, index) {
        for (let i in winningBoards) {
            if (winningBoards[i].includes(index)) {
                let count = 0;
                for (let j in winningBoards[i]){
                    if (boards[winningBoards[i][j]] === boards[index]) {
                        count++;
                    }
                }
                if (count === 4) {
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

