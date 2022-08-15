let IdleAniCanvas = document.getElementById("IdleAnimation");
let IdleAniCanvasCtx = IdleAniCanvas.getContext("2d");

let IdleAniCanvasWrapper = document.getElementById("idle_canvas_wrapper");
IdleAniCanvas.width = IdleAniCanvasWrapper.offsetWidth;
IdleAniCanvas.height = IdleAniCanvasWrapper.offsetHeight;
window.addEventListener('resize',()=>{
    //change canvas to fit client width and height
    IdleAniCanvas.height = IdleAniCanvasWrapper.offsetHeight;
    IdleAniCanvas.width = IdleAniCanvasWrapper.offsetWidth;
    //TODO: scale depend on something
});
let IdleNumberFrame = [
    {"Name":"ASU" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"AKO" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"EMI" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"KRN" , "NumberOfFrame":8,"X_offset":-200,"Y_offset": 60},
    {"Name":"KRK" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"KRT" , "NumberOfFrame":6,"X_offset":-200,"Y_offset": 60},
    {"Name":"KUR" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"MIS" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"ONI" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"QEN" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"SBM" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"SHA" , "NumberOfFrame":6,"X_offset":98,"Y_offset":391},
    {"Name":"SHIZUO" , "NumberOfFrame":5,"X_offset":-10,"Y_offset": 60},
    {"Name":"SLV" , "NumberOfFrame":5,"X_offset":-400,"Y_offset":-100},
    {"Name":"STM" , "NumberOfFrame":6,"X_offset":-200,"Y_offset": 60},
    {"Name":"TGR" , "NumberOfFrame":6,"X_offset":-200,"Y_offset": 60},
    {"Name":"TMK" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60},
    {"Name":"YAK" , "NumberOfFrame":6,"X_offset":-200,"Y_offset": 60},
    {"Name":"YKN" , "NumberOfFrame":5,"X_offset":111,"Y_offset":185},
    {"Name":"YUK" , "NumberOfFrame":5,"X_offset":-200,"Y_offset": 60}
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
let change_after = 5;
let change_index = 1;
let current_sprite = 10;
// IdleAniCanvasCtx.scale(0.7,0.7);

function drawLoop(){
    img_index = (img_index+1)%AnimationIdles[current_sprite].length;
    if (img_index == 0) {
        change_index=(change_index+1)%change_after;
        if(change_index==0){
            current_sprite=(current_sprite +1)%AnimationIdles.length;
        }
    };
    
    IdleAniCanvasCtx.clearRect(0,0,IdleAniCanvas.width,IdleAniCanvas.height);
    IdleAniCanvasCtx.beginPath();
    IdleAniCanvasCtx.drawImage(AnimationIdles[current_sprite][img_index],IdleNumberFrame[current_sprite]["X_offset"],IdleNumberFrame[current_sprite]["Y_offset"]);
    IdleAniCanvasCtx.closePath();
    
}

let interval = setInterval(drawLoop, (1000/60)*6);