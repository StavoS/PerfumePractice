const createBoard = board_size =>{
    let board = [];
    for(let i = 0; i < board_size; i++){
        board[i] = [];
        for(let j = 0; j < board_size; j++){
            board[i][j] = "?";
        }
    }
    return board;
}

const viewBoard = board =>{
    for(let element of board){
        console.log(element.join('    '));
    }
    console.log('\n');
}

const updateBoardFirstPlayer = (board, row, column) =>{
    board[row - 1][column - 1] = "X";
    return board;
}

const updateBoardSecPlayer = (board, row, column) => {
    board[row - 1][column - 1] = "O";
    return board;
}

let first_player_row;
let first_player_col;
let sec_player_row;
let sec_player_col;

let choose_size = prompt("Choose board size");
let board = createBoard(choose_size);
viewBoard(board);
while(true){
    first_player_row = prompt("Player 1: choose row");
    first_player_col = prompt("Player 1: choose column");

    board = updateBoardFirstPlayer(board, first_player_row, first_player_col);
    viewBoard(board);
    //checkWin(board);

    sec_player_row = prompt("Player 2: choose row");
    sec_player_col = prompt("Player 2: choose column");

    board = updateBoardSecPlayer(board, sec_player_row, sec_player_col);
    viewBoard(board);
}