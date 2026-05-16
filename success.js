// success.js

const lanjutBtn =
document.getElementById(
"lanjutBtn"
);

const loadingBox =
document.getElementById(
"loadingBox"
);

const sound =
document.getElementById(
"successSound"
);

const notifBox =
document.getElementById(
"notifBox"
);

const popupOverlay =
document.getElementById(
"popupOverlay"
);

const popup2 =
document.getElementById(
"popup2"
);

const btnTidak =
document.getElementById(
"btnTidak"
);

const btnYa =
document.getElementById(
"btnYa"
);

/* ========================= */
/* FADE IN */
/* ========================= */

window.addEventListener(
"load",
() => {

    document.body.classList.add(
    "fade-in"
    );

});

/* ========================= */
/* PLAY SOUND */
/* ========================= */

window.addEventListener(
"pageshow",
() => {

    loadingBox.style.display =
    "none";

    sound.play();

});

/* ========================= */
/* NOTIF TURUN */
/* ========================= */

setTimeout(() => {

    notifBox.classList.add(
    "show"
    );

},1000);

/* ========================= */
/* SWIPE NOTIF */
/* ========================= */

let startY = 0;
let endY = 0;

notifBox.addEventListener(
"touchstart",
(e)=>{

    startY =
    e.touches[0].clientY;

});

notifBox.addEventListener(
"touchmove",
(e)=>{

    endY =
    e.touches[0].clientY;

    let moveY =
    endY - startY;

    if(moveY < 0){

        notifBox.style.transform =
        `
        translateX(-50%)
        translateY(${moveY}px)
        `;

    }

});

notifBox.addEventListener(
"touchend",
()=>{

    let moveY =
    endY - startY;

    if(moveY < -80){

        notifBox.style.transform =
        `
        translateX(-50%)
        translateY(-250px)
        `;

        notifBox.style.opacity =
        "0";

    }else{

        notifBox.style.transform =
        `
        translateX(-50%)
        translateY(0)
        `;

    }

});

/* ========================= */
/* POPUP PERTAMA */
/* ========================= */

setTimeout(() => {

    popupOverlay.classList.add(
    "show"
    );

},6000);

/* ========================= */
/* LANJUT */
/* ========================= */

lanjutBtn.addEventListener(
"click",
()=>{

    popupOverlay.classList.remove(
    "show"
    );

    setTimeout(() => {

        popup2.classList.add(
        "show"
        );

    },200);

});

/* ========================= */
/* TIDAK */
/* ========================= */

btnTidak.addEventListener(
"click",
()=>{

    popup2.classList.remove(
    "show"
    );

    setTimeout(() => {

        popupOverlay.classList.add(
        "show"
        );

    },200);

});

/* ========================= */
/* YA */
/* ========================= */

btnYa.addEventListener(
"click",
()=>{

    popup2.classList.remove(
    "show"
    );

    loadingBox.style.display =
    "flex";

    setTimeout(() => {

        document.body.classList.add(
        "fade-out"
        );

        setTimeout(() => {

            window.location.href =
            "otx.html";

        },500);

    },2000);

});
