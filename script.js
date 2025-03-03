document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status");
    const resetButton = document.querySelector(".reset");
    const newGameButtons = document.querySelectorAll(".new-game"); // Select all "New Game" buttons
    const overlay = document.querySelector(".overlay");
    const overlayText = document.querySelector(".overlay-text");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "🤍"; // White heart starts
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = Array.from(cells).indexOf(cell);

        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (currentPlayer === "🤍") {
            cell.classList.add("white-heart");
        } else {
            cell.classList.add("love"); // Red heart for player 2
        }

        checkWinner();
        currentPlayer = currentPlayer === "🤍" ? "❤️" : "🤍"; // Switch players
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                let winnerHeart = board[a]; // Get the winning heart (🤍 or ❤️)
                
                // ✅ Display the Winner with Game Over message
                overlayText.innerHTML = `Game Over! 🎉 <br> You won the heart ${winnerHeart} 💖`;
                overlay.style.display = "flex";
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            // ✅ Display Draw Message
            overlayText.innerHTML = "Game Over! It's a Draw! 🤝";
            overlay.style.display = "flex";
            return;
        }
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "🤍"; // Reset to white heart
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("white-heart", "love");
        });
        overlay.style.display = "none";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    
    // ✅ Fix: Ensure "Play Again" button also resets the game
    newGameButtons.forEach(button => button.addEventListener("click", resetGame));
});
