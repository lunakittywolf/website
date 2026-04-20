
let heyTrigger = function(){
    console.log("Hey!")
    $("#testSound").on("click",function(){
        $("#settings").addClass("dancing")
        setTimeout(function(){
            $("#settings").removeClass("dancing");
        },500)
    })
    setTimeout(function(){
        $("#testSound").off("click");
        $("#testSound").on("click",function(){
            playSound("Hey")
        })
    },500)
}


let startHeyCheck = function(){
    setTimeout(function(){
        let times = 0;
        heyCheck = setInterval(function(){
            times++;
            console.log(times)
            if(times>7){
                clearInterval(heyCheck);
                times = 0;
                heyCheck = setInterval(function(){
                    heyTrigger();
                    times++
                    if(times>13){
                        clearInterval(heyCheck);
                        heyCheck = setTimeout(function(){
                            heyTrigger();
                        },14000)
                    }
                },1000)
            }
            heyTrigger();
        },8000)

    },7400)
}

customPlaySong = async function(){
    song = document.getElementById("song");
    song.volume = .25;
    if(localStorage.getItem("musicVolume")){
        song.volume = localStorage.getItem("musicVolume")
    }
    song.play().then(() => {
        startHeyCheck();
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
            startHeyCheck();
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
    clearInterval(heyCheck);
    song.currentTime = 0;
    song.play().then(() => {
        startHeyCheck();
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