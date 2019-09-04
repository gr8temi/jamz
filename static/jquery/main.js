
function play(song) {
    $("#song_id").attr('src', 'static/music/' + song)
}

function fav(song) {

   title = song;
//    id = song["id"];
//    album = song["album"];
//    song = song["song"]
   console.log(song)
    $.ajax({
        url: "/favourite",
        method: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
             title:title,
        }),
        success: function () {
            // alert("success")
        }
    })
}
