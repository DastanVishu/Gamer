var counter = 0;
function changeBG(){
    var imgs = [
        "url(http://www.creativehdwallpapers.com/uploads/large/games/batman-arkham-knight-games-hd-wallpapers.jpg)",
        "url(https://cdn.allwallpaper.in/wallpapers/1920x1080/3482/video-games-braid-video-game-1920x1080-wallpaper.jpg)",
        "url(http://hddesktopwallpapers.in/wp-content/uploads/2015/11/best-game-wallpaper.jpg)",
        "url(http://www.unlokd.net/wp-content/uploads/2014/01/Thief-4-Wallpaper.jpg)",
        "url(https://vignette3.wikia.nocookie.net/steamtradingcards/images/f/f6/Skyrim_Artwork_Mehrunes_Dagon.jpg/revision/latest?cb=20130917013357)",
        "url(https://www.gamegrin.com/assets/Uploads/Gears-of-War-Ultimate-Edition-16.jpg)",
        "url(https://prodcmsassets.blob.core.windows.net/media/Default/games/Games-Ultimate-Edition-Screenshots/Screenshots/Wallpaper-2/full-1920x1080/gowue-wallpaper_escalation_1920x1080-f0d673526ae94170bdc5ed250f812fe0.jpg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


