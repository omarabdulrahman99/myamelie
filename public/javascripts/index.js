

  


$('body').on('click', '.add', function() {
    $(".chapedits").hide();
    $(".kappa").show();
});

$('body').on('click', '.chform2', function(){
    $(".kappa").hide();
    $(".kappa2").hide();
    $(".chapedits").show();

})


$('body').on('click', '.edit', function() {
    $(".chapedits").hide();
    $(".hide").show();
});

$('body').on('click', '.remove', function(){
    $(".chapedits").hide();
    $(".hide2").show();


})


$('body').on('click', 'a#chapterLinks2', function(e){
    $(".hide").hide();
    e.preventDefault();
    var link = $(this).attr('href');
    $.get(link, function(data){
    
      $("#inputChapterNumber2").val(data.chapter[0].chapterNumber);
      $("#inputChapterTitle2").val(data.chapter[0].chapterTitle);
      $("#txtarea2").val(data.chapter[0].chapterStory);
      $("#chapid").val(data.chapter[0]._id);


    })
    
    $(".kappa2").show();

})



$('body').on('click', '.chform3', function(){
    
    $(".hide").hide();
    $(".hide2").hide();
    $(".chapedits").show();                                            

})






var type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
    radius = '20em', //distance from center
    start = -90, //shift start from 0
    $elements = $('li:not(:first-child)'),
    numberOfElements = (type === 1) ?  $elements.length : $elements.length - 1, //adj for even distro of elements when not full circle
    slice = 360 * type / numberOfElements;

$elements.each(function(i) {
    var $self = $(this),
        rotate = slice * i + start,
        rotateReverse = rotate * -1;
    
    $self.css({
    'transform': 'rotate(' + rotate + 'deg)' + 
                 ' translate(' + radius + ')' +
                 ' rotate(' + rotateReverse + 'deg)' + 
                 ' translate(-50%, -50%)'
});

    
});



/* $('.fade').on('click', function() {
   $('.centered li').each(function(i){
        $(this).delay(500 * i).fadeIn(1500)

      })
  }) */

$('.centered li:not(:first-child').each(function(i){

        
        $(this).delay(500 * i).fadeIn(1500)

      })

$('#userRole').click(function(){
    if($('#userRole').is(':checked')){
        $('#passCode').show();
    }else {
        $('#passCode').hide();
    };    
 });


/*
function getChapterLinks(chapterId) {

   var datta;

    $.ajax({
      url: chapterId
    }).done(function(data) {
  
   datta = data;
    
    });

return datta
}

*/




var banclicks = 0;




 
var datta;
var link;
var toglink;
var commentList;
var commentChap;
var likescount;
var back = [];

$( "a#chapterLinks1" ).click(function(e) {
  e.preventDefault();
  link = $(this).attr('href');

 /* var datta = $.ajax({
      url: link
    
    })
  
  dik = datta;
  
*/
 
  $('#comForm').show();
  $.get(link, function(data){
     

    toglink = link.replace('/chapterLinks', '/checktoggle')
    $.get(toglink, function(data1){

        datta = data1;
       


        if(datta.togg == true){
       
         document.getElementById("toggle-heart").checked = true;
       }else{
        document.getElementById("toggle-heart").checked = false;
       }

    

    })
    //console.log('usertype'+ data.user.role)
    commentList = data.commentList;

    commentChap = data.chapter[0]._id;

    //$("#messages").html("GOTCHYA FUCKER!");

    likescount = data.chapter[0].likes.length;
    $(".likes-count").html("");
    $(".likes-count").append(likescount);
    
    $("#messages").html("")
        for (var cl in commentList) {
            comtime = moment(commentList[cl].createdAt).fromNow();
   
           var comPic = commentList[cl].by.profile_pic;
          if(data.user){
           if(data.user.role == 'admin'){


           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form class="flatbanform">' +'<input name="untildate" class="flatpickr" type="text" placeholder="Ban until..."/>' + '<input name="reason" type="text" placeholder="Reason..." />' + '<input class="comidban" name="comid" type="hidden" />' + '<input class="adminidban" name="admin" type="hidden"/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
           $("#messages").append("<br/>"); 
           $('.flatbanform').hide();

           }else{

           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + "</div>" + "</div>");
           $("#messages").append("<br/>");

           }
           
          }else{

            $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + "</div>" + "</div>");
            $("#messages").append("<br/>");

          }
        }


        var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });

        
        
        //flatbanstartlink.click(flatbanstarts());
        $(".flatbanstart").on('click', flatbanstarts);


        
  
        
 
  

})




/*
   var c = document.getElementById("myCanvas");
   var ctx = c.getContext("2d");
   ctx.font = "30px Arial";
   ctx.fillText(data.chapter[0].chapterStory,10,50);
*/
back = [];
$('#back').hide();

});





function flatbanstarts(e){

var currform = $(this).parent().find('.flatbanform');
console.log(currform);


if(currform.is(':visible')){

  console.log(currform.is(':visible'));
  currform.hide();
}else{
  console.log(currform.is(':visible')+"dfs");
  currform.show();
}


}

//$('#back').hide();

$('#back').on('click', function(){
  
  var contentid = $('.content').attr('id');
  console.log(contentid);

  if((back[back.length-1] === contentid) || typeof contentid == "undefined" || contentid == ""){
    back.pop();
  }
   console.log(back.length);


  if(back.length <1){

    $('#back').hide();
    $("#messages").html("");
    $('#comForm').show();
        for (var cl in commentList) {
            
            var comtime = moment(commentList[cl].createdAt).fromNow();
            var comPic = commentList[cl].by.profile_pic;
        if(datta.user){
           if(datta.user.role == 'admin'){

           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
           $("#messages").append("<br/>"); 
           $('.flatbanform').hide();


           }else{

           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + "</div>" + "</div>");
           $("#messages").append("<br/>");

         }
        }else{

          $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + "</div>" + "</div>");
          $("#messages").append("<br/>");

        }  
      }

        var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });

        //flatbanstartlink.click(flatbanstarts());
        $(".flatbanstart").on('click', flatbanstarts);


  }else{

  
  

  
    var mainid = back[back.length-1];
    $("#messages").html("");
    $('#comForm').hide();

      var sen = {send: mainid}
      $.ajax({
        type: 'POST',
        url: '/findreply',
        data: sen,
        success:function(datas, textStatus, jqXHR){

              $("#messages").html("");

              var comtime = moment(datas.childm.createdAt).fromNow();
              var comPic = datas.childm.by.profile_pic;
        if(datta.user){
           if(datta.user.role == 'admin'){

            $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.childm._id + '">' + '<h3 class="comment__authorname">' + datas.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.childm.body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + datas.childm.children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
           $("#messages").append("<br/>"); 
           $('.flatbanform').hide();


           }else{

              $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.childm._id + '">' + '<h3 class="comment__authorname">' + datas.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.childm.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childm.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
              $("#messages").append("<br/>");

            }
          }else{

            $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.childm._id + '">' + '<h3 class="comment__authorname">' + datas.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.childm.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childm.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
            $("#messages").append("<br/>");

          }



              if(datas.childr.length>0){

                  
                  for(var ch in datas.childr){

                    if(datas.childr[ch] == null){
                      continue;
                    }

                     var comtimec = moment(datas.childr[ch].createdAt).fromNow();
                     var comPicc = datas.childr[ch].by.profile_pic;

                  if(datta.user){
                     if(datta.user.role == 'admin'){

                  
                     $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childr[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childr[ch].children.length + " Replies</a>" + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                     $("#messages").append("<br/>");

                     }
                     else{

                     $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childr[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childr[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                     $("#messages").append("<br/>");

                   }
                 }else{

                  $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childr[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childr[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                  $("#messages").append("<br/>");

                 }


                  }

              }

              back.pop();
              console.log(back[back.length-1]+'dis after u clicked');

        var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });

        //flatbanstartlink.click(flatbanstarts());
        $(".flatbanstart").on('click', flatbanstarts);
          
        },
        error:function(jqXHR, textStatus, errorThrown){

      
        }

      })

}




})

 $('#myModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  $.get(link, function(data){
       
       //var story = data.chapter[0].chapterStory;
  
       modal.find('.modal-title').text(data.chapter[0].chapterTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>'));
       modal.find('.modal-body').text(data.chapter[0].chapterStory.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>'));

       $('#chapid').val(data.chapter[0]._id);
       $('#comchapId').val(data.chapter[0]._id);


       
     
      //$('body').append(data);
  })
  

  
})



  $("#likeform").on("change", "input:checkbox", function(e){
    //e.preventDefault();
   /* var datta;
    $.get(link, function(data){

      
          datta = data;
      
      }) */
    

    var formdata = $('#likeform').serialize();

      $.ajax({
        type: 'POST',
        url: '/uplikes',
        data: formdata,
        success:function(data, textStatus, jqXHR){



            if(datta.user == null){
              //$("body").html(data);
              document.location.href = '/login';
      
              likescount = data.chapter.likes.length;
            }
            else{

            likescount = data.chapter.likes.length;
            $(".likes-count").html("");
            $(".likes-count").append(likescount);
    

          }
        },
        error:function(jqXHR, textStatus, errorThrown){

        
        }

      })

    })

    function banuser(){

     
      
      $(this).closest('.content').find('.adminidban').val(datta.user._id);
      var comid = $(this).closest('.content').attr('id');
      
      
      $(this).closest('.content').find('.comidban').val(comid);
      

      var formdata = $(this).closest('form').serialize();

      $.ajax({
        type: 'POST',
        url: '/banuser',
        data: formdata,
        success: function(data,textStatus, jqXHR){

          console.log('successfully banned user');


        }



      })


    }



    /*
    $('.flatban').on("click", function(e){ 
      e.preventDefault();
      console.log('flatban has been CLICKED.');
      $(this).find('.adminidban').val(datta.user._id);

      var comid = $(this).find('.comidban').parentNode.getAttribute('id');

      $(this).find('.comidban').val(comid);

      var formdata = $(this).closest('form').serialize();

      $.ajax({
        type: 'POST',
        url: '/banuser',
        data: formdata,
        success: function(data,textStatus, jqXHR){

          console.log('successfully banned user');


        }



      })


    })

*/
    $('#comForm').on("submit", function(e){
      e.preventDefault();
      var formdata = $(this).closest('form').serialize();  
  
      $.ajax({
        type: 'POST',
        url:'/add-comment',
        data: formdata,
        success: function(data, textStatus, jqXHR){
   
            if(data.user == null){
              document.location.href = '/login';
            }
            $('#rearea').val('');
            commentList = data.commentList;
        
            $("#messages").html("")
        for (var cl in commentList) {
            var comtime = moment(commentList[cl].createdAt).fromNow();

           var comPic = commentList[cl].by.profile_pic;
           
 

          if(datta.user){
           if(datta.user.role == 'admin'){

           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
           $("#messages").append("<br/>"); 
           $('.flatbanform').hide();


           }else{


           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + "</div>" + "</div>");
           $("#messages").append("<br/>");

          }
        }else{

           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + "</div>" + "</div>");
           $("#messages").append("<br/>");

        }

        } 



        var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });

        //flatbanstartlink.click(flatbanstarts());
        $(".flatbanstart").on('click', flatbanstarts);

        },
        error:function(jqXHR, textStatus, errorThrown){

        }


      })


    })


    $(".kappa").validate({
      errorElement: 'div',
      rules:{
        chapterNumber: "required",
        chapterTitle: "required",
        chapterStory: "required"

      },
      messages:{
        chapterNumber: "required",
        chapterTitle: "required",
        chapterStory: "required"
        }


      });

    /*$("button.chform").on("click", function(e){

          e.preventDefault();
          
          var formdata = $(this).closest('form').serialize();  
          $.ajax({
            type:'POST',
            url:'/add-chapters',
            data: formdata,
            success: function(data, textStatus, jqXHR){

        
            $('#inputChapterNumber').val('');
            $('#inputChapterTitle').val('');
            $('#txtadd').val('');

            },
            error: function(jqXHR, textStatus, errorThrown){
      


          })
      

    })
*/

    
    function reply1(sender){
     
        var dups = 0;
        var mainid = sender.parentNode.getAttribute('id');
       


    
      
      if(back.length > 0){
        for(var a in back){ 
    
          
          if(back[a] === mainid){
            dups++;
           
        
 
          }
        }

        if(dups>0){


        }else{
          back.push(mainid);
        }
   
      }
      else{
        back.push(mainid);
        $('#back').show();
      }


        $("#messages").html("");
        $('#comForm').hide();

      var sen = {send: mainid}
      $.ajax({
        type: 'POST',
        url: '/findreply',
        data: sen,
        success:function(datas, textStatus, jqXHR){

   

              $("#messages").html("");

              var comtime = moment(datas.childm.createdAt).fromNow();
              var comPic = datas.childm.by.profile_pic;

          if(datta.user){
            if(datta.user.role == 'admin'){

              $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.childm._id + '">' + '<h3 class="comment__authorname">' + datas.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.childm.body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + datas.childm.children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
              $("#messages").append("<br/>"); 
              $('.flatbanform').hide();


            }else{

              $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.childm._id + '">' + '<h3 class="comment__authorname">' + datas.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.childm.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childm.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
              $("#messages").append("<br/>");

            }
          }else{

            $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.childm._id + '">' + '<h3 class="comment__authorname">' + datas.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.childm.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childm.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
            $("#messages").append("<br/>");


          }

              if(datas.childr.length>0){
              
                  //console.log(datas.childr+"childrarrayREPLY1");
                  for(var ch=0;ch<datas.childr.length; ch++){

                    if(datas.childr[ch] == null){

                      continue;
                    }

                    
                     var comtimec = moment(datas.childr[ch].createdAt).fromNow();
                     var comPicc = datas.childr[ch].by.profile_pic;

                    if(datta.user){
                     if(datta.user.role == 'admin'){

                      $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childr[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childr[ch].children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                      $("#messages").append("<br/>");

                     }else{


                     $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childr[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childr[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                     $("#messages").append("<br/>");

                    }
                  }else{

                    $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childr[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childr[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                    $("#messages").append("<br/>");

                  }


                  }

              }

        var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });

        //flatbanstartlink.click(flatbanstarts());
        $(".flatbanstart").on('click', flatbanstarts);

          
        },
        error:function(jqXHR, textStatus, errorThrown){

        
        }

      })
    


        

    }

function reply2(sender){
        var dups = 0;
        var mainid = sender.parentNode.getAttribute('id');


      if(back.length>0){
         for(var a in back){

          if(back[a] === mainid){
            dups++;
             console.log('same'+back[a]+'backa '+ mainid+'mainid'+dups+' dups');
            
          }
        }

        if(dups>0){

        }else{
          back.push(mainid);
        }
      }else{
        back.push(mainid);
        $('#back').show();
      }


        $("#messages").html("");
        $('#comForm').hide();
        
      

 
    
      var sen = {send: mainid}
   
      $.ajax({
        type: 'POST',
        url:'/findreply',
        data: sen,
        success: function(data, textStatus, jqXHR){

          var comtime = moment(data.childm.createdAt).fromNow();
          var comPic = data.childm.by.profile_pic;

          
      if(datta.user){
        if(datta.user.role == 'admin'){

           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  data.childm._id + '">' + '<h3 class="comment__authorname">' + data.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ data.childm.body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + data.childm.children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + '<form id="reply2form"><input type="hidden" name="by" id="reply2comby"><input type="hidden" name="comid" id="reply2comId" ><input type="hidden" name="xxchid" id="reply2xxchid" ><textarea name="body" rows="5" cols="15" id="replyForm" form="reply2form"></textarea><button id="submitreply2" type="button" onclick="submitreply(this)">Submit Reply</button><button id="cancelreply2" type="button" onclick="cancelreply()">Cancel</button></form>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
           $("#messages").append("<br/>"); 
           $('.flatbanform').hide();


          $('#reply2comId').val(mainid);
   
          $('#reply2comby').val(datta.user._id);
     
          $('#reply2xxchid').val(commentChap);

        }else{


          $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  data.childm._id + '">' + '<h3 class="comment__authorname">' + data.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ data.childm.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + data.childm.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + '<form id="reply2form"><input type="hidden" name="by" id="reply2comby"><input type="hidden" name="comid" id="reply2comId" ><input type="hidden" name="xxchid" id="reply2xxchid" ><textarea name="body" rows="5" cols="15" id="replyForm" form="reply2form"></textarea><button id="submitreply2" type="button" onclick="submitreply(this)">Submit Reply</button><button id="cancelreply2" type="button" onclick="cancelreply()">Cancel</button></form>' + "</div>" + "</div>");
          $("#messages").append("<br/>");

          $('#reply2comId').val(mainid);
   
          $('#reply2comby').val(datta.user._id);
     
          $('#reply2xxchid').val(commentChap);

        }
      }else{

          $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  data.childm._id + '">' + '<h3 class="comment__authorname">' + data.childm.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ data.childm.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + data.childm.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + '<form id="reply2form"><input type="hidden" name="by" id="reply2comby"><input type="hidden" name="comid" id="reply2comId" ><input type="hidden" name="xxchid" id="reply2xxchid" ><textarea name="body" rows="5" cols="15" id="replyForm" form="reply2form"></textarea><button id="submitreply2" type="button" onclick="submitreply(this)">Submit Reply</button><button id="cancelreply2" type="button" onclick="cancelreply()">Cancel</button></form>' + "</div>" + "</div>");
          $("#messages").append("<br/>");

      }

          
        


          if(data.childr.length>0){
            for(var ch in data.childr){
              if(data.childr[ch] == null){
                continue;
              }

              var comtimec = moment(data.childr[ch].createdAt).fromNow();
              var comPicc = data.childr[ch].by.profile_pic;

            if(datta.user){
              if(datta.user.role == 'admin'){

                $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  data.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + data.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ data.childr[ch].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + data.childr[ch].children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
                $("#messages").append("<br/>"); 
                $('.flatbanform').hide();


              }else{


              $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  data.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + data.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ data.childr[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + data.childr[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +  "</div>" + "</div>");
              $("#messages").append("<br/>");

            }
          }else{

              $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  data.childr[ch]._id + '">' + '<h3 class="comment__authorname">' + data.childr[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ data.childr[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + data.childr[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +  "</div>" + "</div>");
              $("#messages").append("<br/>");

          }


            }

          }


          var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });

        //flatbanstartlink.click(flatbanstarts());
        $(".flatbanstart").on('click', flatbanstarts);
        }
   })
 }



function cancelreply(){

    $('#reply2form').hide();

}

function submitreply(sender){


    var formdata = $('#reply2form').serialize();

      $.ajax({
        type: 'POST',
        url: '/comreply',
        data: formdata,
        success:function(datas, textStatus, jqXHR){


          if(datta.user == null){
              //$("body").html(data);
              document.location.href = '/login';

            
            }
          

              commentList = datas.commentList;
              

              $("#messages").html("");

              var comtime = moment(datas.mainonly.createdAt).fromNow();
              var comPic = datas.mainonly.by.profile_pic;
        
        if(datta.user){
          if(datta.user.role == 'admin'){

             $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.mainonly._id + '">' + '<h3 class="comment__authorname">' + datas.mainonly.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.mainonly.body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + datas.mainonly.children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
             $("#messages").append("<br/>"); 
             $('.flatbanform').hide();


          }else{

              $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.mainonly._id + '">' + '<h3 class="comment__authorname">' + datas.mainonly.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.mainonly.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.mainonly.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
              $("#messages").append("<br/>");
            }
          }else{

            $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.mainonly._id + '">' + '<h3 class="comment__authorname">' + datas.mainonly.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.mainonly.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.mainonly.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
            $("#messages").append("<br/>");

          }

              if(datas.childs.length>0){

                  
                  for(var ch in datas.childs){

                    if(datas.childs[ch] == null){

                      continue;
                    }


                     var comtimec = moment(datas.childs[ch].createdAt).fromNow();
                     var comPicc = datas.childs[ch].by.profile_pic;

                    if(datta.user){
                     if(datta.user.role == 'admin'){

                      $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +   datas.childs[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childs[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.childs[ch].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + datas.childs[ch].children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
                      $("#messages").append("<br/>"); 
                      $('.flatbanform').hide();


                     }else{


                     $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childs[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childs[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childs[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childs[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                     $("#messages").append("<br/>");

                   }
                 }else{

                  $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childs[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childs[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childs[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childs[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                  $("#messages").append("<br/>");

                 }



                  }

              }

        var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });

        //flatbanstartlink.click(flatbanstarts());
        $(".flatbanstart").on('click', flatbanstarts);

          
        },
        error:function(jqXHR, textStatus, errorThrown){


        }

    })
}


          



  function deletecom(sender){

    var contentid = $('.content').attr('id');
    var mainid = sender.parentNode.getAttribute('id');
    var recomm;
    var grandpa;
     
    
    if(contentid == mainid){

       if(back[back.length-2] != null){

      
       grandpa = back[back.length-2];
       console.log("content=mainid")
       
     }else{
      
      console.log("grandpa0recom0 first");
      grandpa = 0;
      recomm = 0;

     }

    }else{

      if(back.length != 0){

       recomm = contentid;
       console.log(back.length);
       console.log("reached recomm = contentid");
       grandpa = 0;

      }else{

        console.log("reached recomm0");
        recomm = 0;
        grandpa = 0;

      }

       
       
    }


    var sen = {sen:mainid, sen1:contentid, recom: recomm, chap: commentChap, gr:grandpa};
    console.log(mainid + "mainidthencontentid" + contentid);
    $.ajax({
            type: 'POST',
            url:'/delete-comment',
            data: sen,
            success: function(datas, textStatus, jqXHR){


            commentList = datas.commentList;
            var only = datas.main;
            var childs = datas.childs;
            
            console.log(contentid!=mainid)

            if(back.length == 0){
                
                console.log('im in commentlist after deletion');
                console.log(commentList);
                $("#messages").html("");
              
              for (var cl in commentList) {

                

            var comtime = moment(commentList[cl].createdAt).fromNow();
            var comPic = commentList[cl].by.profile_pic;
          
          if(datta.user){
           if(datta.user.role == 'admin'){


           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form class="flatbanform">' +'<input name="untildate" class="flatpickr" type="text" placeholder="Ban until..."/>' + '<input name="reason" type="text" placeholder="Reason..." />' + '<input class="comidban" name="comid" type="hidden" />' + '<input class="adminidban" name="admin" type="hidden"/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
           $("#messages").append("<br/>"); 
           $('.flatbanform').hide();

           }else{

           $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + "</div>" + "</div>");
           $("#messages").append("<br/>");

           }
           
          }else{

            $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  commentList[cl]._id + '">' + '<h3 class="comment__authorname">' + commentList[cl].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ commentList[cl].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + commentList[cl].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' + "</div>" + "</div>");
            $("#messages").append("<br/>");

          }
        }


        var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });
            
          $(".flatbanstart").on('click', flatbanstarts);




            }else{




                $("#messages").html("");

              var comtime = moment(datas.main.createdAt).fromNow();
              var comPic = datas.main.by.profile_pic;
        
        if(datta.user){
          if(datta.user.role == 'admin'){

             $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.main._id + '">' + '<h3 class="comment__authorname">' + datas.main.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.main.body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + datas.main.children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
             $("#messages").append("<br/>"); 
             $('.flatbanform').hide();


          }else{

              $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.main._id + '">' + '<h3 class="comment__authorname">' + datas.main.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.main.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.main.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
              $("#messages").append("<br/>");
            }
          }else{

            $("#messages").append('<div class= "comment__item">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.main._id + '">' + '<h3 class="comment__authorname">' + datas.main.by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.main.body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.main.children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
            $("#messages").append("<br/>");

          }

              if(datas.childs.length>0){

                  console.log('dataschilds')
                  for(var ch in datas.childs){

                    console.log(datas.childs[ch]+'eachdataschilds');

                    if(datas.childs[ch] == null){
                      continue;
                    }

                     var comtimec = moment(datas.childs[ch].createdAt).fromNow();
                     var comPicc = datas.childs[ch].by.profile_pic;

                    if(datta.user){
                     if(datta.user.role == 'admin'){

                      $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPic + '">' + "</div>" + '<div class="content" id="' +  datas.childs[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childs[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtime + "</b>" + "<br>" + "<p>"+ datas.childs[ch].body + "</p>" +"<br>" + '<a id="reply1" href="#" onclick="reply1(this)">' + datas.childs[ch].children.length + " Replies</a>" + '<a href="#" class="flatbanstart" class="flatbanstart">Ban</a>' + '<a href="#" id="deletecom" onclick="deletecom(this)">Delete</a>' + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>' +'<form action="" class="flatbanform">' +'<input class="flatpickr" type="text" placeholder="Ban until..."/>' + '<button type="button" class="flatban" onclick="banuser.bind($(this))()">Ban Now</button>' + '</form>' + '<div id="ebolaf"></div>' + "</div>");
                      $("#messages").append("<br/>"); 
                      $('.flatbanform').hide();


                     }else{


                     $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childs[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childs[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childs[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childs[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                     $("#messages").append("<br/>");

                   }
                 }else{

                  $("#messages").append('<div class= "comment__item2">' + '<div class="infos">' + '<img src="../uploads/' + comPicc + '">' + "</div>" + '<div class="content2" id="' +  datas.childs[ch]._id + '">' + '<h3 class="comment__authorname">' + datas.childs[ch].by.name + "</h3>" + "<br>" + '<b class="comment__time">' + comtimec + "</b>" + "<br>" + "<p>"+ datas.childs[ch].body + "</p>" +"<br>" + '<a href="#" id="reply1" onclick="reply1(this)">' + datas.childs[ch].children.length + " Replies</a>" + '<a href="#" id="reply2" onclick="reply2(this)">Reply</a>'  + "</div>" + "</div>");
                  $("#messages").append("<br/>");

                 }



                  }

              }
        var element = $('.flatpickr'); 
        var date = new Date();
         
        element = element.flatpickr({
          defaultDate: date,
          enableTime: true,
          altInput: true,
          altFormat: "F j, Y H:i",
          minuteIncrement: 1
         
        });

        //flatbanstartlink.click(flatbanstarts());
        $(".flatbanstart").on('click', flatbanstarts);



            }//end of else

            //console.log(data);
            //var parent = sender.parentNode.parentNode;
            //parent.remove();



            for(var a in back){
              if(back[a] == mainid){

                back.splice(a,1);

              }
            }
    }
  })
}
