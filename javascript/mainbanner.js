let mainBannerCanvas = document.getElementById('mainBanner-canvas');

let mainBannerCanvasCtx = mainBannerCanvas.getContext("2d");
mainBannerCanvas.height = window.innerHeight;
mainBannerCanvas.width = window.innerWidth;
window.addEventListener('resize',()=>{
    //change canvas to fit client width and height
    mainBannerCanvas.height = window.innerHeight;
    mainBannerCanvas.width = window.innerWidth;

});
console.log(mainBannerCanvasCtx);
class Ball{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
    }
    draw(ctx){
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
    }
}


let drawObjects = [new Ball(1000,1000,250)]


function drawLoop(){
    //Draw what happen in an interval.
    mainBannerCanvasCtx.clearRect(0,0,mainBannerCanvas.width,mainBannerCanvas.height);
    for(let i = 0;i< drawObjects.length;i++){
        drawObjects[i].draw(mainBannerCanvasCtx);
    }
}
setInterval(drawLoop,1000/60);
// drawLoop();

