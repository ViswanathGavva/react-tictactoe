import { useState } from 'react';

function Square({value,onSquareClick}) {
  // const [value,setValue] = useState("0");
  // function handleClick(){
  //   setValue('X');
  //   console.log(value);
  // }
  
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}
function Board({activeUser,squares,onPlay}) {
  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = 'The Winner is :'+winner;
  } else{
    status = "Next player: " + activeUser;
  }

  function handleSquareClick(i){
    //If the square has value. i.e it has been clicked once already. Do not change it.
    // return from here so the square is unclickable.
    if(squares[i]){
      return;
    }

    //Calculate winner if any. If there is a winner, do not let a user click on any squares.
    if(calculateWinner(squares)){
      return ;
    }

    //make a copy of original state
    const nextSquares = squares.slice();
    if(activeUser === 'userX'){
      nextSquares[i] = "X";    
    }      
    else {
      nextSquares[i] = "O";        
    }
    onPlay(nextSquares);

  }

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
    </div>

    </>
  )
}

function GameInfo({history,onTimeTravel}){
  const moves = history.map((stepMoves,moveId)=>{
    return ( 
      <li key={moveId} >
        <button onClick={()=>onTimeTravel(moveId)}> Go to Step {moveId}</button>    
      </li>             
    )
  });

  return (<>
    <p>time Travel:</p>
    <ol>
      {moves}
    </ol>
  </>)
  
}


export default function Game(){

//Initiate the history with 9X9 squares filled with null
const [history,setHistory] = useState([Array(9).fill(null)]);

//store the current Move number in state.
const [currentMove, setCurrentMove] = useState(0);

//Make userX as the default active User
const activeUser = (currentMove%2===0) ? 'userX':'userO';

//set the latest(last) row from history as the initial state
const currentSquares = history[currentMove];

function handlePlay(nextSquares){
  console.log(nextSquares);  
  const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);  
}

function gotoMove(moveId){
  setCurrentMove(moveId);  
}

return (
  <>
    <div className="game">
      <div className="game-board" >
        <Board activeUser={activeUser} squares={currentSquares} onPlay={handlePlay}/> 
      </div>
      <div className="game-info"> 
      Game Information
      <GameInfo history={history} onTimeTravel={gotoMove}/>
      </div>  
    </div>
    
  </>
)
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
