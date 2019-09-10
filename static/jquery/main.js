
function play(song,art) {
    $("#song_id").attr('src', 'static/music/' + song)
    $(".playing").html(song+"<span class='artist'>"+art+"</span>")
}

function fav(song,fav) {

   title = song;
   favourite = fav;
//    id = song["id"];
//    album = song["album"];
//    song = song["song"]
//    console.log(fav)
    $.ajax({
        url: "/favourite",
        method: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
             title:title,
             favourite:favourite
        }),
        success: function () {
            $("#song_menu").load(location.href + " #song_menu");
            // $("#album_menu").load(location.href + "#album_menu");
        }
    })
}
$("#log_in").submit(function(e){
    e.preventDefault();
    email = $("#email").val();
    // console.log(email)
    password = $("#password").val();
    $.ajax({
      url: "/login",
      method:"POST",
      contentType: 'application/json; charset=utf-8',
      data:JSON.stringify({
        email:email,
        password:password
      }),
      success:function(data){
        if (data == true){
          location.assign("/main") //redirecting to home
        }
        else{
          $(".error_m").text(data)
          $(".alert").toggle()
          setTimeout(function(){ $('.alert').toggle() }, 3000);
        }
      }
    })

  })

  $("#sign_up").submit(function(e){
    e.preventDefault();
    name= $("#name").val();
    email = $("#email").val();
    password = $("#password").val();
    confirmation = $("#confirmation").val();

    if(email =="") {
      alert("you need to enter an email ")
    } else{
      
      $.get("/check?email=" + email, function(data) //coolects info from the server side
        
      {
        if (data == false){
          // alert("A user with that email already exists");
          $('.alert').toggle()
          setTimeout(function(){ $('.alert').toggle() }, 3000);
        } else if (data == true) {
            $.ajax({
                url: "/signup",
                method:"POST", //submitting to signup
                contentType: 'application/json; charset=utf-8',
                data:JSON.stringify({
                  name: name,
                  email:email,
                  password:password,
                  confirmation: confirmation
                }),
                success:function(data){
                    if (data == true){
                        location.assign("/main") //redirecting to home
                      }
                      else{
                        $(".error_m").text(data) //prints out error message from application.py with reference to the class error_m
                        $(".alert").toggle()
                        setTimeout(function(){ $('.alert').toggle() }, 3000);
                      }

                }
              })
          
        //   document.getElementById("sign_up").submit()
        }
      })
    }

  })
function album(album){
    let album_id = album;
    $.ajax({
        url: "/album_song",
        method: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
             album_id:album_id,
        }),
        success: function (data) {
            $(".songs-holder").html(data)
            // $("#album_menu").load(location.href + "#album_menu");
        }
    })


}
function playlist(song){
    $(".playlist_panel").toggle();
    $(".add_pla").hide()
    $("#play_add").text(song)
    
}
$(".pla_add").unbind().click(function(){
    $(".add_pla").show()
})
function plays(){
    $(".playlist_id").show()
    var checkboxes = $(".play_check");  
    var numberOfCheckedItems = 0;  
    for(var i = 0; i < checkboxes.length; i++)  
    {  
        if(checkboxes[i].checked)  
            numberOfCheckedItems++;  
    }  
    if(numberOfCheckedItems <1)  
    {  
        $(".playlist_id").hide()
        $(".playlist_panel").hide()
    }  
}

$(".playlist_id").click(function(){
    // $(".playlist_panel").toggle()
    $(".mask").addClass("active");
})

function closeModal(){
    $(".mask").removeClass("active");
  }
  
  // Call the closeModal function on the clicks/keyboard
  
  $(".close, .mask").on("click", function(){
    closeModal();
  });
  
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      closeModal();
    }
  });
 
$(".add_pla").submit(function(e){
    e.preventDefault()
    var checkboxes = $(".play_check");  
    let playlist = $("#new_play").val()
    var numberOfCheckedItems = 0;  
    let obj = []
    for(var i = 0; i < checkboxes.length; i++)  
    {  
        if(checkboxes[i].checked)  
            // console.log($(checkboxes[i]).val())  
            obj.push($(checkboxes[i]).val())
    } 
    $.ajax({
        url:"/playlist",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
             playlist:playlist,
             object:obj
        }),
        success:function(data){
            if (data == true){
                alert("working")
            }
        }
        
    })


    // if(numberOfCheckedItems <1)  
    // {  
    //     $(".playlist_id").hide()
    // } 
})

function playli(playl){
    var checkboxes = $(".play_check");  
    let playlist = playl 
    let obj = []
    for(var i = 0; i < checkboxes.length; i++)  
    {  
        if(checkboxes[i].checked)  
            // console.log($(checkboxes[i]).val())  
            obj.push($(checkboxes[i]).val())
    } 
    alert(playlist)
    $.ajax({
        url:"/playlist",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
             playlist:playlist,
             object:obj
        }),
        success:function(data){
            if (data == true){
                alert("working")
            }
        }
        
    })


    // if(numberOfCheckedItems <1)  
    // {  
    //     $(".playlist_id").hide()
    // } 
}
function songz(pla){
    let playlist = pla;

    $.ajax({
        url:"/songz",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data : JSON.stringify({
            playlist:playlist
        }),
        success:function(data){
            $(".songs-holder").html(data)
        }
    })
}
function fav_get(){
    $.get("/favourite", function(data){
        $(".songs-holder").html(data)
    })
}
function alb_get(){
    $.get("/album", function(data){
        console.log(data)
        $(".albs").html(data)
        // $(".alb_get").text("Albums")
    })
}