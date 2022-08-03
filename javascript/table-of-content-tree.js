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