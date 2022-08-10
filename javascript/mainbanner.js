let mainBannerCanvas = document.getElementById('mainBanner-canvas');

let mainBannerCanvasCtx = mainBannerCanvas.getContext("2d");
mainBannerCanvas.height = window.innerHeight;
mainBannerCanvas.width = window.innerWidth;
window.addEventListener('resize',()=>{
    //change canvas to fit client width and height
    mainBannerCanvas.height = window.innerHeight;
    mainBannerCanvas.width = window.innerWidth;

});
class Ball{
    constructor(x,y,r,x_velocity,y_velocity){
        this.x = x;
        this.y = y;
        this.r = r;
        this. x_velocity= x_velocity;
        this.y_velocity = y_velocity;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
    }
    move(){
        this.x = this.x+this.x_velocity;
        this.y = this.y+this.y_velocity;
    }
}


let drawObjects = [new Ball(100,250,50,2,2),
                   new Ball(100,250,50,3,2),
                   new Ball(100,250,50,2,2),
                   new Ball(100,250,50,3,3),
                   new Ball(100,250,50,2,3),
                   new Ball(100,250,50,-1,2)]

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
            console.log("meet bottom")
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

