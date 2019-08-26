var canvas = document.createElement('canvas'); // создаю холст
canvas.id = 'canvas';// присваиваю id
xPoint =  (Math.floor(document.documentElement.clientWidth / 10)) * 10;// получаю ширину экрана и округляю до делимости на 10
yPoint = (Math.floor(document.documentElement.clientHeight / 10)) * 10;// получаю высоту экрана и округляю до делимости на 10
canvas.width =  xPoint;// присваиваю округленные широту и высоту экрана холсту
canvas.height = yPoint;// присваиваю округленные широту и высоту экрана холсту
document.getElementById('mainBox').appendChild(canvas); //добавляю холст в dom
//стандартная настройка холста
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//создание поля с 10 пикс клеткой
drawArea = []
for (let i = 0; i < yPoint/10; i++) {
    drawArea[i] = []
    for (let o = 0; o < xPoint /10; o++) {
        drawArea[i][o] = '*'     
    } 
}

//отслеживание нажатий стрелок с сохранением направления в переменную direction
direction = 'stop';
document.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowDown' && direction != 'up'){
        direction = 'stop'
    }else if (event.code == 'ArrowUp' && direction != 'down'){
        direction = 'Up'
    }else if (event.code == 'ArrowLeft' && direction != 'right'){
        direction = 'Left'
    }else if (event.code == 'ArrowRight' && direction != 'left'){
        direction = 'Right'
    }
});
//проверка: отпущена ли клавиша
document.addEventListener('keyup', (event) => {
    if (event.code == 'Arrow' + direction ){
        direction = 'stop'
    }
});
//очистка холста
clearCanvas  = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//начальная позиция персонажей
princessPosition = [10, 500]
//рисование персонажей
fly = true;
jumpStart = princessPosition[1];
jumpUp = true;
pseudoUp = false;
characterDraw = (ignor) =>{
    if (direction == 'stop') {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(princessPosition[0], princessPosition[1], 30, 60);
    }else if(direction == 'Right') {
        princessPosition[0]+= 4;
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(princessPosition[0], princessPosition[1], 30, 60);
    }else if(direction == 'Left') {
        princessPosition[0]-=4;
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(princessPosition[0], princessPosition[1], 30, 60);
    }
    if(direction == 'Up' || pseudoUp) {
        if(direction == 'Up'){
            pseudoUp = true;
        }
        if (fly){
            fly = false;
            jumpStart = princessPosition[1]
            princessPosition[1]-=4;
        }else{
            if(jumpUp && (jumpStart - princessPosition[1]) < 80){
                console.log(jumpStart - princessPosition[1])
                princessPosition[1]-=4;
            }else{
                jumpUp = false;
                if(jumpStart != princessPosition[1]){
                    princessPosition[1]+=4;
                }else{
                    console.log('down');
                    jumpUp = true;
                    fly = true;
                    jumpStart = princessPosition[1];
                    pseudoUp = false;
                }
            }
        }
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(princessPosition[0], princessPosition[1], 30, 60);
    }
}
// рисование элементов на холсте
draw = () =>{
    clearCanvas();
    characterDraw(true);
    requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

