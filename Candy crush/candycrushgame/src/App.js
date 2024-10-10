/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import './index.css'
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'
import ScoreBoard from "./components/ScoreBoard"


const width = 8
const candyColors=[
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy
]

const App = ()=> {

  const [colorArrangment , setColorArrangment] = useState([]) ;
  const [squareBeingDragged , setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced , setSquareBeingReplaced]= useState(null);
  const [scoreDisplay , setScoreDisplay] = useState(0);



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfFour = () => {
    for(let i=0 ; i<=39 ; i++){
         const columnOfFour=[i , i+width , i + width*2 , i + width*3 ]
         const decidedColor=colorArrangment[i];

         const isBlank = colorArrangment[i]===blank

         if(columnOfFour.every(square => colorArrangment[square]===decidedColor) && !isBlank){
               setScoreDisplay((score) => score + 4)
               columnOfFour.forEach(square => colorArrangment[square]=blank) 
               return true  
         }
         
    }
  }


  const checkForRowOfFour = ()=> {
    for(let i=0 ; i<64 ; i++){
         const RowOfFour=[i , i+1 , i +2 , i+3]
         const decidedColor=colorArrangment[i]; 
         const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
         const isBlank = colorArrangment[i]===blank
         if(notValid.includes(i)) continue;

         if(RowOfFour.every(square => colorArrangment[square]===decidedColor && !isBlank)){
               setScoreDisplay((score) => score + 4)
               RowOfFour.forEach(square => colorArrangment[square]=blank) 
               return true  
         }
         
    }
  }



  const checkForColumnOfThree = ()=> {
    for(let i=0 ; i<=47 ; i++){
         const columnOfThree=[i , i+width , i + width*2 ]
         const decidedColor=colorArrangment[i]; 
         const isBlank = colorArrangment[i]===blank
         if(columnOfThree.every(square => colorArrangment[square]===decidedColor && !isBlank)){
          setScoreDisplay((score) => score + 3)
               columnOfThree.forEach(square => colorArrangment[square]=blank)   
               return true
         }
         
    }
  }


  const checkForRowOfThree = ()=> {
    for(let i=0 ; i<64 ; i++){
         const RowOfThree=[i , i+1 , i +2 ]
         const decidedColor=colorArrangment[i]; 
         const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
         const isBlank = colorArrangment[i]===blank
         if(notValid.includes(i)) continue;

         if(RowOfThree.every(square => colorArrangment[square]===decidedColor && !isBlank)){
          setScoreDisplay((score) => score + 3)
               RowOfThree.forEach(square => colorArrangment[square]=blank)   
               return true
         }
         
    }
  }



  const moveIntoSquareBelow = ()=> {
    
    for(let i = 0 ; i <=55 ; i++){
      const firstRow = [0,1,2,3,4,5,6,7]
      const  isFirstRow = firstRow.includes(i);

      if(isFirstRow && colorArrangment[i]===blank){
        let randomNumber = Math.floor(Math.random()*candyColors.length)
         colorArrangment[i] = candyColors[randomNumber]
      }
         if(colorArrangment[i + width]===blank){
            colorArrangment[i+width] = colorArrangment[i]
            colorArrangment[i] = blank;
         }
    }

    
  }


  const dragStart= (e)=> {
    // console.log("drag starts");
    // console.log(e.target);
    setSquareBeingDragged(e.target)
  }

  const dragDrop =(e)=> {
    // console.log("drag drop");
    // console.log(e.target);

   setSquareBeingReplaced(e.target)
  }

  const dragEnd =()=> {


    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    colorArrangment[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    colorArrangment[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')


    const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDragged + width 
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()


    if (squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
  } else {
    colorArrangment[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
    colorArrangment[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
setColorArrangment([...colorArrangment])
  }





  }


 





  const createBoard = ()=>{
    const randomColorArrangment=[];
    for(let i=0 ; i < width*width ; i++){
      const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)];
      randomColorArrangment.push(randomColor)
    }

    setColorArrangment(randomColorArrangment)
    console.log(randomColorArrangment);
  } 

  useEffect(()=>{
 createBoard()
  },[])

  useEffect(()=>{
   const timer = setInterval(()=>{
    checkForColumnOfFour();
    checkForColumnOfThree();
    checkForRowOfThree();
    checkForRowOfFour();
    moveIntoSquareBelow()    
    setColorArrangment([...colorArrangment])
    } , 100)

    return ()=> clearInterval(timer)
      
  },[checkForColumnOfFour,checkForRowOfFour,checkForColumnOfThree,checkForRowOfThree, moveIntoSquareBelow , colorArrangment ])

  return (
    <div className="app">

      <div className="game">


        {colorArrangment.map((colors,index)=>(
             
             <img
               
               key={index}
              
               src={colors}
               alt={colors}
               data-id={index}
               onDragStart={dragStart}
               draggable={true}
               onDragOver={(e)=> e.preventDefault()}
               onDragEnter={(e)=> e.preventDefault()}
               onDragLeave={(e)=>e.preventDefault()}
               onDrop={dragDrop}
               onDragEnd={dragEnd}
             />
        ))}
             


      </div>

      <ScoreBoard score={scoreDisplay}/>

    </div>
  );
}

export default App;
