
const blockSize = 70; 
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var rows =      [0,1,2,1];
var columns =   [1,0,1,2];
canvas.height = rows.length*blockSize;
canvas.width = columns.length*blockSize;

var personaje = {
    posX : 0,
    posY : 0
};

var obstaculos=[];
var luces=[];

var comandos = Object.freeze({"Avanzar":1,"GirarDer":2,"GirarIzq":3,"Encender":4});

listComandos = [comandos.Avanzar,comandos.GirarDer];
function drawCharacter(posX,posY){
    context.fillStyle="white";
    context.fillRect(posX,posY,blockSize/3,blockSize/3);
}
function init(rows,columns){;  
    let list = Array.from(Array(columns.length).keys())
    for (let index = 0; index < rows.length; index++) {
        list.forEach(element => {
            if (columns[element] == 1 && rows[index] == 1){
                obstaculos.push([blockSize*element,index*blockSize])
            } else if (columns[element] == 2 && rows[index] == 2){
                luces.push([blockSize*element,index*blockSize])
            }                           
        });
    } 
}

function drawMatrix(rows,columns){
    context.clearRect(0, 0, canvas.width, canvas.height);  
    let list = Array.from(Array(columns.length).keys())
    for (let index = 0; index < rows.length; index++) {
        list.forEach(element => {
            context.strokeStyle="black";
            if (columns[element] == 1 && rows[index] == 1){
                context.fillStyle="red";
            } else if (columns[element] == 2 && rows[index] == 2){
                context.fillStyle = "yellow";
            } else {
                context.fillStyle="green";                
            }
            context.strokeRect(blockSize*element,index*blockSize,blockSize,blockSize);  
            context.fillRect(blockSize*element,index*blockSize,blockSize,blockSize);                                  
        });
    
    } 
}
function update(){
    requestAnimationFrame(update)
    drawMatrix(rows, columns,70)
    drawCharacter(personaje.posX,personaje.posY)
}

function moverPersonaje(personaje,posInicial,posFinal){
    context.clearRect(0, 0, canvas.width, canvas.height);      
}
var b = document.getElementById("bb");
init(rows,columns)
update()

