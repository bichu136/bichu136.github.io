let x = document.getElementsByClassName('post-content')
let item_to_make_table = null;
function TableOfContentTreeNode(stage,element,parent = null){
    this.children = []
    this.parent = parent;
    this.element = element;
    this.stage = stage
}
TableOfContentTreeNode.prototype.AddChild = function(node)
{
    this.children.push(node)
}
if  (x.length>0){
    item_to_make_table = x[0]
}
let l = item_to_make_table.children.length;

let i = 0;
console.log(l)
let current_stage = 0;
var parent = null;
var now = null;
root = new TableOfContentTreeNode(0);
console.log(root.children)
while(i<l){
    let tag_name = item_to_make_table.children[i].tagName
    if (tag_name[0]=="H"){
        if (current_stage == 0){
            current_stage = parseInt(tag_name[1]);
            parent = root;
            now = new TableOfContentTreeNode(current_stage,item_to_make_table.children[i],parent = root); 
            root.AddChild(now);
        }
        else
        {
            let parent_stage = now.stage
            parent = now
            current_stage = parseInt(tag_name[1])
            
            while(current_stage<=parent_stage){
                parent = parent.parent
                parent_stage = parent.stage
            }
            now = new TableOfContentTreeNode(current_stage,item_to_make_table.children[i],parent = parent); 
            parent.AddChild(now)
        }
        console.log(tag_name)
    }

    
    i+=1;
}
console.log(root)

function test(root){
    let r = document.createElement('ul');
    if (root.element==null){
    r.setAttribute('style','padding:0');
    }
    for(let i=0;i<root.children.length;i++){
        var li = document.createElement('li');
        var drop_chars = document.createElement('span');
        drop_chars.setAttribute('class','dropdown button');
        drop_chars.innerHTML = "▶";
        
        var link = document.createElement('a');
        link.setAttribute('href','#'+root.children[i].element.id)
        
        
        link.innerHTML =  root.children[i].element.innerHTML
        r.appendChild(li);
        leaf = true;
        if (root.children[i].children.length>0){
            let k = test(root.children[i])
            k.style.display = "none";
            li.appendChild(drop_chars)
            drop_chars.onclick = function(e){
                if (k.style.display =="none"){
                    k.style.display = "block";
                }
                else{
                    k.style.display = "none";
                }
            }
            li.appendChild(link)
            r.appendChild(k)
        }
        else{
            li.appendChild(link)
        }
        
        
    }
    return r;
}

document.getElementById('table-of-content').appendChild(test(root))


let ball = document.getElementsByClassName("nav-button")[0];
let ball_wrap = document.getElementById("table-of-content-button");
ball_wrap.style.bottom = "25px";
ball_wrap.style.right = "25px";
ball_wrap.classList.add('at-bottom');
ball_wrap.classList.add('at-right');
let nav_x = ball_wrap
let ball_hold_count = -1;
let table_of_content = document.getElementById("table-of-content");
let page_content = document.getElementsByClassName("post-content")[0];
console.log(page_content);
ball.onmousedown= (e)=>{
    ball_hold_count = (new Date()).getTime();
    page_content.style.userSelect = "none";
    // ball_hold_count +=1;
    // if (ball_hold_count>10)
    // //count for hold or release

    // //move the ball.
    // console.log(ball.clientWidth);
    // console.log(ball.clientHeight);
    // ball_wrap.style.top = e.clientY;
    // ball_wrap.style.left = e.clientX;   
}

function change_position(x,y,ball_wrap){
        let w = ball_wrap.clientWidth;
        let h = ball_wrap.clientHeight;
        //change left and top
        if (y >= window.innerHeight/2){
            // at bottom level=> top none, bottom change.
            console.log("at bottom")
            ball_wrap.style.bottom = window.innerHeight-(y+h/2);
            ball_wrap.style.top = "";
            ball_wrap.classList.replace('at-top','at-bottom');
            
        }else{
            // at top level => top none, bottom change.
            ball_wrap.style.bottom = "";
            ball_wrap.style.top = y-h/2;
            ball_wrap.classList.replace('at-bottom','at-top');
        }
        if (x >= window.innerWidth/2){
            console.log("go left")
            ball_wrap.style.right = window.innerWidth-(x+w/2);
            ball_wrap.style.left = "";
            ball_wrap.classList.replace('at-left','at-right');
        }else{
            ball_wrap.style.right = "";
            ball_wrap.style.left = x-w/2;
            ball_wrap.classList.replace('at-right','at-left');
        }
}

ball.onmousemove = (e)=>{
    if (ball_hold_count<0){
        return;
    }
    let b_hold = ((new Date()).getTime() - ball_hold_count)>300;
    if (b_hold){
        let x = e.clientX;
        let y = e.clientY;
        change_position(x,y,ball_wrap);
    }
}
ball.onmouseup= (e)=>{
    let b_hold = ((new Date()).getTime() - ball_hold_count)<=300;
    if (b_hold){
        table_of_content.style.display="block";
    }else{
        console.log("stop");
        //want to stop.
        // move the ball to nearest line
        if (ball_wrap.style.top !=""){
            ball_wrap.style.top = parseFloat(ball_wrap.style.top) >25 ? 25:parseFloat(ball_wrap.style.top);
        }
        if (ball_wrap.style.bottom !=""){
            ball_wrap.style.bottom = parseFloat(ball_wrap.style.bottom) >25 ? 25:parseFloat(ball_wrap.style.bottom);
        }
        if (ball_wrap.style.left !=""){
            ball_wrap.style.left = parseFloat(ball_wrap.style.left) >25 ? 25:parseFloat(ball_wrap.style.left);
        }
        if (ball_wrap.style.right !=""){
            ball_wrap.style.right = parseFloat(ball_wrap.style.right) >25 ? 25:parseFloat(ball_wrap.style.right);
        }
        console.log("ball_wrap.style.bottom =",ball_wrap.style.bottom);
        console.log("ball_wrap.style.top =",ball_wrap.style.top);
    }
    ball_hold_count = -1;
    page_content.style.userSelect = "auto";
    // ball_hold_count +=1;
    // if (ball_hold_count>10)
    // //count for hold or release

    // //move the ball.
    // console.log(ball.clientWidth);
    // console.log(ball.clientHeight);
    // ball_wrap.style.top = e.clientY;
    // ball_wrap.style.left = e.clientX;   
}
ball_wrap.onmouseleave = (e)=>{
    let b_hold = ((new Date()).getTime() - ball_hold_count)>300;
    if (ball_hold_count<0){
        
        table_of_content.style.display="none";
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
              window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
              window.getSelection().removeAllRanges();
            }
          } else if (document.selection) {  // IE?
            document.selection.empty();
          }
        ball_hold_count = -1;
        return;
    }
    if (b_hold){
        let x = e.clientX;
        let y = e.clientY;
        change_position(x,y,ball_wrap);
        // ball_wrap.style.left = x-w/2;
        // ball_wrap.style.top = y-h/2;
        return;
    }

    ball_hold_count = -1;
}



