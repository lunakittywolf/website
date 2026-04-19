

animateMusicPopup = function(){
    $("#music-popup").css("transform","translateY(0px)");
}

playSong = async function(){
    song = document.getElementById("song");
    song.volume = .25;
    if(localStorage.getItem("musicVolume")){
        song.volume = localStorage.getItem("musicVolume")
    }
    song.play().then(() => {
        console.log("Playback started successfully!");
    })
    .catch((error) => {
        console.error("Playback failed:", error.name, error.message);
        $("body").append("<div id='music-popup'>You have autoplay turned off! Click anywhere for music! :3</div>")
        setTimeout(animateMusicPopup,100);
        $('body').on("click", function(){
            $("#music-popup").css("transform","translateY(-100px)")
            setTimeout($("#music-popup").remove,1000);
            song.play();
            $('body').off("click");
    })
  });
}

playSound = function(name){
    if(!document.getElementById(name)){
        $("body").append(`<audio id="${name}" src="sounds/${name}.mp3"></audio>`);
    }else{
        $(`#${name}`).attr("src",`sounds/${name}.mp3`)
    }
    sound = document.getElementById(name);
    sound.volume = .25;
    if(localStorage.getItem("soundVolume")){
        sound.volume = localStorage.getItem("soundVolume")
    }
    return new Promise(res=>{
        sound.play()
        sound.onended = res
    })
}