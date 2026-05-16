/* success.css */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

/* ========================= */
/* BODY */
/* ========================= */

html,
body{
    width:100%;
    min-height:100%;

    overflow:hidden;

    background:#118EEA;

    font-family:Arial,sans-serif;
}

body{
    opacity:0;

    transition:opacity .5s ease;
}

body.fade-in{
    opacity:1;
}

body.fade-out{
    opacity:0;
}

/* ========================= */
/* CONTAINER */
/* ========================= */

.container{
    width:100%;
    max-width:430px;

    margin:auto;

    min-height:100vh;

    padding-top:22px;

    text-align:center;
}

/* ========================= */
/* LOGO */
/* ========================= */

.logo-wrap{
    width:100%;

    display:flex;
    justify-content:center;

    margin-top:14px;
    margin-bottom:42px;
}

.logo{
    width:120px;

    display:block;
}

/* ========================= */
/* FOTO */
/* ========================= */

.card{
    width:100%;

    background:#fff;

    border-radius:12px;

    overflow:hidden;

    padding:10px;
}

.photo{
    width:95%;
    height:auto;

    object-fit:block;

    display:contain;

    border-radius:12px;
}


/* ========================= */
/* NOTIF */
/* ========================= */

.notif-overlay{
    position:fixed;

    top:0;
    left:0;

    width:100%;
    height:100%;

    pointer-events:none;

    z-index:9999;
}

.notif-box{
    position:absolute;

    top:18px;
    left:50%;

    width:92%;
    max-width:430px;

    transform:
    translateX(-50%)
    translateY(-180px);

    transition:.45s ease;

    opacity:0;
}

.notif-box.show{

    transform:
    translateX(-50%)
    translateY(0);

    opacity:1;
}

.notif-img{
    width:100%;

    border-radius:12px;

    display:block;
}

/* ========================= */
/* POPUP */
/* ========================= */

.popup-overlay{
    position:fixed;

    top:0;
    left:0;

    width:100%;
    height:100%;

    background:rgba(0,0,0,.45);

    display:flex;
    justify-content:center;
    align-items:center;

    opacity:0;
    visibility:hidden;

    transition:.35s ease;

    z-index:9998;
}

.popup-overlay.show{
    opacity:1;
    visibility:visible;
}

.popup-box{
    width:92%;
    max-width:430px;

    background:#fff;

    border-radius:15px;

    overflow:hidden;

    transform:scale(.8);

    opacity:0;

    transition:.35s ease;
}

.popup-overlay.show .popup-box{
    transform:scale(1);

    opacity:1;
}

.popup-img{
    width:100%;

    display:block;
}

/* ========================= */
/* BUTTON */
/* ========================= */

.btn{
    width:92%;
    height:45px;

    margin:14px auto 18px auto;

    display:block;

    border:none;
    border-radius:10px;

    background:#118EEA;

    color:#fff;

    font-size:18px;
    font-weight:700;

    cursor:pointer;
}

/* ========================= */
/* BUTTON GROUP */
/* ========================= */

.btn-group{
    display:flex;

    gap:12px;

    padding:14px 16px 18px 16px;
}

.btn-no,
.btn-yes{
    flex:1;

    height:45px;

    border:none;

    border-radius:10px;

    font-size:18px;
    font-weight:700;

    cursor:pointer;
}

.btn-no{
    background:#fff;

    border:1px solid #ddd;

    color:#444;
}

.btn-yes{
    background:#118EEA;

    color:#fff;
}

/* ========================= */
/* LOADING */
/* ========================= */

.loading-box{
    width:115px;
    height:115px;

    position:fixed;

    top:50%;
    left:50%;

    transform:translate(-50%,-50%);

    background:#083b69;

    border-radius:18px;

    display:none;

    flex-direction:column;
    justify-content:center;
    align-items:center;

    z-index:99999;
}

.loading-circle{
    width:58px;
    height:58px;

    position:relative;

    display:flex;
    justify-content:center;
    align-items:center;
}

.spinner-ring{
    width:58px;
    height:58px;

    position:absolute;

    border-radius:50%;

    border:5px solid rgba(255,255,255,.20);

    border-top:5px solid #53adff;

    animation:spin .9s linear infinite;
}

.loading-logo{
    width:35px;
    height:35px;

    position:relative;
    z-index:2;
}

.loading-text{
    margin-top:12px;

    color:#fff;

    font-size:15px;
}

/* ========================= */
/* ANIM */
/* ========================= */

@keyframes spin{

    0%{
        transform:rotate(0deg);
    }

    100%{
        transform:rotate(360deg);
    }

}
