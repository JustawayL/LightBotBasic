
const blockSize = 70 
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var rows =      [0,1,2,1];
var columns =   [1,0,1,2];


function drawMatrix(rows,columns){
    let list = Array.from(Array(columns.length).keys())
    for (let index = 0; index < rows.length; index++) {
        list.forEach(element => {
            context.strokeStyle="black";
            if (columns[element] == 1 && rows[index] == 1){
                context.fillStyle="red";
            } else if (columns[element] == 2 && rows[index] == 2){
                context.fillStyle = "yellow"
            } else {
                context.fillStyle="green";                
            }
            context.strokeRect(blockSize*element,index*blockSize,blockSize,blockSize);  
            context.fillRect(blockSize*element,index*blockSize,blockSize,blockSize);                                    
        });
    
    }
    
}

drawMatrix(rows,columns,70)
