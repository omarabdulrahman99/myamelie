var min_x = 0;
var max_x = $(window).width()-500;
var min_y = 0;
var max_y = $(window).height()-50;
var filled_areas = new Array();


setTimeout(function(){

$('.word').each(function() {
    var rand_x=0;
    var rand_y=0;
    var area;
    do {
        rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
        rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));
        area = {x: rand_x, y: rand_y, width: $(this).width(), height: $(this).height()};
    } while(check_overlap(area));
    
    filled_areas.push(area);
    
    rand_x = '50%';
    rand_y = '55%';

    $(this).css({left:rand_x, top: rand_y});
     var $this = $(this);
        $this.before('<div>&nbsp;</div>');
        setTimeout(function(){ 
            $this.prev().remove(); 
            $this.fadeIn(Math.floor(Math.random()*8500)); 
        }, Math.floor(Math.random()*5500));


});

},20000)







function check_overlap(area) {
    for (var i = 0; i < filled_areas.length; i++) {
        
        check_area = filled_areas[i];
        
        var bottom1 = area.y + area.height;
        var bottom2 = check_area.y + check_area.height;
        var top1 = area.y;
        var top2 = check_area.y;
        var left1 = area.x;
        var left2 = check_area.x;
        var right1 = area.x + area.width;
        var right2 = check_area.x + check_area.width;
        if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
            continue;
        }
        return true;
    }
    return false;


}




WebFontConfig = {
    google: { families: [ 'Loved+by+the+King::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })(); 


 //$(".fancy_title p").lettering();

// get 2D context
    var ctx = document.querySelector("canvas").getContext("2d"),
    
        // dash-length for off-range
        dashLen = 500,
        
        // we'll update this, initialize
        dashOffset = dashLen,
        dashOffset2 = dashLen,
        
        // some arbitrary speed
        speed = 100,
        
        // the text we will draw
        txt = " I'd like to meet you. Hi. My name is Amelie",
        txt2 = "Kappa you ",
        
        // start position for x and iterator
        x = 200, i = 0, j=0;

// Comic Sans?? Let's make it useful for something ;) w/ fallbacks
    ctx.font = "40px 'Great Vibes' "; 
    
    // thickness of the line
    ctx.lineWidth = 1; 
    
    // to avoid spikes we can join each line with a round joint
    //ctx.lineJoin = "round";
    
    // increase realism letting background (f.ex. paper) show through
    ctx.globalAlpha = 2/3;
    
    // some color, lets use a black pencil
    ctx.strokeStyle = ctx.fillStyle = "#FFF";




function loop() {
      // clear canvas for each frame
      ctx.clearRect(x, 0, 0, 0);
      
      // calculate and set current line-dash for this char
      ctx.setLineDash([0,400]); //dashLen - dashOffset, dashOffset - speed
      
      // reduce length of off-dash
      dashOffset -= speed;
      
      // draw char to canvas with current dash-length
      ctx.strokeText(txt[i], x, 90);
      console.log(dashOffset);
      // char done? no, the loop
      if (dashOffset > 0) requestAnimationFrame(loop);
      else {
      console.log(txt[i]);
        // ok, outline done, lets fill its interior before next
        ctx.fillText(txt[i], x, 90);
        
        // reset line-dash length
        dashOffset = dashLen;
        
        // get x position to next char by measuring what we have drawn
        // notice we offset it a little by random to increase realism
        x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
        
        // lets use an absolute transform to randomize y-position a little
        ctx.setTransform(1, 0, 0, 1, 200, 200); //3 * Math.random()
        
        // and just cause we can, rotate it a little too to make it even
        // more realistic
        ctx.rotate(Math.random() * 0.00);
        
        // if we still have chars left, loop animation again for this char
        if (i < txt.length) requestAnimationFrame(loop);
      }

    };  // just to self-invoke the loop

loop();


function loop2() {

      // clear canvas for each frame
      ctx.clearRect(0, 0, 0, 0);
      
      // calculate and set current line-dash for this char
      ctx.setLineDash([0,400]); //dashLen - dashOffset, dashOffset - speed
      
      // reduce length of off-dash
      dashOffset -= speed;
      
      // draw char to canvas with current dash-length
      ctx.strokeText(txt2[i], x, 90);
      
      // char done? no, the loop
      if (dashOffset > 0) requestAnimationFrame(loop2);
      else {
      
        // ok, outline done, lets fill its interior before next
        ctx.fillText(txt2[i], x, 90);
        
        // reset line-dash length
        dashOffset = dashLen;
        
        // get x position to next char by measuring what we have drawn
        // notice we offset it a little by random to increase realism
        x += ctx.measureText(txt2[i++]).width + ctx.lineWidth * Math.random();
        
        // lets use an absolute transform to randomize y-position a little
        ctx.setTransform(1, 0, 0, 1, 170, 170); //3 * Math.random()
        
        // and just cause we can, rotate it a little too to make it even
        // more realistic
        ctx.rotate(Math.random() * 0.00);
        
        // if we still have chars left, loop animation again for this char
        if (i < txt2.length) requestAnimationFrame(loop2);
      }

    };  // just to self-invoke the loop

  setTimeout(function(){

    ctx.clear();
    ctx = document.querySelector("canvas").getContext("2d"),
    
        // dash-length for off-range
        dashLen = 500,
        
        // we'll update this, initialize
        dashOffset = dashLen,
        dashOffset2 = dashLen,
        
        // some arbitrary speed
        speed = 100,
        
        // the text we will draw
        txt = "I'd like to meet you. Hi. My name is Amelie",
        txt2 = " One day this strange young boy approached me ",
        
        // start position for x and iterator
        x = 200, i = 0, j=0;

// Comic Sans?? Let's make it useful for something ;) w/ fallbacks
    ctx.font = "40px 'Great Vibes' "; 
    
    // thickness of the line
    ctx.lineWidth = 1; 
    
    // to avoid spikes we can join each line with a round joint
    //ctx.lineJoin = "round";
    
    // increase realism letting background (f.ex. paper) show through
    ctx.globalAlpha = 2/3;
    
    // some color, lets use a black pencil
    ctx.strokeStyle = ctx.fillStyle = "#FFF";
    loop2();


  },5000);


function loop3() {

      // clear canvas for each frame
      ctx.clearRect(0, 0, 0, 0);
      
      // calculate and set current line-dash for this char
      ctx.setLineDash([0,400]); //dashLen - dashOffset, dashOffset - speed
      
      // reduce length of off-dash
      dashOffset -= speed;
      
      // draw char to canvas with current dash-length
      ctx.strokeText(txt3[i], x, 90);
      
      // char done? no, the loop
      if (dashOffset > 0) requestAnimationFrame(loop3);
      else {
      
        // ok, outline done, lets fill its interior before next
        ctx.fillText(txt3[i], x, 90);
        
        // reset line-dash length
        dashOffset = dashLen;
        
        // get x position to next char by measuring what we have drawn
        // notice we offset it a little by random to increase realism
        x += ctx.measureText(txt3[i++]).width + ctx.lineWidth * Math.random();
        
        // lets use an absolute transform to randomize y-position a little
        ctx.setTransform(1, 0, 0, 1, 370, 50); //3 * Math.random()
        
        // and just cause we can, rotate it a little too to make it even
        // more realistic
        ctx.rotate(Math.random() * 0.00);
        
        // if we still have chars left, loop animation again for this char
        if (i < txt3.length) requestAnimationFrame(loop3);
      }

    };  // just to self-invoke the loop

  setTimeout(function(){

    ctx.clear();
    ctx = document.querySelector("canvas").getContext("2d"),
    
        // dash-length for off-range
        dashLen = 500,
        
        // we'll update this, initialize
        dashOffset = dashLen,
        dashOffset2 = dashLen,
        
        // some arbitrary speed
        speed = 100,
        
        // the text we will draw
        txt = "I'd like to meet you. Hi. My name is Amelie",
        txt2 = " One day this strange young boy approached me ",
        txt3 = " Ever since my entire life has changed "
        
        // start position for x and iterator
        x = 200, i = 0, j=0;

// Comic Sans?? Let's make it useful for something ;) w/ fallbacks
    ctx.font = "40px 'Great Vibes' "; 
    
    // thickness of the line
    ctx.lineWidth = 1; 
    
    // to avoid spikes we can join each line with a round joint
    //ctx.lineJoin = "round";
    
    // increase realism letting background (f.ex. paper) show through
    ctx.globalAlpha = 2/3;
    
    // some color, lets use a black pencil
    ctx.strokeStyle = ctx.fillStyle = "#FFF";
    loop3();


  },10000);


 function loop4() {

      // clear canvas for each frame
      ctx.clearRect(0, 0, 0, 0);
      
      // calculate and set current line-dash for this char
      ctx.setLineDash([0,400]); //dashLen - dashOffset, dashOffset - speed
      
      // reduce length of off-dash
      dashOffset -= speed;
      
      // draw char to canvas with current dash-length
      ctx.strokeText(txt4[i], x, 90);
      
      // char done? no, the loop
      if (dashOffset > 0) requestAnimationFrame(loop4);
      else {
      
        // ok, outline done, lets fill its interior before next
        ctx.fillText(txt4[i], x, 90);
        
        // reset line-dash length
        dashOffset = dashLen;
        
        // get x position to next char by measuring what we have drawn
        // notice we offset it a little by random to increase realism
        x += ctx.measureText(txt4[i++]).width + ctx.lineWidth * Math.random();
        
        // lets use an absolute transform to randomize y-position a little
        ctx.setTransform(1, 0, 0, 1, 200, 200); //3 * Math.random()
        
        // and just cause we can, rotate it a little too to make it even
        // more realistic
        ctx.rotate(Math.random() * 0.00);
        
        // if we still have chars left, loop animation again for this char
        if (i < txt4.length) requestAnimationFrame(loop4);
      }

    };  // just to self-invoke the loop

  setTimeout(function(){

    ctx.clear();
    ctx = document.querySelector("canvas").getContext("2d"),
    
        // dash-length for off-range
        dashLen = 500,
        
        // we'll update this, initialize
        dashOffset = dashLen,
        dashOffset2 = dashLen,
        
        // some arbitrary speed
        speed = 100,
        
        // the text we will draw
        txt = "I'd like to meet you. Hi. My name is Amelie",
        txt2 = " One day this strange young boy approached me ",
        txt3 = " Ever since my entire life has changed "
        txt4 = " Follow me, but be cautious, your heart may deceive you."
        // start position for x and iterator
        x = 200, i = 0, j=0;

// Comic Sans?? Let's make it useful for something ;) w/ fallbacks
    ctx.font = "40px 'Great Vibes' "; 
    
    // thickness of the line
    ctx.lineWidth = 1; 
    
    // to avoid spikes we can join each line with a round joint
    //ctx.lineJoin = "round";
    
    // increase realism letting background (f.ex. paper) show through
    ctx.globalAlpha = 2/3;
    
    // some color, lets use a black pencil
    ctx.strokeStyle = ctx.fillStyle = "#FFF";
    loop4();


  },15000);











  $(document).ready(function() {
    $('#word3').click(function(e) {  
  
      setTimeout(function(){ 
        window.location = ('/main'); 
      }, 1000);

    });
});



CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};