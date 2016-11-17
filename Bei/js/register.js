$(function(){
	
	
	
	var x;
	var isMove = false;
	var handler = $("#drag").find('.handler');
    var drag_bg = $("#drag").find('.drag_bg');
    var text = $("#drag").find('.drag_text');
    var maxWidth = $("#drag").width() - handler.width();  //能滑动的最大间距
    
	//鼠标按下时候的x轴的位置
	handler.mousedown(function(e){
		isMove = true;
		x = e.pageX - parseInt(handler.css('left'), 10);
	})
	var isDrag = false;
	//鼠标移动
    $(document).mousemove(function(e){
        var _x = e.pageX - x;
        if(isMove){
            if(_x > 0 && _x <= maxWidth){
                handler.css({'left': _x});
                drag_bg.css({'width': _x});
            }else if(_x > maxWidth){
                dragOk();
                isDrag = true;
            }
        }
    //鼠标抬起
    }).mouseup(function(e){
        isMove = false;
        var _x = e.pageX - x;
        if(_x < maxWidth){
			handler.animate({left:0});
			drag_bg.animate({width:0});
        }
    });
    
    //清空事件 图片验证事件
    function dragOk(){
        handler.removeClass('handler_bg').addClass('handler_half_bg');
        $(".drag_error").hide();
        $("#drag").css({'color': '#fff'});
        handler.unbind('mousedown');
        $(document).unbind('mousemove');
        $(document).unbind('mouseup');
        $(".load").click(function(){
        	//刷新按钮
        	change();
        })
        
       change();
        
    }
    function change(){
    	var num = parseInt(Math.random()*10/3);
    	 if(num == 0){
        	text.html("<span>请点击图中的<b style='color:yellow;font-weight:normal'>'胡'</b>字</span>");
        	$(".img-click").show().find("img").attr("src","images/download.jpg").click(function(e){
        		var evt = evt || event;
        		console.log(evt.offsetX); //80  100
        		console.log(evt.offsetY); //20   40
        		if((evt.offsetX>=80 && evt.offsetX<=100) && (evt.offsetY>=20&&evt.offsetY<=40)){
        			text.text("验证通过");
        			handler.removeClass('handler_half_bg').addClass('handler_ok_bg');
        			$(".img-click").hide();
        			$(".img-click").find("span").hide();
        		}else{
        			change();
        			$(".img-click").find("span").show();
        		}
        	});
        }else if(num == 1){
        	text.html("<span>请点击图中的<b style='color:yellow;font-weight:normal'>'手'</b>字</span>")
        	$(".img-click").show().find("img").attr("src","images/9k4OA==.jpg").click(function(e){
        		var evt = evt || event;
        		console.log(evt.offsetX); //10  30
        		console.log(evt.offsetY); //115 135
        		if((evt.offsetX>=10 && evt.offsetX<=30) && (evt.offsetY>=115&&evt.offsetY<=135)){
        			text.text("验证通过");
        			handler.removeClass('handler_half_bg').addClass('handler_ok_bg');
        			$(".img-click").hide();
        			$(".img-click").find("span").hide();
        		}else{
        			change();
        			$(".img-click").find("span").show();
        		}
        	});
        	
        }else{
        	text.html("<span>请点击图中的<b style='color:yellow;font-weight:normal'>'厌'</b>字</span>")
        	$(".img-click").show().find("img").attr("src","images/2WUz.jpg").click(function(e){
        		var evt = evt || event;
        		console.log(evt.offsetX); //110  135
        		console.log(evt.offsetY); //110  130
        		if((evt.offsetX>=110 && evt.offsetX<=135) && (evt.offsetY>=110&&evt.offsetY<=130)){
        			text.text("验证通过");
        			handler.removeClass('handler_half_bg').addClass('handler_ok_bg');
        			$(".img-click").hide();
        			$(".img-click").find("span").hide();
        		}else{
        			change();
        			$(".img-click").find("span").show();
        		}
        	});
        }        
    }
    
    
    
    //===============手机号验证=================
    
	var cook = $.cookie("userNumber");
    if(cook){
    	$("#number").val(cook);
    	$(".cookies").append("<p>"+cook+"</p>");
	}
  
    
   $("#number").focus(function(){
    	if(cook){
    		$(".cookies").show().find("p").click(function(){
    			$("#number").val(cook);
    			$(".cookies").hide();
    			$(".number_error").hide();
    		})
    	}
    }).blur(function(){
    	if($("#number").val() != $.cookie("userNumber")){
    		$(".number_error").show();
    	}else{
    		$(".number_error").hide();
    	}
    })
    
    //===============密码验证================
    var isPas = false;
    $("#password").blur(function(){
    	var pas = $(this).val();
    	if(pas == ""  || pas != $.cookie("userPassword")){
    		$(".password_error").show();
    	}
    	else{
    		$(".password_error").hide();
    		isPas = true;
    	}
    })
    
    
    
    
    //=======登录按钮点击==========
    $("#btn").click(function(){
    	
	    //==============拖动验证==================
	    if(!isDrag){
	    	$(".drag_error").show();
	    }else{
	    	$(".drag_error").hide();
	    	if(isPas){
	    		$.cookie("flag",1,{expris:7});
	    		location.href = "index.html";
	    	}
	    }
    	
		
	})
        
	
})




