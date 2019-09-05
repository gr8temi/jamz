
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
          location.assign("/") //redirecting to home
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
                        location.assign("/login") //redirecting to home
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