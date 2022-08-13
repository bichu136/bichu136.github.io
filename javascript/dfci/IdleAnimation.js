let IdleAniCanvas = document.getElementById("IdleAnimation");
let IdleAniCanvasCtx = IdleAniCanvas.getContext("2d");
let IdleNumberFrame = [
    {"Name":"ASU" , "NumberOfFrame":5},
    {"Name":"AKO" , "NumberOfFrame":5},
    {"Name":"EMI" , "NumberOfFrame":5},
    {"Name":"KRN" , "NumberOfFrame":8},
    {"Name":"KRK" , "NumberOfFrame":5},
    {"Name":"KRT" , "NumberOfFrame":6},
    {"Name":"KUR" , "NumberOfFrame":5},
    {"Name":"MIS" , "NumberOfFrame":5},
    {"Name":"ONI" , "NumberOfFrame":5},
    {"Name":"QEN" , "NumberOfFrame":5},
    {"Name":"SBM" , "NumberOfFrame":5},
    {"Name":"SHA" , "NumberOfFrame":6},
    {"Name":"SHIZUO" , "NumberOfFrame":5},
    {"Name":"SLV" , "NumberOfFrame":5},
    {"Name":"STM" , "NumberOfFrame":6},
    {"Name":"TGR" , "NumberOfFrame":6},
    {"Name":"TMK" , "NumberOfFrame":5},
    {"Name":"YAK" , "NumberOfFrame":6},
    {"Name":"YKN" , "NumberOfFrame":5},
    {"Name":"YUK" , "NumberOfFrame":5}
]
// draw(ctx){
//     ctx.beginPath();
//     ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
//     ctx.fill();
//     console.log()
//     let offset_x = dfci_ball_offset[this.img_src.getAttribute("id")]["x"]
//     let offset_y = dfci_ball_offset[this.img_src.getAttribute("id")]["y"]
//     ctx.drawImage(this.img_src,this.x-this.r-offset_x,this.y-this.r-offset_y);
//     ctx.closePath();

    
// }
let AnimationIdles = []
for(let j = 0;j<IdleNumberFrame.length;j++){
    AnimationIdles.push([]);
    for(let i = 0;i<IdleNumberFrame[j]["NumberOfFrame"];i++){
        let IdleImg = document.createElement("img");
        IdleImg.src = "/assets/IdleAnimation/"+IdleNumberFrame[j]["Name"]+"/"+i.toString()+".png";
        AnimationIdles[j].push(IdleImg);
    }
}
let img_index= 0;
function drawLoop(){
    img_index = (img_index+1)%AnimationIdles[12].length;
    IdleAniCanvasCtx.clearRect(0,0,IdleAniCanvas.width,IdleAniCanvas.height);
    IdleAniCanvasCtx.beginPath();
    IdleAniCanvasCtx.drawImage(AnimationIdles[12][img_index],0,0);
    IdleAniCanvasCtx.closePath();
}

let interval = setInterval(drawLoop, (1000/60)*6);