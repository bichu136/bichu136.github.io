class StatLine{
    constructor(left,top,text,strokeStyle,width,height){
        this.left = left;
        this.top = top;
        this.text = text;
        this.strokeStyle = strokeStyle;
        this.width = width;
        this.height = height;
    }
    draw(lvl,ctx){
        let color = ["#e33714","#33f01a","#f2c327","#26a1c7","#c845d9"]
        //draw background of bar
        let gradient = ctx.createLinearGradient(this.left,this.top,this.left,this.top+30);
        gradient.addColorStop(0,"white");
        gradient.addColorStop(0.3,"rgba(50,50,50,1)");
        gradient.addColorStop(0.6,"white");
        gradient.addColorStop(1,"rgba(50,50,50,1)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.left+this.width-this.width*10/100,this.top);
        ctx.lineTo(this.left+this.width-this.width*5/100,this.top+this.height/6);
        ctx.lineTo(this.left+this.width-this.width*15/100,this.top+this.height);
        ctx.lineTo(this.left,this.top+ this.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#e33714";
        let bar_width = this.width*85/100;
        // drawbar
        for(let i=0;i<5;i++){
            if (i<lvl){
                ctx.fillStyle = color[i];
            }else{
                ctx.fillStyle="grey";
            }
            ctx.fillRect(this.left+5+i*bar_width/5,this.top+5,bar_width/5,20);
        }
        //draw icon
        for(let i=0;i<5;i++){
            if (i<lvl){
                ctx.drawImage(BlastImg,this.left-25+(i+1)*bar_width/5,this.top-10);
            }else{
                ctx.drawImage(BlastNoneImg,this.left-25+(i+1)*bar_width/5,this.top-10);
            }
        }
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = "white";
        ctx.font="25px Aerial";
        ctx.lineWidth= 0.5;
        ctx.fillText(this.text,0,this.top+this.height+20);
        ctx.strokeText(this.text,0,this.top+this.height+20);
    }
}


class DFCICharacter{
    constructor(name,description,offense,defence,range,X_offset,Y_offset,x,y,ID,NumberOfFrame){
        this.name = name;
        this.description = description;
        this.X_offset = X_offset;
        this.Y_offset = Y_offset;
        this.x = x;
        this.y = y;
        this.offense = offense;
        this.defence = defence;
        this.range = range;
        this.imgIndex = 0;
        this.Animation = this.__createListOfIdleImg(ID,NumberOfFrame);
    }
    draw(ctx,x,y){
        ctx.drawImage(this.Animation[this.imgIndex],x,y);
        this.imgIndex = (this.imgIndex+1) % this.Animation.length;

    }  
    __createListOfIdleImg(ID,NumberOfFrame){
        let result = []
        for(let i = 0;i<NumberOfFrame;i++){
            let IdleImg = document.createElement("img");
            NumOfImg +=1;
            IdleImg.src = "/assets/IdleAnimation/"+ID+"/"+i.toString()+".png";
            IdleImg.onload = (e)=>{loadedImg+=1;}
            result.push(IdleImg);
        }
        return result;
    }

}

