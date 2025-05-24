document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const resetButton = document.getElementById('resetButton');
    const nextButton = document.getElementById('nextButton');
    const generationCounter = document.getElementById('generationCounter');

    // Configuration
    const numRows = 50; // Number of rows in the grid
    const numCols = 50; // Number of columns in the grid
    const cellSize = 10; // Size of each cell in pixels
    canvas.width = numCols * cellSize;
    canvas.height = numRows * cellSize;

    let grid = createGrid();
    let animationId = null;
    let generation = 0;
    let isRunning = false;

    // --- Grid Functions ---
    function createGrid() {
        // Initialize a 2D array for the grid
        // For now, returns an empty grid (all dead)
        return new Array(numRows).fill(null)
            .map(() => new Array(numCols).fill(0));
    }

    function initializeGrid() {
        // Populate the grid with a random pattern or a predefined one
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                grid[row][col] = Math.random() > 0.7 ? 1 : 0; // Approx 30% live cells
            }
        }
        generation = 0;
        updateGenerationCounter();
    }

    // --- Drawing Functions ---
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ddd'; // Color for grid lines

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                ctx.beginPath();
                ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
                ctx.fillStyle = grid[row][col] ? 'black' : 'white';
                ctx.fill();
                ctx.stroke(); // Draw grid lines
            }
        }
    }

    // --- Game Logic Functions ---
    function countLiveNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const r = row + i;
                const c = col + j;
                if (r >= 0 && r < numRows && c >= 0 && c < numCols && grid[r][c]) {
                    count++;
                }
            }
        }
        return count;
    }

    function computeNextGeneration() {
        const nextGrid = createGrid(); // Create a new grid for the next state
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const liveNeighbors = countLiveNeighbors(row, col);
                const cellState = grid[row][col];

                if (cellState === 1) { // Live cell
                    if (liveNeighbors < 2 || liveNeighbors > 3) {
                        nextGrid[row][col] = 0; // Dies
                    } else {
                        nextGrid[row][col] = 1; // Lives
                    }
                } else { // Dead cell
                    if (liveNeighbors === 3) {
                        nextGrid[row][col] = 1; // Becomes alive
                    } else {
                        nextGrid[row][col] = 0; // Stays dead
                    }
                }
            }
        }
        grid = nextGrid;
        generation++;
        updateGenerationCounter();
    }

    // --- Control Functions ---
    function startGame() {
        if (isRunning) return;
        isRunning = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        nextButton.disabled = true; // Disable stepping when running

        function gameLoop() {
            computeNextGeneration();
            drawGrid();
            animationId = requestAnimationFrame(gameLoop);
        }
        animationId = requestAnimationFrame(gameLoop);
    }

    function stopGame() {
        if (!isRunning) return;
        isRunning = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        startButton.disabled = false;
        stopButton.disabled = true;
        nextButton.disabled = false;
    }

    function resetGame() {
        stopGame(); // Stop if running
        initializeGrid();
        drawGrid();
        startButton.disabled = false;
        stopButton.disabled = true;
        nextButton.disabled = false;
    }
    
    function stepGeneration() {
        if (isRunning) return; // Don't step if game is running
        computeNextGeneration();
        drawGrid();
    }

    function updateGenerationCounter() {
        generationCounter.textContent = generation;
    }
    
    // --- User Interaction ---
    canvas.addEventListener('click', (event) => {
        if (isRunning) return; // Don't allow changes while running

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
            grid[row][col] = grid[row][col] ? 0 : 1; // Toggle cell state
            drawGrid(); // Redraw the grid to show the change
        }
    });

    // --- Event Listeners for Controls ---
    startButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);
    resetButton.addEventListener('click', resetGame);
    nextButton.addEventListener('click', stepGeneration);

    // --- Initial Setup ---
    initializeGrid();
    drawGrid();
    stopButton.disabled = true; // Initially stopped
});
