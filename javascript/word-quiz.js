//----------------------GENERATE TEST---------------------//
//meaning
//spell
//_type
//kanji
let choices = document.getElementsByClassName("choice");
for(var i= 0; i <choices.length;i++){
console.log('begin');
choices[i].onclick = function(event){event.path[0].textContent== result ? console.log("correct"):console.log("failed");};
console.log(choices[i].onclick);
console.log('end');
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



