document.addEventListener(
'gesturestart',
function(e){
    e.preventDefault();
}
);

document.addEventListener(
'touchmove',
function(e){
    e.preventDefault();
},
{ passive:false }
);

/* ===================== */
/* POSTER SLIDER */
/* AUTO + SWIPE + BUTTON */
/* ===================== */

const slides =
document.querySelectorAll(
".banner-slide"
);

const dots =
document.querySelectorAll(
".dot"
);

const prevBtn =
document.querySelector(
".prev"
);

const nextBtn =
document.querySelector(
".next"
);

let currentSlide = 0;
let startX = 0;
let endX = 0;

/* tampil slide */
function showSlide(index){

    slides.forEach(slide=>{

        slide.classList.remove(
        "active"
        );

    });

    dots.forEach(dot=>{

        dot.classList.remove(
        "active"
        );

    });

    slides[index]
    .classList.add(
    "active"
    );

    if(dots[index]){

        dots[index]
        .classList.add(
        "active"
        );

    }

}

/* ===================== */
/* AUTO SLIDE */
/* ===================== */

if(slides.length > 0){

    setInterval(()=>{

        currentSlide++;

        if(
        currentSlide >=
        slides.length
        ){
            currentSlide = 0;
        }

        showSlide(
        currentSlide
        );

    },2500);

}

/* ===================== */
/* TOMBOL NEXT */
/* ===================== */

if(nextBtn){

    nextBtn.addEventListener(
    "click",
    ()=>{

        currentSlide++;

        if(
        currentSlide >=
        slides.length
        ){
            currentSlide = 0;
        }

        showSlide(
        currentSlide
        );

    }
    );

}

/* ===================== */
/* TOMBOL PREV */
/* ===================== */

if(prevBtn){

    prevBtn.addEventListener(
    "click",
    ()=>{

        currentSlide--;

        if(
        currentSlide < 0
        ){
            currentSlide =
            slides.length - 1;
        }

        showSlide(
        currentSlide
        );

    }
    );

}

/* ===================== */
/* KLIK TITIK */
/* ===================== */

dots.forEach(
(dot,index)=>{

    dot.addEventListener(
    "click",
    ()=>{

        currentSlide =
        index;

        showSlide(
        currentSlide
        );

    }
    );

});

/* ===================== */
/* SWIPE */
/* ===================== */

const bannerBox =
document.querySelector(
".banner-box"
);

if(bannerBox){

    bannerBox.addEventListener(
    "touchstart",
    (e)=>{

        startX =
        e.touches[0]
        .clientX;

    }
    );

    bannerBox.addEventListener(
    "touchend",
    (e)=>{

        endX =
        e.changedTouches[0]
        .clientX;

        let distance =
        startX - endX;

        /* geser kiri */
        if(distance > 50){

            currentSlide++;

            if(
            currentSlide >=
            slides.length
            ){
                currentSlide = 0;
            }

            showSlide(
            currentSlide
            );

        }

        /* geser kanan */
        if(distance < -50){

            currentSlide--;

            if(
            currentSlide < 0
            ){
                currentSlide =
                slides.length - 1;
            }

            showSlide(
            currentSlide
            );

        }

    }
    );

}

/* ========================= */
/* RESET LOADING SAAT BACK */
/* ========================= */

window.addEventListener(
"pageshow",
()=>{

    const loadingBox =
    document.getElementById(
    "loadingBox"
    );

    if(loadingBox){

        loadingBox.style.display =
        "none";

    }

}
);

/* ===================== */
/* MENU CLICK */
/* ===================== */

const menuBox =
document.querySelectorAll(
".menu-box"
);

menuBox.forEach((box)=>{

    box.addEventListener(
    "click",
    ()=>{

        /* efek sentuh */
        box.style.transform =
        "scale(0.96)";

        box.style.filter =
        "brightness(0.9)";

        setTimeout(()=>{

            box.style.transform =
            "scale(1)";

            box.style.filter =
            "brightness(1)";

        },150);

        /* tampil loading */
        const loadingBox =
        document.getElementById(
        "loadingBox"
        );

        loadingBox.style.display =
        "flex";

        /* pindah halaman */
        setTimeout(()=>{

            window.location.href =
            "loading.html";

        },2000);

    }
    );

});
