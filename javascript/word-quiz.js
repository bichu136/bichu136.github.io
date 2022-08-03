//----------------GET HTML COMPONENT------------------------//
let choices = document.getElementsByClassName("_ans");
let correct_screen = document.getElementById("result");
let answers_div = document.getElementById("answers");
let result_word = document.getElementById("correct_word");
let correct_answers = document.getElementById("correct_answers");
let word_div = document.getElementById("word")
let type_divs = document.getElementsByClassName("_type");
let title_screen_div = document.getElementById("title_screen");
let the_game_div = document.getElementById("the_game");
let result=null
// let word_index
// let missleading_1
// let missleading_2
// let position_1
// let position_2
// let correct_position

let verb=[]
let keiyoushi=[]
let keiyodoshi=[]
let noun = []
let fukushi = []
for (var i=0;i<_type.length;i++){
    var types_of_word = _type[i].split('/')
    if(types_of_word.includes("verb")){
        verb.push(i)
        console.log(types_of_word)
    }
    if(types_of_word.includes("keiyodoshi")){
        keiyodoshi.push(i)
    }
    if(types_of_word.includes("keiyoushi")){
        keiyoushi.push(i)
    }
    if(types_of_word.includes("noun")){
        noun.push(i)
    }
    if(types_of_word.includes("fukushi")){
        fukushi.push(i)
    }
}
let list_of_index

let correct_string
for(var i= 0; i <choices.length;i++){
    choices[i].onclick = function(event){console.log("in click event");event.target.textContent== result ? view_result_screen(true):view_result_screen(false);setTimeout(hide_result_screen,5000);};
}
for(var i= 0; i <type_divs.length;i++){
    type_divs[i].onclick = function(event){set_type(event.target.textContent)};
}
function set_type(str_type){
    console.log(str_type)
    if(str_type == "verb"){
        list_of_index = verb
    }
    if(str_type == "keiyodoshi"){
        list_of_index = keiyodoshi
    }
    if(str_type == "keiyoushi"){
        list_of_index = keiyoushi
    }
    if(str_type == "noun"){
        list_of_index = noun
    }
    if(str_type=="fukushi"){
        list_of_index = fukushi
    }
    next_stage()
    title_screen_div.style.visibility="hidden";
    the_game_div.style.visibility=null;

};
function hide_result_screen(){
    console.log("in hide_result")
    word_div.style.filter = null;
    answers_div.style.filter = null;
    correct_screen.style.visibility="hidden";
    next_stage()
}

function view_result_screen(answers){
    console.log("in view result")
    word_div.style.filter = "blur(5px)";
    answers_div.style.filter = "blur(5px)";
    get_surrounding_image(answers);
    correct_screen.style.visibility=null;
    let return_string = answers? "correct": "failed";
    // let correct_string = correct_kanji+"|"+correct_spell+"|"+correct_meaning+"|"+correct_type ;
    result_word.textContent =return_string;
    correct_answers.textContent =correct_string;
    
    
}


//----------------SCREEN RESULT-------------------------------//
function get_surrounding_image(answers){
    var top_left_div     = document.getElementById("image-top-left");
    var top_right_div    = document.getElementById("image-top-right");
    var top_div          = document.getElementById("image-top");
    var left_div         = document.getElementById("image-left");
    var right_div        = document.getElementById("image-right");
    var bottom_left_div  = document.getElementById("image-bottom-left");
    var bottom_right_div = document.getElementById("image-bottom-right");
    var bottom_div       = document.getElementById("image-bottom");
    var arr = [top_left_div,top_div,top_right_div,left_div,right_div,bottom_left_div,bottom_div,bottom_right_div];
    var i=0;

    if (answers){
        var list_image = correct_image;
    }
    else{
        var list_image = failed_image;
    }
    while (i<arr.length){
        arr[i].children[0].src = list_image[get_random_number(list_image.length)];
        i+=1;
    }
}


//----------------------GENERATE TEST---------------------//

//all variable from html script
//meaning
//spell
//_type
//kanji
//correct_image
//failed_image


function get_random_number(max){
     return Math.floor(Math.random()*max);
}

let used_words = []
//  random word index
function get_next_word()
{
    if (list_of_index==null){
        return null
    }
    var _word_index = Math.floor(Math.random()*list_of_index.length);
    
    if (used_words.length>=list_of_index.length){}
    while (used_words.includes(_word_index)){_word_index = Math.floor(Math.random()*list_of_index.length)}
    // get correct word
    let word_index = list_of_index[_word_index]
    console.log(_type[word_index])
    var correct_type = _type[word_index];
    var missleading_index_1 = Math.floor(Math.random()*list_of_index.length);
    while (missleading_index_1 == _word_index){missleading_index_1 = Math.floor(Math.random()*list_of_index.length);}
    missleading_index_1 = list_of_index[missleading_index_1]
    var missleading_index_2 = Math.floor(Math.random()*list_of_index.length);
    while (missleading_index_2 == _word_index){missleading_index_2 = Math.floor(Math.random()*list_of_index.length);}
    missleading_index_2 = list_of_index[missleading_index_2]
    var position_1 = Math.floor(Math.random()*3);
    var position_2 = Math.floor(Math.random()*3);
    while (position_2 == position_1){position_2 = Math.floor(Math.random()*3);}
    var correct_position = 3-position_1-position_2;
    used_words.push(word_index);
    return [word_index,missleading_index_1,missleading_index_2,correct_position,position_1,position_2]
}
function next_stage(){
    let t = get_next_word()
    if (t==null){
        return
    }
    let word_index = t[0]
    let missleading_1 = t[1]
    let missleading_2 = t[2]
    let position_1 = t[4]
    let position_2 = t[5]
    let correct_position=t[3]
    correct_string = kanji[word_index]+" | "+meaning[word_index]+" | "+spell[word_index]
    result = meaning[word_index];

    word_div.textContent = kanji[word_index]
    for(var i= 0; i <choices.length;i++){
    if (i == position_1){
        choices[i].textContent = meaning[missleading_1]
    }
    if (i == position_2){
        choices[i].textContent = meaning[missleading_2]
    }
    if (i == correct_position){
        choices[i].textContent = result
    }
    }
}


//----------------- CHECK ANSWERS------------------------//

// result = meaning[word_index];

// word_div.textContent = kanji[word_index]
// for(var i= 0; i <choices.length;i++){
// if (i == position_1){
//     choices[i].textContent = meaning[missleading_1]
// }
// if (i == position_2){
//     choices[i].textContent = meaning[missleading_2]
// }
// if (i == correct_position){
//     choices[i].textContent = result
// }
// }