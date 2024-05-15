let dir={x: 0,y: 0};
let speed=10;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x: 5, y: 5}
];
food={x: 15, y: 15};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
        
    }

    if(snake[0].x > 20 || snake[0].x <= 0 || snake[0].y > 20 || snake[0].y <= 0){
        return true;
    }

    return false;
}

function gameEngine() {
    if(isCollide(snakeArr)){
        dir = {x: 0, y: 0};
        alert("Game Over");
        snakeArr=[
            {x: 5, y: 5}
        ];
        food={x: 15, y: 15};
        score = 0;
        scorebox.innerHTML="Score : "+score;
    }
    
    //Part 1: Display snake & food
    box.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('tail');
        }
        box.appendChild(snakeElement);
    });

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);

    //Part 2: Update snake & food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if(score > hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML="High Score : "+hiscoreval;
        }
        scorebox.innerHTML="Score : "+score;
        snakeArr.unshift({x: snakeArr[0].x + dir.x, y: snakeArr[0].y + dir.y});
        let a=1;
        let b=18;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += dir.x;
    snakeArr[0].y += dir.y;
}

let hiscore=localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="High Score : "+hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    dir={x: 0, y: 1}

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            dir.x=0;
            dir.y=-1;
            break;
    
        case "ArrowDown":
            console.log("ArrowDown");
            dir.x=0;
            dir.y=1;
            break;
    
        case "ArrowLeft":
            console.log("ArrowLeft");
            dir.x=-1;
            dir.y=0;
            break;
    
        case "ArrowRight":
            console.log("ArrowRight");
            dir.x=1;
            dir.y=0;
            break;
    
        default:
            break;
    }
})