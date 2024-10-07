var board;
var player0="0";
var playerX='X';
var currPlayer=player0;
var gameOver=false;

window.onload = function(){
   
    setGame();
}


function setGame() {
    board = [

        [' ' , ' ' , ' '],
        [' ' , ' ' , ' '],
        [' ' , ' ' , ' ']
    ]


    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            tile.classList.add("tile");
            // console.log("comming to one ");
            
            if(r==0 || r==1){
                tile.classList.add("horizontal-line")
                // console.log("comming to 2 ");

            }
            if(c==0 || c==1){
                tile.classList.add("vertical-line");
                // console.log("comming to 3 ");
            }
            // console.log("comming to 4 ");
            tile.innerText="";
            tile.addEventListener("click" , setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}


function setTile() {
    if(gameOver){
        return ;
    }

    let coords=this.id.split("-") //ex "1-2" -> ["1" , "2"];
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if(board[r][c]!=' '){
        return;
    }

    board[r][c]=currPlayer;
    this.innerText=currPlayer

    if(currPlayer==player0){
         currPlayer=playerX;
    }
    else{
        currPlayer=player0;
    }

    checkWinner();
}

function checkWinner() {

    // horizontally check 3 rows;
    for(let r=0 ; r<3; r++){
     
        if(board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' '){

            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }

            gameOver= true;
            return;

        }


    }


    // vertically check 3 columns 
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }


    // check diagonally 

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }





    // check anti ;

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }


}