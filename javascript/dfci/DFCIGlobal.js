let IdleAniCanvas = document.getElementById("IdleAnimation");
let IdleAniCanvasCtx = IdleAniCanvas.getContext("2d");
let statCanvas = document.getElementById("statCanvas");
let statCanvasCtx = statCanvas.getContext("2d");
let IdleAniCanvasWrapper = document.getElementById("idle_canvas_wrapper");
let charaStat = document.getElementsByClassName("chara_stat")[0];
let scale_factor = IdleAniCanvasWrapper.offsetWidth / 1000;
let charaOrder = ["YAK","YUK","ONI","EMI","YKN","TGR","KRT","SHZ","KRN","SHA","ASU","MIS","KUR","TMK","SBM","STM","QEN","KRK","AKO","SLV"]
//all images

let NumOfImg = 0;
let loadedImg = 0;
let BlastImg = document.createElement("img");
NumOfImg +=1;
let BlastNoneImg = document.createElement("img");
NumOfImg +=1;
BlastImg.src = "/assets/IdleAnimation/BlastPoint/blast2.png";
BlastNoneImg.src = "/assets/IdleAnimation/BlastPoint/blast_none2.png";
let CharaSelectTexture = document.createElement("img");
NumOfImg +=1;
CharaSelectTexture.src = "/assets/charasele_main00.png";
IdleAniCanvas.width = IdleAniCanvasWrapper.offsetWidth;
IdleAniCanvas.height = IdleAniCanvasWrapper.offsetHeight;
statCanvas.height = charaStat.offsetHeight;
statCanvas.width = charaStat.offsetWidth;
