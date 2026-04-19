customPlaySong = async function(){
    song = document.getElementById("song");
    song.volume = .25;
    if(localStorage.getItem("musicVolume")){
        song.volume = localStorage.getItem("musicVolume")
    }
    song.play().then(() => {
        setTimeout(function(){
            changeName();
            changeName();
            nameChange = setInterval(changeName, 1000)
        },500)
        console.log("Playback started successfully!");
    })
    .catch((error) => {
        console.error("Playback failed:", error.name, error.message);
        $("body").append("<div id='music-popup'>You have autoplay turned off! Click anywhere for music! :3</div>")
        setTimeout(animateMusicPopup,100);
        $('body').on("click", function(){
            setTimeout(function(){
                changeName();
                changeName();
                nameChange = setInterval(changeName, 1000)
            },500)
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
        setTimeout(function(){
            setInterval(changeName, 1000)
        },500)
        console.log("Playback started successfully!");
    })
     console.log("ended");
});

if(localStorage.getItem("musicVolume")){
    $("#musicVolume-slider").attr("value",localStorage.getItem("musicVolume")*100)
}
if(localStorage.getItem("soundVolume")){
    $("#musicVolume-slider").attr("value",localStorage.getItem("soundVolume")*100)
}



$("#musicVolume-slider").on("change", function(){
    localStorage.setItem("musicVolume",$(this).val()/100);
    if(song){
        song.volume = localStorage.getItem("musicVolume");
    }
})

$("#soundVolume-slider").on("change", function(){
    localStorage.setItem("soundVolume",$(this).val()/100);
    if(sound){
        sound.volume = localStorage.getItem("musicVolume");
    }
})

$("#testSound").on("click", function(){
    playSound("Hey")
})