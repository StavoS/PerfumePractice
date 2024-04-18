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

const checkInputValid = (boardLength, rowInput, colInput) =>{
    if(!Number(rowInput) && !Number(colInput)){
        return false;
    }
    if(rowInput < 0 || rowInput > boardLength || colInput < 0 || colInput > boardLength){
        return 0;
    }

    return true;
}

const checkGameOver = (board, playerShape) =>{
    let col_counter = 0;
    let slant_counter = 0;
    let opp_slant_counter = 0;

    for(let i = 0; i < board.length; i++){
        if(board[i].every(element => element === board[i][0] && element === 'X')){
            console.log("1");
            return true;
        }
        for(let j = 0; j < board.length; j++){
            if(board[j][i] === "X"){
                col_counter++;
            }
        }
        if(board[i][i] === "X")
            slant_counter++;

        if(board[i][board.length - i - 1] === 'X')
            opp_slant_counter++;

        if(slant_counter === board.length || opp_slant_counter === board.length || col_counter === board.length)
            return true;
        
        col_counter = 0;
    }

    return false;
}

let first_player_row;
let first_player_col;
let sec_player_row;
let sec_player_col;
let choose_size;
let board;

do{
    choose_size = prompt("Choose board size");
    if(choose_size < 3){
        console.log("Error! Size needs to be 3 or above!");
    }
}while(choose_size < 3);

board = createBoard(choose_size);
viewBoard(board);
while(true){
    do{
    first_player_row = prompt("Player 1: choose row");
    first_player_col = prompt("Player 1: choose column");
        
    }while(!checkInputValid(board.length, first_player_row, first_player_col));

    board = updateBoardFirstPlayer(board, first_player_row, first_player_col);
    viewBoard(board);
    if(checkGameOver(board)){
        console.log("Player 1 WON");
        break;
    }
    do{
        sec_player_row = prompt("Player 2: choose row");
        sec_player_col = prompt("Player 2: choose column");
    }while(!checkInputValid(board.length, sec_player_row, sec_player_col))

    board = updateBoardSecPlayer(board, sec_player_row, sec_player_col);
    viewBoard(board);
    if(checkGameOver(board)){
        console.log("Player 2 WON");
        break;
    }
}