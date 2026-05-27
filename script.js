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
/* AUTO SLIDE POSTER */
/* ===================== */

const slides =
document.querySelectorAll(
".banner-slide"
);

let currentSlide = 0;

if(slides.length > 0){

    setInterval(()=>{

        slides[currentSlide]
        .classList.remove(
        "active"
        );

        currentSlide++;

        if(
        currentSlide >=
        slides.length
        ){
            currentSlide = 0;
        }

        slides[currentSlide]
        .classList.add(
        "active"
        );

    },2500);

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
