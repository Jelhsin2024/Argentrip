const fulImgBox = document.getElementById("fulImgBox"),
fulImg = document.getElementById("fulImg");

function openFulImg(reference){
    fulImgBox.style.display = "flex"
    fulImg.src = reference
}


function closeImg(){
    fulImgBox.style.display = "none";
}


const fulVidBox = document.getElementById("fulVidBox"),
fulVid = document.getElementById("fulVid");

function openFulVid(reference){
    fulVidBox.style.display = "flex"
    fulVid.src = reference
}
function closeVid(){
    fulVidBox.style.display = "none";
}