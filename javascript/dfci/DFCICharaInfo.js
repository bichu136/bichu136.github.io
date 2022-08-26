// controll what char on screen
let current_sprite = 10;
//transition parameter
let movement = -250;
let v_movement = 75;




let offenseLine = new StatLine(0,10,"Offense","red",charaStat.offsetWidth,30);
let defenceLine = new StatLine(0,80,"Defence","green",charaStat.offsetWidth,30);
let rangeLine = new StatLine(0,150,"Range","blue",charaStat.offsetWidth,30);
function setScaleFactor(){
    let k = 0;
    k = IdleAniCanvasWrapper.offsetWidth;
    scale_factor = k / 1000;
    if (scale_factor<0.5){
        scale_factor=0.5;
    }

}
setScaleFactor();
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
    // IdleAniCanvas.width = IdleAniCanvas.width*scale_factor;
    IdleAniCanvasCtx.scale(scale_factor,scale_factor);
    // statCanvasCtx.scale(scale_factor,scale_factor);
    
    // console.log("right width",IdleAniCanvas.width*scale_factor)
    try{
        offenseLine.width = charaStat.offsetWidth;
        defenceLine.width = charaStat.offsetWidth;
        rangeLine.width = charaStat.offsetWidth;    
    } catch (error) {
        
    }
});




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
    // statCanvasCtx.clearRect(0,0,10000,1000);
    let _range = DFCICharaDict[charaOrder[current_sprite]].range;
    let _offense = DFCICharaDict[charaOrder[current_sprite]].offense;
    let _deffence = DFCICharaDict[charaOrder[current_sprite]].defence;
    
    //drawStatLine(_offense,0,10,statCanvasCtx);
    offenseLine.draw(_offense,statCanvasCtx);
    defenceLine.draw(_deffence,statCanvasCtx);
    rangeLine.draw(_range,statCanvasCtx);
}
let previous_sprite = current_sprite;
function drawLoop(){
    drawStat();
    //draw for animations
    // img_index = (img_index+1)%DFCICharaDict[charaOrder[current_sprite]].Animation.length;
    movement+=v_movement;
    if (movement>0){
        movement = 0;
    }
    
    IdleAniCanvasCtx.clearRect(0,0,10000,1000);
    //console.log(DFCICharaDict[charaOrder[current_sprite]].X_offset,DFCICharaDict[charaOrder[current_sprite]].Y_offset);
    let x = movement+DFCICharaDict[charaOrder[current_sprite]].X_offset;
    let y = DFCICharaDict[charaOrder[current_sprite]].Y_offset;
    DFCICharaDict[charaOrder[current_sprite]].draw(IdleAniCanvasCtx,x,y);
    // IdleAniCanvasCtx.beginPath();

    // IdleAniCanvasCtx.drawImage(AnimationIdles[current_sprite][img_index],movement+DBcharaInfo[charaOrder[current_sprite]]["X_offset"],DBcharaInfo[charaOrder[current_sprite]]["Y_offset"]);
    
    // IdleAniCanvasCtx.closePath();
    //---------------------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------------------------------------------------------//
    //---------------------------------------------------------------------------------------------------------------------------------------//
    //draw for stat
   
    // statCanvasCtx.strokeText("Offense",50,50);
    
    //change stat and descript to match appeared sprite.
    // document.getElementsByClassName("chara_stat")[0].textContent = chara_info[current_sprite]["name"];
    document.getElementsByClassName("chara_descript")[0].textContent = DFCICharaDict[charaOrder[current_sprite]].description;
}

let list_of_canvas = []
let loaded_canvas = 0;
let CharaSelectWrapper = document.getElementById("chara-select-wrapper")

for(let i = 0; i<charaOrder.length;i++){

    let t_canvas = document.createElement('canvas');
    let canvas_div = document.createElement('div');
    t_canvas.width = 56;
    t_canvas.height = 144;
    canvas_div.className = "chara-select";
    canvas_div.appendChild(t_canvas);
    CharaSelectWrapper.appendChild(canvas_div);
    list_of_canvas.push(t_canvas);
    
}
// let t_canvas_ctx = t_canvas.getContext('2d');

//for somereason drawing into newly created canvas not working so we set a timer to do it after a while.

//click to choose characters to show on IdleAniCanvas and their info
let charaInfo = document.getElementById("chara_info");

for(let i = 1; i<=charaOrder.length;i++){
    CharaSelectWrapper.childNodes[i].addEventListener('click',()=>{
        current_sprite = i-1;
        movement = -250;
        charaInfo.style.left = 5000;
        let changeChara1Timeout = setTimeout(()=>{charaInfo.style.left = 0;},100);
        

    });
    

}

BlastImg.onload = (e)=>{loadedImg+=1;}
BlastNoneImg.onload = (e)=>{loadedImg+=1;}
CharaSelectTexture.onload = (e)=>{loadedImg+=1;}

function WaitLoadAssets(){
    if (loadedImg<NumOfImg){
        
        let TO = setTimeout(WaitLoadAssets,100);
        console.log(loadedImg/NumOfImg)
    }else{
        let CharaSelectTimeout = setTimeout((e)=>{
            for(let i = 0; i<charaOrder.length;i++){
        
                let t_canvas_ctx = list_of_canvas[i].getContext("2d");
                let sx = DFCICharaDict[charaOrder[i]].x
                let sy = DFCICharaDict[charaOrder[i]].y
                IdleAniCanvasCtx.clearRect(0,0,10000,1000);
                t_canvas_ctx.beginPath();
                t_canvas_ctx.drawImage(CharaSelectTexture,sx,sy,56,144,0,0,56,144);
                t_canvas_ctx.closePath();
            
            }
            let interval = setInterval(drawLoop, (1000/60)*6);
            document.getElementsByClassName('wrap')[0].style.display = "block";
        },500);
        
    }
}
document.getElementsByClassName('wrap')[0].style.display = "none";
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
