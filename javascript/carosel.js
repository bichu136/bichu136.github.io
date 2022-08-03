//data creating:
//
//
//
let data_list = [];
let caroSlider = document.getElementsByClassName("carosel-slider")[0];
let caroCounter = 0;
let caroBtns = document.getElementsByClassName('carosel-buttons-wrap')[0].children;
console.log(caroBtns)

function ChangeCarousel(cc){
    caroCounter = cc;
    for(let i = 0; i<caroSlider.children.length;i++){
        if (i == cc){
            caroSlider.children[i].classList.replace("slide-inactive","slide-active");
        }else{
            caroSlider.children[i].classList.replace("slide-active","slide-inactive");
        }
    }
    caroSlider.scrollTo({
        top: 0,
        left: caroSlider.clientWidth*caroCounter,
        behavior: 'smooth'
      });
}
function ChangeCarouselBtn(cc){
    for(let i = 0; i<caroBtns.length;i++){
        if (i == cc){
            caroBtns[i].classList.replace("caroBtn-inactive","caroBtn-active");
        }else{
            caroBtns[i].classList.replace("caroBtn-active","caroBtn-inactive");
        }
    }
    caroSlider.scrollTo({
        top: 0,
        left: caroSlider.clientWidth*caroCounter,
        behavior: 'smooth'
      });   
}
let caroselInterval = setInterval(function(){
    console.log("change carosel order:")
    // switch(caroCounter%4){
    //     case 0:
    //         caroSlider.scrollTo(caroSlider.clientWidth*caroCounter,0);
    //         break;
    //     case 1:
    //         caroSlider.scrollTo(200,0);
    //         break;
    //     case 2:
    //         caroSlider.scrollTo(400,0);
    //         break;
    //     case 3:
    //         caroSlider.scrollTo(600,0);
    //         break;
    // }
    caroCounter = (caroCounter+1)%4;
    //caroSlider.children[caroCounter].classList.replace("slide-inactive","slide-active");
    ChangeCarousel(caroCounter);
    ChangeCarouselBtn(caroCounter);
      
    
    },5000);

// make carousel slider responsive.
window.addEventListener('resize',()=>{caroSlider.scrollTo({
    top: 0,
    left: caroSlider.clientWidth*caroCounter,
    behavior: 'smooth'
  });});
// window.addEventListener('resize',()=>{console.log("second function")});

//TODO: slider button changes.


for(let i=0; i<caroBtns.length;i++){
    caroBtns[i].onmousedown = function(e){
        ChangeCarousel(i);
        ChangeCarouselBtn(i);
    }
}


