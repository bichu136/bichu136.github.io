let commitsRaphael = Raphael("history_of_this_page",600,600);
let x = 100;
let y = 100;
let radius = 25;
let width = 100;
let height = 75;
let circle = commitsRaphael.circle(x, y, radius);
let rectangle = commitsRaphael.rect(x+radius+20,y-height/2,width,height);
circle.attr("fill","#ffff00");
rectangle.attr("fill","#ffff00");