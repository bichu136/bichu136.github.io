let IdleAniCanvas = document.getElementById("IdleAnimation");
let IdleAniCanvasCtx = IdleAniCanvas.getContext("2d");

let IdleAniCanvasWrapper = document.getElementById("idle_canvas_wrapper");
let scale_factor = IdleAniCanvasWrapper.offsetWidth / 1000;
IdleAniCanvas.width = IdleAniCanvasWrapper.offsetWidth;
IdleAniCanvas.height = IdleAniCanvasWrapper.offsetHeight;
function setScaleFactor(){
    let k = 0;
    if (IdleAniCanvasWrapper.offsetWidth<IdleAniCanvasWrapper.offsetHeight){
        k = IdleAniCanvasWrapper.offsetWidth;
    }else{
        k = IdleAniCanvasWrapper.offsetHeight;
    }
    scale_factor = k / 600;

}
setScaleFactor();
console.log(scale_factor)
IdleAniCanvasCtx.scale(scale_factor,scale_factor);
window.addEventListener('resize',()=>{
    //change canvas to fit client width and height
    IdleAniCanvas.height = IdleAniCanvasWrapper.offsetHeight;
    IdleAniCanvas.width = IdleAniCanvasWrapper.offsetWidth;
    //TODO: scale depend on something
    IdleAniCanvasCtx.clearRect(0,0,IdleAniCanvas.width,IdleAniCanvas.height);
    IdleAniCanvasCtx.scale(1,1);
    setScaleFactor();
    console.log(scale_factor)
    // IdleAniCanvas.width = IdleAniCanvas.width*scale_factor;
    IdleAniCanvasCtx.scale(scale_factor,scale_factor);
    
    // console.log("right width",IdleAniCanvas.width*scale_factor)
});
chara_info
let IdleNumberFrame = [
    {"Name":"ASU" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"AKO" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"EMI" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"KRN" , "NumberOfFrame":8,"X_offset":-50,"Y_offset": -40},
    {"Name":"KRK" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"KRT" , "NumberOfFrame":6,"X_offset":-50,"Y_offset": -40},
    {"Name":"KUR" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"MIS" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"ONI" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"QEN" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"SBM" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"SHA" , "NumberOfFrame":6,"X_offset":248,"Y_offset":301},
    {"Name":"SHIZUO" , "NumberOfFrame":5,"X_offset":-10,"Y_offset": -40},
    {"Name":"SLV" , "NumberOfFrame":5,"X_offset":-250,"Y_offset":-155},
    {"Name":"STM" , "NumberOfFrame":6,"X_offset":-50,"Y_offset": -40},
    {"Name":"TGR" , "NumberOfFrame":6,"X_offset":-50,"Y_offset": -40},
    {"Name":"TMK" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40},
    {"Name":"YAK" , "NumberOfFrame":6,"X_offset":-50,"Y_offset": -40},
    {"Name":"YKN" , "NumberOfFrame":5,"X_offset":261,"Y_offset":85},
    {"Name":"YUK" , "NumberOfFrame":5,"X_offset":-50,"Y_offset": -40}
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
let CharaSelectTexture = document.createElement("img");
CharaSelectTexture.src = "/assets/charasele_main00.png"
// size w:56 h:144
// 12 9
// 92 9
// 12 169
let CharaSelectDict = {
    "SHA":{"x":12,"y":9},
    "ASU":{"x":92,"y":9},
    "KRT":{"x":172,"y":9},
    "MIS":{"x":252,"y":9},
    "KRN":{"x":332,"y":9},
    "KUR":{"x":412,"y":9},
    "TGR":{"x":12,"y":169},
    "STM":{"x":92,"y":169},
    "YKN":{"x":172,"y":169},
    "SBM":{"x":252,"y":169},
    "TMK":{"x":332,"y":169},
    "SHIZUO":{"x":412,"y":169},
    "YAK":{"x":12,"y":329},
    "SLV":{"x":92,"y":329},
    "EMI":{"x":12,"y":489},
    "QEN":{"x":92,"y":489},
    "ONI":{"x":172,"y":489},
    "YUK":{"x":252,"y":489},
    "KRK":{"x":332,"y":489},
    "AKO":{"x":412,"y":489}
}
let img_index= 0;
let change_after = 5;
let change_index = 1;
let current_sprite = 10;
let movement = -250;
let v_movement = 75;
function drawLoop(){
    img_index = (img_index+1)%AnimationIdles[current_sprite].length;
    // if (img_index == 0) {
    //     change_index=(change_index+1)%change_after;
    //     // if(change_index==0){
    //     //     current_sprite=(current_sprite +1)%AnimationIdles.length;
    //     // }
    // };
    
    movement+=v_movement;
    if (movement>0){
        movement = 0;
    }
    
    IdleAniCanvasCtx.clearRect(0,0,10000,1000);



    IdleAniCanvasCtx.beginPath();

    IdleAniCanvasCtx.drawImage(AnimationIdles[current_sprite][img_index],movement+IdleNumberFrame[current_sprite]["X_offset"],IdleNumberFrame[current_sprite]["Y_offset"]);
    
    IdleAniCanvasCtx.closePath();
    //change stat and descript to match appeared sprite.
    // document.getElementsByClassName("chara_stat")[0].textContent = chara_info[current_sprite]["name"];
    document.getElementsByClassName("chara_descript")[0].textContent = chara_info[current_sprite]["description"];




}
let list_of_context = []
let CharaSelectWrapper = document.getElementById("chara-select-wrapper")
console.log(CharaSelectWrapper)
for(let i = 0; i<IdleNumberFrame.length;i++){

    let t_canvas = document.createElement('canvas');
    t_canvas.width = 56;
    t_canvas.height = 144;
    
    CharaSelectWrapper.appendChild(t_canvas);
}
// let t_canvas_ctx = t_canvas.getContext('2d');

let interval = setInterval(drawLoop, (1000/60)*6);
//for somereason drawing into newly created canvas not working so we set a timer to do it after a while.

//click to choose characters to show on IdleAniCanvas and their info
let charaInfo = document.getElementById("chara_info");
for(let i = 1; i<=IdleNumberFrame.length;i++){
    CharaSelectWrapper.childNodes[i].addEventListener('click',()=>{
        current_sprite = i-1;
        movement = -250;
        charaInfo.style.left = 5000;
        let changeCharaTimeout = setTimeout(()=>{charaInfo.style.left = 0;},100);
        

    });
    

}

let timeout = setTimeout(()=>{
    for(let i = 1; i<=IdleNumberFrame.length;i++){

        let t_canvas_ctx = CharaSelectWrapper.childNodes[i].getContext("2d");
        let sx = CharaSelectDict[IdleNumberFrame[i-1]["Name"]]["x"]
        let sy = CharaSelectDict[IdleNumberFrame[i-1]["Name"]]["y"]
        console.log(sx,sy);
        t_canvas_ctx.drawImage(CharaSelectTexture,0,0,512,1024,0,0,512,1024);
        IdleAniCanvasCtx.clearRect(0,0,10000,1000);
        t_canvas_ctx.beginPath();
        t_canvas_ctx.drawImage(CharaSelectTexture,sx,sy,56,144,0,0,56,144);
        t_canvas_ctx.closePath();
    
    }
},500);

// color for stat bars: red|   green|  orange but yellowish|   blue but cyanish| pink but purpleish
