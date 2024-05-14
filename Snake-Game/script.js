let dir={x: 0,y: 0};
let speed=5;
let lastPaintTime=0;
let snakeArr=[
    {x: 5, y: 5}
];
food={x: 10, y: 10};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function gameEngine() {
    //Part 1: Display snake & food
    box.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add('head');
        box.appendChild(snakeElement);
    });

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);
    //Part 2: Update snake & food
    
}

window.requestAnimationFrame(main);