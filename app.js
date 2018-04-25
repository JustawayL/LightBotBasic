var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var rows =      [0,1,2,1];
var columns =   [1,0,1,2];


function drawMatrix(rows,columns,size){
    let list = Array.from(Array(columns.length).keys())
    for (let index = 0; index < rows.length; index++) {
        list.forEach(element => {
            context.strokeStyle="black";
            if (columns[element] == 1 && rows[index] == 1){
                context.fillStyle="green";
            } else if (columns[element] == 2 && rows[index] == 2){
                context.fillStyle = "yellow"
            } else {
                context.fillStyle="red";                
            }
            context.strokeRect(size*element,index*size,size,size);  
            context.fillRect(size*element,index*size,size,size);                                    
        });
    
    }
    
}

drawMatrix(rows,columns,70)
