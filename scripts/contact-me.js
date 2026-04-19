let changeTitle = function(){
    document.title = "Contact " + myName(numberParse(currentName))
}
changeName();
let changeNameStuff = function(){
    changeName();
    changeTitle();
}
customPlaySong = async function(){
    song = document.getElementById("song");
    song.volume = .25;
    if(localStorage.getItem("musicVolume")){
        song.volume = localStorage.getItem("musicVolume")
    }
    song.play().then(() => {
        changeNameStuff();
        nameChange = setInterval(changeNameStuff, 1500)
        console.log("Playback started successfully!");
    })
    .catch((error) => {
        console.error("Playback failed:", error.name, error.message);
        $("body").append("<div id='music-popup'>You have autoplay turned off! Click anywhere for music! :3</div>")
        setTimeout(animateMusicPopup,100);
        $('body').on("click", function(){
            changeNameStuff();
            nameChange = setInterval(changeNameStuff, 1500)
            $("#music-popup").css("transform","translateY(-100px)")
            setTimeout($("#music-popup").remove,1000);
            song.play();
            $('body').off("click");
    })
  });
}
customPlaySong();
song.addEventListener("ended", function(){
    clearInterval(nameChange);
    song.currentTime = 0;
    song.play().then(() => {
        changeNameStuff();
        setInterval(changeNameStuff(), 1500)
        console.log("Playback started successfully!");
    })
    console.log("ended");
});

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    $("input").css("width","150px")
}