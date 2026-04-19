playSong();
changeName();
setInterval(changeName, 2000)


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