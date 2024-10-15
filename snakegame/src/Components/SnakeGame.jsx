/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "../index.css"
const GRID_SIZE = 15;
const GAMEGRID = [];
for (let i = 0; i < GRID_SIZE; i++) {
    const row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
        row.push("");
    }
    GAMEGRID.push(row);
}

const INITIAL_SNAKE = [[5, 5]];



export default function SnakeGame() {

  const[snakeBody , setSnakeBody] = useState([[3,5],[2,5] ,[1,5]]);
  const directionRef= useRef([1,0]);


    // console.log(GAMEGRID)

    const isSnakeBody = (xy , yc)=>{
         // Check if the given coordinates (xy, yc) are part of the snake's body
         for (let i = 0; i < snakeBody.length; i++) {
             let x = snakeBody[i][0];
             let y = snakeBody[i][1];
             if (x === xy && y === yc) {
                 return true;
             }
         }
         return false;
         }


         useEffect(()=>{
           
          const intervalId = setInterval(()=>{
             
            setSnakeBody((prevSnakeBody)=>{
              const newHead = [prevSnakeBody[0][0] + directionRef.current[0] , prevSnakeBody[0][1] + directionRef.current[1]]
              if(newHead[0] < 0 || newHead[0]>=GRID_SIZE || newHead[1] < 0 || newHead[1]>=GRID_SIZE){
                directionRef.current=[1,0]
                return [[3,5],[2,5],[1,5]] 
              }
              const copySnakeBody= prevSnakeBody.map((arr)=>[...arr]);
              copySnakeBody.pop();
              copySnakeBody.unshift(newHead);
              return copySnakeBody;

            })

          },1000)

          const handleDirection = (e)=>{
              const key = e.key

              if(key==='ArrowUp' && directionRef.current[1] !== 1){
                 directionRef.current=[0,-1];
              }else if(key==='ArrowLeft' && directionRef.current[0] !== 1){
                directionRef.current=[-1,0];
              }else if(key==='ArrowRight' && directionRef.current[0] !== -1){
                directionRef.current=[1,0];
              }else if(key==='ArrowDown' && directionRef.current[1] !== -1){
                directionRef.current=[0,1];
              }
          }

          window.addEventListener('keydown' ,handleDirection)
          
          return () => {
            clearInterval(intervalId);
            window.removeEventListener("keydown" , handleDirection)
          }

          },[])

    

    return(
        <div className="container">   

          {GAMEGRID.map((row , yc)=>{
            return row.map((cell , xc)=>{
                 return <div className={`cell ${isSnakeBody(xc,yc) ? "snake" : ""}`}>
                       
                 </div>
            })
          })}
        </div>
    )
}