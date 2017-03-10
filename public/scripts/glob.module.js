define(function(require,exports,module){
    "use strick";

    var slider=require("unslider");
    var banner=$(".banner");
    var slider_opts={autoplay:true};
    banner.unslider(slider_opts);

    var un_nav=$(".unslider-nav"),
        nav_width=un_nav.width(),
        prev=$(".unslider .prev"),
        next=$(".unslider .next");
    function locate_slider(){
        var b_width=banner.width(),
            b_height=banner.height(),
            b_left=banner.offset().left;
        prev.css({"left":b_left+2,"margin-top":b_height/2-10});
        next.css({"left":b_left+b_width-next.width(),"margin-top":b_height/2-10});
        un_nav.css({"margin-top":b_height-20,"left":b_left+b_width/2-95});
    }
    locate_slider();
    $(window).on("resize",locate_slider);

    var text_anm=require("title_anm");
    var site_title = $("#site-title");
    site_title.css("color",text_anm.randomColor());
    setInterval(function(){
        site_title.css("color",text_anm.randomColor());
    },1500);

});
