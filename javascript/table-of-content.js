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
        var link = document.createElement('a');
        link.setAttribute('href','#'+root.children[i].element.id)
        li.appendChild(link)
        link.innerHTML =  root.children[i].element.innerHTML
        r.appendChild(li);
        if (root.children[i].children.length>0){
            r.appendChild(test(root.children[i]))
        }
    }
    return r;
}

document.getElementById('table-of-content').appendChild(test(root))


