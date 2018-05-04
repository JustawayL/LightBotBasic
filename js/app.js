
const blockSize = 70; 
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var nrows = [[0,1,2,1],[0,0,2,1]];
var ncolumns = [[1,0,1,2],[0,1,2,1]];
var rows =    nrows[0];
var columns =   ncolumns[0];
canvas.height = rows.length*blockSize;
canvas.width = columns.length*blockSize;
var obstaculos=[];
var luces=[];
var estadoLuz = "black"

var comandos = Object.freeze({"Avanzar":1,"GirarDer":2,"GirarIzq":3,"Encender":4});
var orientaciones = Object.freeze({"Norte":1,"Sur":2,"Este":3,"Oeste":4});

var personaje = {
    posX : blockSize/3,
    posY : blockSize/3,
    orientacion: orientaciones.Este,
    lucesEncendidas: []
};


var listaComandos = [];
function drawCharacter(posX,posY){
    var img = new Image();
    if(personaje.orientacion==orientaciones.Norte)
    {
        img.src="img/arriba3.png";
    }
    if(personaje.orientacion==orientaciones.Sur)
    {
        img.src="img/abajo3.png";
    }
    if(personaje.orientacion==orientaciones.Este)
    {
        img.src="img/der3.png";
    }
    if(personaje.orientacion==orientaciones.Oeste)
    {
        img.src="img/izq3.png";
    }
    context.drawImage(img,posX-20,posY-20);
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

function agregarComandoUI(comando){
    var node = document.createElement("LI");
    var textnode = document.createTextNode(comando);
    node.appendChild(textnode);
    let cmds = document.getElementById("listaComandos");
    cmds.appendChild(node);
}

function limpiarListaComandosUI(){
    let cmds = document.getElementById("listaComandos");
    while( cmds.firstChild ){
     cmds.removeChild( cmds.firstChild );
}
}

function isLegalMove(){
    var islegal = [];
    obstaculos.forEach((obs) => {
        if (obs[0] < personaje.posX && obs[1] < personaje.posY && obs[0] + blockSize > personaje.posX && obs[1] + blockSize > personaje.posY + blockSize/3){
            islegal.push(false);
        }else if (personaje.posY > canvas.height || personaje.posY < 0 || personaje.posX < 0 || personaje.posX > canvas.width){
            islegal.push(false);
        }else islegal.push(true);
        
    });
    return islegal.reduce((acu,b) => acu&&b);
}

function isLegalLight(){
    var islegal = [];
    luces.forEach((obs) => {
        if (obs[0] < personaje.posX && obs[1] < personaje.posY && obs[0] + blockSize > personaje.posX && obs[1] + blockSize > personaje.posY + blockSize/3){
            islegal.push(true);
        }else islegal.push(false);
        
    });
    return islegal.reduce((acu,b) => acu&&b);
}

function agregarComando(e){
    switch(e.id){
        case "b1":
            listaComandos.push(comandos.Avanzar);
            agregarComandoUI("Avanzar");
            break;
        case "b2":
            listaComandos.push(comandos.GirarDer);
            agregarComandoUI("GirarDer");
            break;
        case "b3":
            listaComandos.push(comandos.GirarIzq);
            agregarComandoUI("GirarIzq");
            break;
        case "b4":
            listaComandos.push(comandos.Encender);
            agregarComandoUI("Encender");
            break;
    }
}
var pause = false;
function ejecutarComando(comando){
    switch (comando){
        case 1:
            if (isLegalMove()) Avanzar();
            setTimeout(() => {
                pause = true;}
                ,500);
            break;
        case 2:
            GirarDer();
            break;
        case 3:
            GirarIzq();
            break;
        case 4:
            if(isLegalLight()) Encender();
            else console.log("No hay luces para prender")
            break;
    }
}


function Avanzar(){
    if (pause) {
        console.log("no se pudo avanzar")
        return;
    }

    requestAnimationFrame(Avanzar);
    switch (personaje.orientacion){
        case 1:
            personaje.posY -=2.25;
            break;
        case 2: 
            personaje.posY +=2.25;
            break;
        case 3: 
            personaje.posX +=2.25;
            break;
        case 4: 
            personaje.posX -=2.25;
            break;

    }
}
function GirarIzq(){
    console.log("giro a la izq")
    switch(personaje.orientacion){
        case 1:
            personaje.orientacion = orientaciones.Oeste;
            break;
        case 2:
            personaje.orientacion = orientaciones.Este;
            break;
        case 3:
            personaje.orientacion = orientaciones.Norte;
            break;
        case 4:
            personaje.orientacion = orientaciones.Sur;
            break;
    }
}
function GirarDer(){
    console.log("giro a la der")
    switch(personaje.orientacion){
        case 1:
            personaje.orientacion = orientaciones.Este;
            break;
        case 2:
            personaje.orientacion = orientaciones.Oeste;
            break;
        case 3:
            personaje.orientacion = orientaciones.Sur;
            break;
        case 4:
            personaje.orientacion = orientaciones.Norte;
            break;
    }
}
function Encender(){
    console.log("Encendio");
    estadoLuz = "yellow";
    personaje.lucesEncendidas.push(1);
}

function apagar(){
    console.log("Apagar");
    estadoLuz = "black";
    personaje.lucesEncendidas.push(1);
}


function drawMatrix(rows,columns){
    context.clearRect(0, 0, canvas.width, canvas.height);  
    let list = Array.from(Array(columns.length).keys())
    for (let index = 0; index < rows.length; index++) {
        list.forEach(element => {
            context.strokeStyle="#473049";
            if (columns[element] == 1 && rows[index] == 1){
                context.fillStyle="#952249";
            } else if (columns[element] == 2 && rows[index] == 2){
                context.fillStyle = estadoLuz;
            } else {
                context.fillStyle="#c7bfbd";                
            }
            context.strokeRect(blockSize*element,index*blockSize,blockSize,blockSize);  
            context.fillRect(blockSize*element,index*blockSize,blockSize,blockSize);                                  
        });
    
    } 
}
function update(){
    requestAnimationFrame(update);
    drawMatrix(rows, columns,70);
    drawCharacter(personaje.posX,personaje.posY);
    personaje.posX
}

function play(){
    let refreshIntervalId = setInterval(() => {
        pause = false;
        console.log("Corriendo");
        if (personaje.lucesEncendidas.length >= luces.length) {
			alert("Has ganado");
			rows = nrows[1];
			columns = ncolumns[1];
			apagar();
			reset();
			obstaculos=[];
			luces=[];
			init(rows,columns);
			}
        if (listaComandos.length > 0) {
           ejecutarComando(listaComandos.shift());
        }else {
            console.log("No se pueden realizar mas movimientos");
            clearInterval(refreshIntervalId);
            limpiarListaComandosUI();
            listaComandos = [];
            personaje = {
                posX : blockSize/3,
                posY : blockSize/3,
                orientacion: orientaciones.Este,
                lucesEncendidas: []
            };

        }
    },1000);
}

function reset(){
	limpiarListaComandosUI();
            listaComandos = [];
            personaje = {
                posX : blockSize/3,
                posY : blockSize/3,
                orientacion: orientaciones.Este,
                lucesEncendidas: []
			};
	}

function moverPersonaje(personaje,posInicial,posFinal){
    context.clearRect(0, 0, canvas.width, canvas.height);      
}
init(rows,columns);
update();


