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

const checkInputValid = (boardLength, rowInput, colInput) =>{
    if(!Number(rowInput) || !Number(colInput))
        return false;
    
    if(rowInput <= 0 || rowInput > boardLength || colInput <= 0 || colInput > boardLength)
        return false;
    
    return true;
}

const checkValidPlacement = (board, row, col) => board[row - 1][col - 1] === "?";

const updateBoardPlayer = (board, row, column, playerShape) =>{
    board[row - 1][column - 1] = playerShape;
    return board;
}

const checkGameOver = (board, playerShape) =>{
    let col_counter = 0;
    let slant_counter = 0;
    let opp_slant_counter = 0;

    for(let i = 0; i < board.length; i++){
        if(board[i].every(element => element === board[i][0] && element === playerShape))
            return true;
        
        for(let j = 0; j < board.length; j++){
            if(board[j][i] === playerShape){
                col_counter++;
            }
        }
        if(board[i][i] === playerShape)
            slant_counter++;

        if(board[i][board.length - i - 1] === playerShape)
            opp_slant_counter++;

        if(slant_counter === board.length || opp_slant_counter === board.length || col_counter === board.length)
            return true;
        
        col_counter = 0;
    }

    return false;
}

let first_player = {}
let sec_player = {}
let choose_size;
let board;

first_player.name = prompt("Enter Player 1 name").toString();
sec_player.name = prompt("Enter Player 2 name").toString();
first_player.shape = "X";
sec_player.shape = "O";

while(true){
    choose_size = prompt("Choose board size");
    if(choose_size < 3){
        console.log("Error! Size needs to be 3 or above!");
    }
    else if(!Number(choose_size)){
        console.log("ERROR INCORRECT INPUT TRY AGAIN")
    }
    else{
        break;
    }
}

board = createBoard(choose_size);
viewBoard(board);
while(true){
    while(true){
        first_player.row = prompt(`${first_player.name}: choose row`);
        first_player.col = prompt(`${first_player.name}: choose column`);

        if(!checkInputValid(board.length, first_player.row, first_player.col)){
            console.log("INVALID INPUT TRY AGAIN");
        }
        else if(!checkValidPlacement(board, Number(first_player.row), Number(first_player.col))){
            console.log("INVALID PLACEMENT TRY AGAIN")
        }
        else{
            break;
        }
    }
    board = updateBoardPlayer(board, Number(first_player.row), Number(first_player.col), first_player.shape);
    viewBoard(board);
    if(checkGameOver(board, first_player.shape)){
        console.log(`${first_player.name} HAS WON!!`);
        break;
    }
    while(true){
        sec_player.row = prompt(`${sec_player.name}: choose row`);
        sec_player.col = prompt(`${sec_player.name}: choose column`);
        if(!checkInputValid(board.length, sec_player.row, sec_player.col)){
            console.log("INVALID INPUT TRY AGAIN");
        }
        else if(!checkValidPlacement(board, Number(sec_player.row), Number(sec_player.col))){
            console.log("INVALID PLACEMENT TRY AGAIN")
        }
        else{
            break;
        }
    }
    board = updateBoardPlayer(board, Number(sec_player.row), Number(sec_player.col), sec_player.shape);
    viewBoard(board);
    if(checkGameOver(board, sec_player.shape)){
        console.log(`${sec_player.name} HAS WON!!`);
        break;
    }
}