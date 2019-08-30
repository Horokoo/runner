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
direction = ['stop', 'stop'];
document.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowUp'){
        direction[1] = 'Up'
    }else if (event.code == 'ArrowLeft'){
        direction[0] = 'Left'
    }else if (event.code == 'ArrowRight'){
        direction[0] = 'Right'
    }
});
//проверка: отпущена ли клавиша
document.addEventListener('keyup', (event) => {
    if (event.code == 'Arrow' + direction[0] ){
        direction[0] = 'stop'
    }
    if (event.code == 'Arrow' + direction[1] ){
        direction[1] = 'stop'
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
princessImage = [new Image(), new Image(), new Image()];
princessImage[0].src = "./images/bodymodHunt.png";
princessImage[1].src = "./images/bodymodHunt05.png";
princessImage[2].src = "./images/bodymodHunt1.png";
step = 0;
princessMotion = (changesIndex, speed, polus, jump) =>{
        if(jump){
            if(direction[1] == 'Up'){
                pseudoUp = true;
            }
            if (fly){
                fly = false;
                jumpStart = princessPosition[1]
                princessPosition[1]-=4;
            }else{
                if(jumpUp && (jumpStart - princessPosition[1]) < 64){
                    princessPosition[1]-= 4;
                }else{
                    jumpUp = false;
                    if(jumpStart != princessPosition[1]){
                        princessPosition[1]+=4;
                    }else{
                        jumpUp = true;
                        fly = true;
                        jumpStart = princessPosition[1];
                        pseudoUp = false;
                    }
                }
            }
            ctx.drawImage(princessImage[step], princessPosition[0], princessPosition[1], 35/1.5, 90/1.5); 
        }else{
            step = (speed == 0) ? 0 : step;
            princessPosition[changesIndex]+= polus * speed;
            ctx.drawImage(princessImage[step], princessPosition[0], princessPosition[1], 35/1.5, 90/1.5); 
        }
}
curentImage = () => {
    step = (step == 0) ? 1 : (step == 1) ? 2 : 0;
}
characterDraw = (ignor) =>{
    if (direction[0] == 'stop' && direction[1] == 'stop') {
        princessMotion(0, 0, 1, false)
    }else if(direction[0] == 'Right') {
        princessMotion(0, 4, 1, false)
    }else if(direction[0] == 'Left') {
        princessMotion(0, 4, -1, false)
    }
    if(direction[1] == 'Up' || pseudoUp) {
        princessMotion(1, 4, -1, true);   
    }
}
// рисование элементов на холсте
draw = () =>{
    clearCanvas();
    characterDraw(true);
    requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
timer = setInterval(curentImage, 50)
