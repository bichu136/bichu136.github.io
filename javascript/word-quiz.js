//----------------------GENERATE TEST---------------------//
//meaning
//spell
//_type
//kanji
//correct_image
//failed_image
let choices = document.getElementsByClassName("choice");
let correct_screen = document.getElementById("finished");
let answers_div = document.getElementById("answers");
let result_word = document.getElementById("result-word");
let correct_answers = document.getElementById("correct_answers");
console.log('checking_something');
for(var i=0;i<correct_image.length;i+=1){
    console.log(correct_image[i]);
}
function get_random_number(max){
     return Math.floor(Math.random()*max);
}
function view_correct_screen(answers){

    word_div.style.filter = "blur(5px)";
    answers_div.style.filter = "blur(5px)";
    get_surrounding_image(answers);
    correct_screen.style.visibility=null;
    let return_string = answers? "correct": "failed";
    let correct_string = correct_kanji+"|"+correct_spell+"|"+correct_meaning+"|"+correct_type ;
    result_word.textContent =return_string;
    correct_answers.textContent =correct_string;
}
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
for(var i= 0; i <choices.length;i++){
choices[i].onclick = function(event){event.target.textContent== result ? view_correct_screen(true):view_correct_screen(false);};
}
let passing_words = []
//  random word index
var word_index = Math.floor(Math.random()*meaning.length);
// get correct word
var correct_meaning = meaning[word_index];
var correct_spell = spell[word_index];
var correct_kanji = kanji[word_index];
var correct_type = _type[word_index];
passing_words.push(word_index);

var missleading_index_1 = Math.floor(Math.random()*meaning.length);
while (missleading_index_1 == word_index){missleading_index_1 = Math.floor(Math.random()*meaning.length);}
var missleading_index_2 = Math.floor(Math.random()*meaning.length);
while (missleading_index_2 == word_index){missleading_index_2 = Math.floor(Math.random()*meaning.length);}
var missleading_meaning_1  = meaning[missleading_index_1];
var missleading_meaning_2  = meaning[missleading_index_2];
var position_1 = Math.floor(Math.random()*3);
var position_2 = Math.floor(Math.random()*3);
while (position_2 == position_1){position_2 = Math.floor(Math.random()*3);}
var correct_position = 3-position_1-position_2
//----------------- CHECK ANSWERS------------------------//

let result = correct_meaning
let word_div = document.getElementById("word")
word_div.textContent = correct_kanji
for(var i= 0; i <choices.length;i++){
if (i == position_1){
    choices[i].textContent = missleading_meaning_1
}
if (i == position_2){
    choices[i].textContent = missleading_meaning_2
}
if (i == correct_position){
    choices[i].textContent = result
}
}



