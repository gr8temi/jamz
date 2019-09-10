$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fa fa-caret-left'></i>",
      "<i class='fa fa-caret-right'></i>"
    ],
    autoplay: false,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });

  let icon = $('#song');
  icon.click( (e)=>{
    if ($(e.target).hasClass('like-icon') || $(e.target).hasClass('liked')){

      if($(e.target).hasClass('liked')) {
        $(e.target)["0"].outerHTML='<svg class="sidebar__icon like-icon"><use xlink:href="/static/img/sprite.svg#icon-heart-outlined"></use>';
    }
    
    else{
      $(e.target)["0"].outerHTML='<svg class="sidebar__icon like-icon liked"><use class="liked" xlink:href="/static/img/sprite.svg#icon-heart"></use>';
    }

    }
  })

  // const rangeDiv = document.querySelector('#range');
  // const sliderDiv = document.querySelector('#slider2')
  // let percent = 0;

  // let timer = setInterval(() => {
  //   if(percent === 100){
  //     clearInterval(timer);
  //   }

  //   sliderDiv.style.width = `${percent}%`;
  //   percent +=0.5;
  // }, 1000);
  

  // Click function for show the Modal

