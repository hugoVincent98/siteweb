const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulesArray;

//get mouse mouvements

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/90) * (canvas.height/90)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particule{
    constructor(x,y,directionX,directionY,size,color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx.fillStyle = '#16e0bd';
        ctx.fill();
    }

    update(){

        //check if particule in canvas
        if(this.x > canvas.width|| this.x < 0 ){
            this.directionX = -this.directionX;
        }

        if(this.y > canvas.height|| this.y < 0){
            this.directionY = -this.directionY;
        }

        //check collision detection - mouse position / particule position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy)
        if (distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 2){
                this.x += 1;
            }
            if(mouse.x > this.x && this.x > this.size * 2){
                this.x-= 1;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 2){
                this.y += 1;
            }
            if(mouse.y > this.y && this.y > this.size * 2){
                this.y -= 1 ;
            }
        }

        // move particule
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();

    }

}

//creat particule array
function init(){
    particulesArray = [];
    let numberOfParticules = (canvas.height * canvas.width)/9000;
    for(let i = 0 ; i < numberOfParticules; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2 )) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2)- (size * 2 )) + size * 2);

        let directionX =  ((Math.random() * 5) -2.5)/4;
        let directionY =  ((Math.random() * 5) -2.5)/4;

        let color = '#16e0bd'; 

        particulesArray.push(new Particule(x,y,directionX,directionY,size,color));

    }
}

function connect(){
    for (let i = 0 ; i < particulesArray.length ;  i++){
        for(let j = 0 ;  j <particulesArray.length ; j++){
            let distance = ((particulesArray[i].x - particulesArray[j].x)
                * (particulesArray[i].x - particulesArray[j].x))
                + ((particulesArray[i].y - particulesArray[j].y)
                * (particulesArray[i].y - particulesArray[j].y));
            if(distance < (canvas.width/20) * (canvas.height/20)){
                ctx.strokeStyle = '#16e0bd';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulesArray[i].x,particulesArray[i].y);
                ctx.lineTo(particulesArray[j].x,particulesArray[j].y);
                ctx.stroke();
            }
        }
    }
}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i = 0 ;i < particulesArray.length ; i++){
        particulesArray[i].update();
    }

    connect();

}


init();
animate();