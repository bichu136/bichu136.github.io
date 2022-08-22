let IdleAniCanvas = document.getElementById("IdleAnimation");
let IdleAniCanvasCtx = IdleAniCanvas.getContext("2d");
let statCanvas = document.getElementById("statCanvas");
let statCanvasCtx = statCanvas.getContext("2d");
let IdleAniCanvasWrapper = document.getElementById("idle_canvas_wrapper");
let charaStat = document.getElementsByClassName("chara_stat")[0];
let scale_factor = IdleAniCanvasWrapper.offsetWidth / 1000;
//all images

let NumOfImg = 0;
let BlastImg = document.createElement("img");
NumOfImg +=1;
let BlastNoneImg = document.createElement("img");
NumOfImg +=1;
BlastImg.src = "/assets/IdleAnimation/BlastPoint/blast2.png";
BlastNoneImg.src = "/assets/IdleAnimation/BlastPoint/blast_none2.png";
let AnimationIdles = []
for(let j = 0;j<IdleNumberFrame.length;j++){
    AnimationIdles.push([]);
    for(let i = 0;i<IdleNumberFrame[j]["NumberOfFrame"];i++){
        let IdleImg = document.createElement("img");
        NumOfImg +=1;
        IdleImg.src = "/assets/IdleAnimation/"+IdleNumberFrame[j]["Name"]+"/"+i.toString()+".png";
        AnimationIdles[j].push(IdleImg);
    }
}
let CharaSelectTexture = document.createElement("img");
NumOfImg +=1;
CharaSelectTexture.src = "/assets/charasele_main00.png";
IdleAniCanvas.width = IdleAniCanvasWrapper.offsetWidth;
IdleAniCanvas.height = IdleAniCanvasWrapper.offsetHeight;
statCanvas.height = charaStat.offsetHeight;
statCanvas.width = charaStat.offsetWidth;
function setScaleFactor(){
    let k = 0;
    k = IdleAniCanvasWrapper.offsetWidth;
    scale_factor = k / 1000;
    if (scale_factor<0.5){
        scale_factor=0.5;
    }

}
setScaleFactor();
console.log(scale_factor)
IdleAniCanvasCtx.scale(scale_factor,scale_factor);
// statCanvasCtx.scale(scale_factor,scale_factor);
window.addEventListener('resize',()=>{
    //change canvas to fit client width and height
    IdleAniCanvas.height = IdleAniCanvasWrapper.offsetHeight;
    IdleAniCanvas.width = IdleAniCanvasWrapper.offsetWidth;
    statCanvas.height = charaStat.offsetHeight;
    statCanvas.width = charaStat.offsetWidth;
    //TODO: scale depend on something

    IdleAniCanvasCtx.clearRect(0,0,IdleAniCanvas.width,IdleAniCanvas.height);
    IdleAniCanvasCtx.scale(1,1);
    // statCanvasCtx.scale(1,1);
    setScaleFactor();
    console.log(scale_factor)
    // IdleAniCanvas.width = IdleAniCanvas.width*scale_factor;
    IdleAniCanvasCtx.scale(scale_factor,scale_factor);
    // statCanvasCtx.scale(scale_factor,scale_factor);
    
    // console.log("right width",IdleAniCanvas.width*scale_factor)
});

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

// size w:56 h:144
// 12 9
// 92 9
// 12 169

let img_index= 0;
let change_after = 5;
let change_index = 1;
let current_sprite = 10;
let movement = -250;
let v_movement = 75;

function drawStatLine(lvl,x,y,ctx){
    let color = ["#e33714","#33f01a","#f2c327","#26a1c7","#c845d9"]
    let gradient = ctx.createLinearGradient(x,y,x,y+30);
    gradient.addColorStop(0,"white");
    gradient.addColorStop(0.3,"rgba(50,50,50,1)");
    gradient.addColorStop(0.6,"white");
    gradient.addColorStop(1,"rgba(50,50,50,1)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(charaStat.offsetWidth-charaStat.offsetWidth*10/100,y);
    ctx.lineTo(charaStat.offsetWidth-charaStat.offsetWidth*5/100,y+5);
    ctx.lineTo(charaStat.offsetWidth-charaStat.offsetWidth*15/100,y+30);
    ctx.lineTo(0,y+30);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#e33714";
    let bar_width = charaStat.offsetWidth*85/100;
    for(let i=0;i<5;i++){
        if (i<lvl){
            ctx.fillStyle = color[i];
        }else{
            ctx.fillStyle="grey";
        }
        ctx.fillRect(x+5+i*bar_width/5,y+5,bar_width/5,20);
    }
    for(let i=0;i<5;i++){
        if (i<lvl){
            ctx.drawImage(BlastImg,x-25+(i+1)*bar_width/5,y-10);
        }else{
            ctx.drawImage(BlastNoneImg,x-25+(i+1)*bar_width/5,y-10);
        }
    }
    
}
function drawStat(){
    statCanvasCtx.clearRect(0,0,10000,1000);
    let _range = chara_info[current_sprite]["range"];
    let _offense = chara_info[current_sprite]["offense"];
    let _deffence = chara_info[current_sprite]["deffence"];
    drawStatLine(_offense,0,10,statCanvasCtx);
    drawStatLine(_deffence,0,80,statCanvasCtx);
    drawStatLine(_range,0,150,statCanvasCtx);
    statCanvasCtx.strokeStyle = "red";
    statCanvasCtx.fillStyle = "white";
    statCanvasCtx.font="25px Aerial";
    statCanvasCtx.lineWidth= 0.5;
    statCanvasCtx.fillText("Offense",0,60);
    statCanvasCtx.strokeText("Offense",0,60);
    statCanvasCtx.strokeStyle = "green";
    statCanvasCtx.fillStyle = "white";
    statCanvasCtx.font="25px Aerial";
    statCanvasCtx.lineWidth= 0.5;
    statCanvasCtx.fillText("Defence",0,130);
    statCanvasCtx.strokeText("Defence",0,130);
    statCanvasCtx.strokeStyle = "blue";
    statCanvasCtx.fillStyle = "white";
    statCanvasCtx.font="25px Aerial";
    statCanvasCtx.lineWidth= 0.5;
    statCanvasCtx.fillText("Range",0,200);
    statCanvasCtx.strokeText("Range",0,200);
}
let previous_sprite = current_sprite;
function drawLoop(){
    drawStat();
    //draw for animations
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
    //---------------------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------------------------------------------------------//
    //draw for stat
   
    // statCanvasCtx.strokeText("Offense",50,50);
    
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
    t_canvas.onload = (e)=>{}
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
        // let changeCharaTimeout = setTimeout(()=>{charaInfo.style.left = 0;},100);
        

    });
    

}
let loadedImg = 0;
BlastImg.onload = (e)=>{loadedImg+=1;}
BlastNoneImg.onload = (e)=>{loadedImg+=1;}
CharaSelectTexture.onload = (e)=>{loadedImg+=1;}
for(let i=0;i<AnimationIdles.length;i++){
    for(let j=0;j<AnimationIdles[i].length;j++){
        AnimationIdles[i][j].onload = (e)=>{loadedImg+=1;}
    }
}
function WaitLoadAssets(){
    if (loadedImg<NumOfImg){
        let TO = setTimeout(WaitLoadAssets,100);
        console.log(loadedImg/NumOfImg)
    }else{
        console.log('done');
        document.getElementsByClassName('wrap')[0].style.display = "block";
        let CharaSelectTimeout = setTimeout((e)=>{
            drawStat();
            for(let i = 1; i<=IdleNumberFrame.length;i++){
        
                let t_canvas_ctx = CharaSelectWrapper.childNodes[i].getContext("2d");
                let sx = CharaSelectDict[IdleNumberFrame[i-1]["Name"]]["x"]
                let sy = CharaSelectDict[IdleNumberFrame[i-1]["Name"]]["y"]
                console.log(sx,sy);
                IdleAniCanvasCtx.clearRect(0,0,10000,1000);
                t_canvas_ctx.beginPath();
                t_canvas_ctx.drawImage(CharaSelectTexture,sx,sy,56,144,0,0,56,144);
                t_canvas_ctx.closePath();
            
            }
        },500);
    }
}
WaitLoadAssets();
// let CharaSelectTimeout = setTimeout((e)=>{
//     drawStat();
//     for(let i = 1; i<=IdleNumberFrame.length;i++){

//         let t_canvas_ctx = CharaSelectWrapper.childNodes[i].getContext("2d");
//         let sx = CharaSelectDict[IdleNumberFrame[i-1]["Name"]]["x"]
//         let sy = CharaSelectDict[IdleNumberFrame[i-1]["Name"]]["y"]
//         console.log(sx,sy);
//         t_canvas_ctx.drawImage(CharaSelectTexture,0,0,512,1024,0,0,512,1024);
//         IdleAniCanvasCtx.clearRect(0,0,10000,1000);
//         t_canvas_ctx.beginPath();
//         t_canvas_ctx.drawImage(CharaSelectTexture,sx,sy,56,144,0,0,56,144);
//         t_canvas_ctx.closePath();
    
//     }
// },500);

// color for stat bars: red|   green|  orange but yellowish|   blue but cyanish| pink but purpleish
for(let i = 0; i<IdleNumberFrame.length;i++){
    console.log("insert into CHARA values('"+IdleNumberFrame[i]["Name"]+"','"+chara_info[i]["name"]+"','"+chara_info[i]["description"]+"',"+chara_info[i]["offense"]+","+chara_info[i]["deffence"]+","+chara_info[i]["range"]+","+IdleNumberFrame[i]["X_offset"]+","+IdleNumberFrame[i]["Y_offset"]+","+CharaSelectDict[IdleNumberFrame[i]["Name"]]["x"]+","+CharaSelectDict[IdleNumberFrame[i]["Name"]]["y"]+","+IdleNumberFrame[i]["NumberOfFrame"]+");");
}


