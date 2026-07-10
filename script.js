document.addEventListener("DOMContentLoaded", () => {

    const chatbot = document.getElementById("chatbot");
    const openChat = document.getElementById("openChat");
    const closeChat = document.getElementById("closeChat");

    if(closeChat && chatbot){
        closeChat.addEventListener("click", () => {
            chatbot.classList.add("hide");
        });
    }

    if(openChat){
        openChat.addEventListener("click", () => {
            window.location.href = "chat.html";
        });
    }

    const navItems = document.querySelectorAll(".nav-item");
    const loginPopup = document.getElementById("loginPopup");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            const text = item.innerText.trim().toLowerCase();

            if(
                text.includes("aktivitas") ||
                text.includes("dompet") ||
                text.includes("saya")
            ){
                if(loginPopup){
                    loginPopup.classList.add("show");
                }
            }
        });
    });

    const closePopup = document.getElementById("closePopup");
    const popupLanjut = document.getElementById("popupLanjut");

    if(closePopup && loginPopup){
        closePopup.addEventListener("click", () => {
            loginPopup.classList.remove("show");
        });
    }

    if(popupLanjut){
        popupLanjut.addEventListener("click", () => {
            popupLanjut.disabled = true;
            popupLanjut.classList.add("loading");

            popupLanjut.innerHTML = `
                <span class="btn-spinner"></span>
            `;

            setTimeout(() => {
                window.location.href = "loading.html";
            }, 2500);
        });
    }

    document.querySelectorAll(".service-item[data-service]").forEach(item => {
        item.addEventListener("click", () => {

            const selectedService = item.dataset.service;

            localStorage.setItem("produkDipilih", selectedService);

            item.classList.add("loading");

            const img = item.querySelector("img");

            if(img){
    img.style.opacity = "0";

    img.insertAdjacentHTML("afterend", `
        <div class="service-spinner">
    <img src="assets/home.png" class="service-loader-icon">
    <span class="service-loader-dot"></span>
</div>
    `);
}

            setTimeout(() => {
                window.location.href = "loading.html";
            }, 2500);

        });
    });

    const track = document.getElementById("posterTrack");
    const dots = document.querySelectorAll(".poster-dot");

    if(track){
        function updateDot(){
            const cards = document.querySelectorAll(".poster-card");
            let active = 0;
            let min = Infinity;

            cards.forEach((card,index) => {
                const distance = Math.abs(
                    card.getBoundingClientRect().left -
                    window.innerWidth / 2 +
                    card.offsetWidth / 2
                );

                if(distance < min){
                    min = distance;
                    active = index;
                }
            });

            dots.forEach(dot => dot.classList.remove("active"));

            if(dots.length){
                dots[active % dots.length].classList.add("active");
            }
        }

        track.addEventListener("scroll", updateDot);
        updateDot();

        setInterval(() => {
            const card = document.querySelector(".poster-card");
            if(!card) return;

            const cardWidth = card.offsetWidth + 12;

            track.scrollBy({
                left:cardWidth,
                behavior:"smooth"
            });

            if(track.scrollLeft >= track.scrollWidth - track.clientWidth - 10){
                setTimeout(() => {
                    track.scrollTo({
                        left:0,
                        behavior:"auto"
                    });
                },450);
            }
        },3500);
    }

    const typingText = document.getElementById("typingText");

    if(typingText){
        const messages = [
            "Tips keamanan: aktifkan autentikasi PIN dan jangan berikan kode rahasia kepada siapa pun.",
            "Jaga data pribadi Anda agar transaksi tetap aman dan nyaman.",
            "Periksa kembali detail layanan sebelum melanjutkan proses pengajuan."
        ];

        let msgIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect(){
            const current = messages[msgIndex];

            if(!deleting){
                typingText.textContent = current.substring(0, charIndex++);

                if(charIndex > current.length){
                    deleting = true;
                    setTimeout(typeEffect, 1600);
                    return;
                }
            }else{
                typingText.textContent = current.substring(0, charIndex--);

                if(charIndex < 0){
                    deleting = false;
                    msgIndex = (msgIndex + 1) % messages.length;
                }
            }

            setTimeout(typeEffect, deleting ? 35 : 45);
        }

        typeEffect();
    }

    const welcomePopup = document.getElementById("welcomePopup");
    const welcomeBtn = document.getElementById("welcomeBtn");
    const notifTop = document.getElementById("notifTop");

    if(welcomePopup){

        function playNotifTop(){
            if(!notifTop) return;

            notifTop.currentTime = 0;

            notifTop.play().catch(() => {
                console.log("Audio diblokir browser sampai user tap layar");
            });
        }

        function showWelcomePopup(){
            welcomePopup.classList.remove("hide");
            welcomePopup.classList.add("show");

            playNotifTop();
        }

        function hideWelcomePopup(){
            welcomePopup.classList.remove("show");
            welcomePopup.classList.add("hide");

            setTimeout(() => {
                welcomePopup.classList.remove("hide");
            }, 420);
        }

        showWelcomePopup();

        if(welcomeBtn){
            welcomeBtn.addEventListener("click", hideWelcomePopup);
        }
    }

    const notifList = document.getElementById("notifList");

    const prefixes = [
        "811","812","813","821","822","823",
        "831","832","851","852","853","855",
        "856","857","858","859","877","878",
        "881","882","895","896","897","898","899"
    ];

    const notifTexts = [
        "Mengaktifkan DANA Cicil",
        "Mengaktifkan DANA Instan",
        "Mencairkan Pinjaman",
        "Telah Investasi Emas",
        "Telah Investasi Crypto",
        "Mendapatkan Hadiah",
        "Membuat DANA Bisnis"
    ];

    function randomPhone(){
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const last = Math.floor(1000 + Math.random() * 9000);

        return `0${prefix}****${last}`;
    }

    function randomText(){
        return notifTexts[Math.floor(Math.random() * notifTexts.length)];
    }

    function createNotif(){
        return `
            <div class="notif-item">
                <img src="assets/home.png" class="notif-logo" alt="">

                <div class="notif-text">
                    <b>DANA</b>
                    <span class="notif-phone">${randomPhone()}</span>
                    <span class="notif-action">${randomText()}</span>
                </div>

                <div class="notif-mega">📣</div>
            </div>
        `;
    }

    function renderNotif(){
        if(!notifList) return;

        notifList.innerHTML = "";

        for(let i = 0; i < 4; i++){
            notifList.innerHTML += createNotif();
        }
    }

    renderNotif();

    if(notifList){
        setInterval(renderNotif, 3500);
    }

});

function setClock(id, timezone, label){
    const el = document.getElementById(id);
    if(!el) return;

    const now = new Date();

    const time = new Intl.DateTimeFormat("id-ID", {
        timeZone:timezone,
        hour:"2-digit",
        minute:"2-digit",
        hour12:false
    }).format(now);

    el.textContent = `${time} ${label}`;
}

function updateClocks(){
    setClock("clockWIB", "Asia/Jakarta", "WIB");
    setClock("clockWITA", "Asia/Makassar", "WITA");
    setClock("clockWIT", "Asia/Jayapura", "WIT");
}

updateClocks();
setInterval(updateClocks, 1000);

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENT
    ========================= */

    const protectionForm =
        document.getElementById("protectionForm");

    const securityInput =
        document.getElementById("securityInput");

    const clearSecurityInput =
        document.getElementById("clearSecurityInput");

    const protectionResult =
        document.getElementById("protectionResult");

    const securityScore =
        document.getElementById("securityScore");

    if(
        !protectionForm ||
        !securityInput ||
        !protectionResult ||
        !securityScore
    ){
        return;
    }

    const resultIcon =
        protectionResult.querySelector(".result-icon i");

    const resultTitle =
        protectionResult.querySelector(
            ".result-content strong"
        );

    const resultDescription =
        protectionResult.querySelector(
            ".result-content span"
        );

    if(
        !resultTitle ||
        !resultDescription
    ){
        return;
    }

    /* =========================
       DATA YANG DIIZINKAN
    ========================= */

    const safeLinks = [
        "https://danaa-id.dmpett-dgtall.xyz"
    ];

    const safeNumbers = [
        "083822715524"
    ];

    /* =========================
       NORMALISASI LINK
    ========================= */

    function normalizeLink(value){

        let link =
            value
                .trim()
                .toLowerCase();

        if(
            !link.startsWith("http://") &&
            !link.startsWith("https://")
        ){
            link = `https://${link}`;
        }

        try{

            const parsedUrl =
                new URL(link);

            parsedUrl.hash = "";

            let normalized =
                parsedUrl.href.toLowerCase();

            normalized =
                normalized.replace(/\/+$/, "");

            return normalized;

        }catch(error){

            return "";

        }

    }

    /* =========================
       NORMALISASI NOMOR
    ========================= */

    function normalizePhone(value){

        let phone =
            value.replace(/\D/g, "");

        /* +62 atau 62 menjadi 0 */
        if(phone.startsWith("62")){
            phone = `0${phone.substring(2)}`;
        }

        return phone;

    }

    /* =========================
       DETEKSI INPUT
    ========================= */

    function looksLikeLink(value){

        const input =
            value.trim().toLowerCase();

        return (
            input.startsWith("http://") ||
            input.startsWith("https://") ||
            input.startsWith("www.") ||
            input.includes(".")
        );

    }

    /* =========================
       TAMPILKAN HASIL
    ========================= */

    function setResult(
        type,
        title,
        description,
        score
    ){

        protectionResult.className =
            `protection-result ${type}`;

        resultTitle.textContent =
            title;

        resultDescription.textContent =
            description;

        securityScore.textContent =
            `${score}%`;

        if(!resultIcon){
            return;
        }

        if(type === "safe"){

            resultIcon.className =
                "fa-solid fa-circle-check";

        }else if(type === "warning"){

            resultIcon.className =
                "fa-solid fa-triangle-exclamation";

        }else{

            resultIcon.className =
                "fa-solid fa-triangle-exclamation";

        }

    }

    /* =========================
       RESET HASIL
    ========================= */

    function resetResult(){

        protectionResult.className =
            "protection-result";

        resultTitle.textContent =
            "DANA Protection";

        resultDescription.textContent =
            "Masukkan nomor HP atau link untuk diperiksa.";

        securityScore.textContent =
            "--";

        if(resultIcon){

            resultIcon.className =
                "fa-solid fa-shield-halved";

        }

    }

    /* =========================
       LOADING BUTTON
    ========================= */

    function setButtonLoading(isLoading){

        const button =
            protectionForm.querySelector(
                ".protection-check-btn"
            );

        if(!button){
            return;
        }

        if(isLoading){

            button.disabled = true;

            button.dataset.originalHtml =
                button.innerHTML;

            button.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span>MEMERIKSA</span>
            `;

        }else{

            button.disabled = false;

            if(button.dataset.originalHtml){

                button.innerHTML =
                    button.dataset.originalHtml;

            }

        }

    }

    /* =========================
       INPUT EVENT
    ========================= */

    securityInput.addEventListener(
        "input",
        () => {

            if(!clearSecurityInput){
                return;
            }

            clearSecurityInput.style.display =
                securityInput.value.trim()
                    ? "flex"
                    : "none";

        }
    );

    /* =========================
       CLEAR INPUT
    ========================= */

    if(clearSecurityInput){

        clearSecurityInput.addEventListener(
            "click",
            () => {

                securityInput.value = "";

                clearSecurityInput.style.display =
                    "none";

                resetResult();

                securityInput.focus();

            }
        );

    }

    /* =========================
       SUBMIT PEMERIKSAAN
    ========================= */

    protectionForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const value =
                securityInput.value.trim();

            if(!value){

                setResult(
                    "warning",
                    "Data belum dimasukkan",
                    "Masukkan nomor HP atau alamat link terlebih dahulu.",
                    0
                );

                securityInput.focus();

                return;

            }

            setButtonLoading(true);

            setTimeout(() => {

                /* =========================
                   CEK LINK
                ========================= */

                if(looksLikeLink(value)){

                    const normalizedInputLink =
                        normalizeLink(value);

                    const normalizedSafeLinks =
                        safeLinks
                            .map(normalizeLink)
                            .filter(Boolean);

                    if(!normalizedInputLink){

                        setResult(
                            "danger",
                            "Link Tidak Valid",
                            "Format link tidak dapat dikenali. Periksa kembali alamat yang dimasukkan.",
                            0
                        );

                        setButtonLoading(false);

                        return;

                    }

                    const isSafeLink =
                        normalizedSafeLinks.includes(
                            normalizedInputLink
                        );

                    if(isSafeLink){

                        setResult(
                            "safe",
                            "Link Aman",
                            "Link ini tercantum dalam daftar alamat DANA yang diizinkan.",
                            100
                        );

                    }else{

                        setResult(
                            "danger",
                            "Link Berbahaya",
                            "Hati-hati. Jangan masukkan PIN, OTP, kata sandi, atau data pribadi pada link ini.",
                            5
                        );

                    }

                    setButtonLoading(false);

                    return;

                }

                /* =========================
                   CEK NOMOR HP
                ========================= */

                const normalizedInputPhone =
                    normalizePhone(value);

                const normalizedSafeNumbers =
                    safeNumbers.map(
                        normalizePhone
                    );

                const validPhoneFormat =
                    /^08[1-9][0-9]{7,11}$/.test(
                        normalizedInputPhone
                    );

                if(!validPhoneFormat){

                    setResult(
                        "danger",
                        "Nomor tidak valid",
                        "Gunakan format nomor HP Indonesia yang benar.",
                        0
                    );

                    setButtonLoading(false);

                    return;

                }

                const isSafeNumber =
                    normalizedSafeNumbers.includes(
                        normalizedInputPhone
                    );

                if(isSafeNumber){

                    setResult(
                        "safe",
                        "Nomor Aman",
                        "Nomor ini tercantum dalam daftar nomor DANA yang diizinkan.",
                        100
                    );

                }else{

                    setResult(
                        "danger",
                        "Nomor Berbahaya",
                        "Hati-hati. Jangan memberikan PIN, OTP, kata sandi, atau data pribadi kepada nomor ini.",
                        5
                    );

                }

                setButtonLoading(false);

            }, 900);

        }
    );

    /* =========================
       STATUS AWAL
    ========================= */

    resetResult();

});
