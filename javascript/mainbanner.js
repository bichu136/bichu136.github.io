let mainBannerCanvas = document.getElementById('mainBanner-canvas');
var dfci_balls = document.getElementsByClassName("dfci_ball");
let mainBannerCanvasCtx = mainBannerCanvas.getContext("2d");
let dfci_ball_offset = {
    "ASUBALL":{"x":12,"y":0} ,
    "AKOBALL":{"x":0,"y":12},
    "EMIBALL":{"x":2,"y":6},
    "KRKBALL":{"x":2,"y":0},
    "KRNBALL":{"x":2,"y":0},
    "KRTBALL":{"x":0,"y":0},
    "KURBALL":{"x":6,"y":10},
    "MISBALL":{"x":0,"y":0},
    "ONIBALL":{"x":2,"y":0},
    "QENBALL":{"x":6,"y":0},
    "SBMBALL":{"x":0,"y":0},
    "SHABALL":{"x":0,"y":7},
    "SHIZUOBALL":{"x":0,"y":3},
    "SLVBALL":{"x":0,"y":0},
    "STMBALL":{"x":3,"y":3},
    "TGRBALL":{"x":0,"y":0},
    "TMKBALL":{"x":3,"y":1},
    "YAKBALL":{"x":0,"y":5},
    "YKNBALL":{"x":5,"y":0},
    "YUKBALL":{"x":0,"y":16}
}
mainBannerCanvas.height = window.innerHeight;
mainBannerCanvas.width = window.innerWidth;
window.addEventListener('resize',()=>{
    //change canvas to fit client width and height
    mainBannerCanvas.height = window.innerHeight;
    mainBannerCanvas.width = window.innerWidth;

});
class Ball{
    constructor(x,y,r,x_velocity,y_velocity,img_src){
        this.x = x;
        this.y = y;
        this.r = r;
        this. x_velocity= x_velocity;
        this.y_velocity = y_velocity;
        this.img_src = img_src;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        console.log()
        let offset_x = dfci_ball_offset[this.img_src.getAttribute("id")]["x"]
        let offset_y = dfci_ball_offset[this.img_src.getAttribute("id")]["y"]
        ctx.drawImage(this.img_src,this.x-this.r-offset_x,this.y-this.r-offset_y);
        ctx.closePath();

        
    }
    move(){
        this.x = this.x+this.x_velocity;
        this.y = this.y+this.y_velocity;
    }
}


let drawObjects = []
for(let i=0; i<dfci_balls.length;i++){
    drawObjects.push(new Ball(Math.random()*mainBannerCanvas.width+15,
                                Math.random()*mainBannerCanvas.height+15,
                                30,
                                Math.random()*5,
                                Math.random()*5,
                                dfci_balls[i]))
}
function checkCollision(drawObjects){
    for(let i = 0;i< drawObjects.length;i++){
        // get bounding box of a circle
        let t =drawObjects[i].y-drawObjects[i].r
        let b =drawObjects[i].y+drawObjects[i].r
        let l =drawObjects[i].x-drawObjects[i].r
        let r =drawObjects[i].x+drawObjects[i].r
        if (t<=0 ){
            drawObjects[i].y = 0+drawObjects[i].r
            if (drawObjects[i].y_velocity<0)
                drawObjects[i].y_velocity =-drawObjects[i].y_velocity
        }
        if (b>=mainBannerCanvas.height ){
            drawObjects[i].y = mainBannerCanvas.height - drawObjects[i].r
            if (drawObjects[i].y_velocity>0)
                drawObjects[i].y_velocity =-drawObjects[i].y_velocity
        }
        if (l<=0 ){
            drawObjects[i].x = 0+drawObjects[i].r
            if (drawObjects[i].x_velocity<0)
                drawObjects[i].x_velocity =-drawObjects[i].x_velocity
        }
        if (r>=mainBannerCanvas.width ){
            drawObjects[i].x= mainBannerCanvas.width - drawObjects[i].r
            if (drawObjects[i].x_velocity>0)
                drawObjects[i].x_velocity =-drawObjects[i].x_velocity
        }
    }
}

function drawLoop(){
    //Draw what happen in an interval.
    //console.log(mainBannerCanvas.width,mainBannerCanvas.height)
    mainBannerCanvasCtx.clearRect(0,0,mainBannerCanvas.width,mainBannerCanvas.height);
    
    for(let i = 0;i< drawObjects.length;i++){
        drawObjects[i].move();
        checkCollision(drawObjects);
        drawObjects[i].draw(mainBannerCanvasCtx);
    }

}
setInterval(drawLoop,1000/60);
// drawLoop();

