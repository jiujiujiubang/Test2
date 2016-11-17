$(function(){
	
	//===============图片获取=============
	$.get("json/cart.json",function(data){
		$.each(data, function(index,ele) {
			
			$(".thumb-cont-inner ul").append("<li data-index="+ele.dataIndex+"><a><img src='"+ele.imgSmall+"' /></a></li>");
			$(".thumb-cont-inner ul li").eq(index).click(function(){
				$(this).addClass("focus").siblings().removeClass("focus");
				$(".main-img a img").attr("src",ele.imgBig);
				$(".main-img").mouseover(function(){
					$(".bigView img").attr("src",ele.viewBig);
				})
			})
			
			$(".attr1 ul").append("<li><a><div class='thumb-box'><img src='"+ele.imgLittle+"'/></div><span>"+ele.cart+"</span><div class='current-box'></div><i class='icon-ok'></i></a></li>");
			$(".attr2 ul").append("<li><a><span>"+ele.size+"</span><div class='current-box'></div><i class='icon-ok'></i></a></li>");
			
			
			$(".attr1 ul li").eq(index).click(function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				$(this).find(".current-box,.icon-ok").show().parent().parent().siblings().find(".current-box,.icon-ok").hide();
				if(index < 4){
					$(".thumb-cont-inner ul").animate({left:0})
					$(".prev").hide();
				}
				if(index >= 4){
					$(".thumb-cont-inner ul").animate({left:-336})
					$(".prev").show();
				}
				$(".thumb-cont-inner ul li").eq(index).addClass("focus").siblings().removeClass("focus");
				$(".main-img a img").attr("src",ele.imgBig);
			})
			
			$(".attr1 ul li").eq(index).hover(function(){
				$(this).find("a").addClass("on").parent().siblings().find("a").removeClass("on");
			},function(){
				$(this).find("a").removeClass("on");
			})
			
			$(".attr2 ul li").not(".attr2 ul li:eq(2)").click(function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				$(this).find(".current-box,.icon-ok").show().parent().parent().siblings().find(".current-box,.icon-ok").hide();
			})
			
			$(".attr2 ul li").not(".attr2 ul li:eq(2)").hover(function(){
				$(this).find("a").addClass("on").parent().siblings().find("a").removeClass("on");
			},function(){
				$(this).find("a").removeClass("on");
			})
			
		});
		$(".attr2 ul li:gt(5)").hide();
		$(".attr2 ul li:eq(2)").addClass("disable");
		$(".thumb-cont-inner ul li:first").addClass("focus");
	})
	
	//===========小图片滑动=================
	$(".next").click(function(){
		$(".thumb-cont-inner ul").animate({left:-336})
		$(".prev").show();
	})
	$(".prev").click(function(){
		$(".thumb-cont-inner ul").animate({left:0})
		$(".prev").hide();
	})
	
	//=============收藏商品===============
	
	
	$(".m-you-collect a").click(function(){
		if($(".m-you-collect a").find("span").text() == "收藏商品"){
			$(this).css("color","#FF4965").find("span").text("已收藏");
		}else if($(".m-you-collect a").find("span").text() == "取消收藏"){
			$(this).css("color","#999").find("span").text("收藏商品");
			return;
		}
	})
	$(".m-you-collect a").hover(function(){
		if($(".m-you-collect a").find("span").text() == "收藏商品"){
			$(this).css("color","#FF4965");
		}else if($(".m-you-collect a").find("span").text() == "已收藏"){
			$(this).find("span").text("取消收藏"); 
		}
	},function(){
		if($(".m-you-collect a").find("span").text() == "收藏商品"){
			$(this).css("color","#999");
		}else if($(".m-you-collect a").find("span").text() == "取消收藏"){
			$(".m-you-collect a").find("span").text("已收藏");
		}
	})
	
	
	
	//尺码表
	$(".size-see").click(function(){
		$(".size-list").show();
		$(".size-mask").show();
	})
	$(".item-size-close").click(function(){
		$(".size-list").hide();
		$(".size-mask").hide();
	})
	
	//详情 倒计时
	show_time();
	
	
	//加入购物车
	$(".add-to-cart-btn").click(function(){
		var flag1 = $(".attr1 ul li").hasClass("cur");
		var flag2 = $(".attr2 ul li").hasClass("cur");
		if(!flag1 || !flag2){
			$(".attention-head").show();
			$(this).animate({left:8},{duration:100,easing:'easeOutElastic'})
			.animate({left:-8},{duration:100,easing:'easeOutElastic'})
			.animate({left:0},{duration:100,easing:'easeOutElastic'});
			$(this).find(".icon-shopping-cart").hide().siblings(".btn1").hide().siblings(".btn2").fadeIn();
			setTimeout(function(){
				$(".icon-shopping-cart").show().siblings(".btn1").show().siblings(".btn2").hide()
			},1000)
		}else{
			$(".attention-head").hide();
			$(".goPayText").show().siblings().hide();
			$(".add-to-cart-btn").addClass("goPayGreen");
			$(".continue-buy-btn").css("visibility","visible");
			
			var eventTitle = $(".con-title span").text().substring(0,5);
			var infoImg = $(".thumb-cont-inner ul").find(".focus").find("img").attr("src");
			var infoTitle = $(".con-title span").text();
			var color = $(".attr1 .attr-value").find(".cur").find("span").text();
			var size = $(".attr2 .attr-value").find(".cur").find("span").text();
			var ItemEntryPrice = $(".now-price i").text();
			var strike = $(".ago-price del").text();
			var numVal = $(".detail-number input").val();
			
			function compare(a,b){
				if(a>b){
					return 1;
				}
				else if(a<b){
					return -1
				}
				else{
					return 0;
				}
			}
			
			var index = 1;
			var cook = $.cookie();
			var arr = [];
			if(!$.isEmptyObject($.cookie())){
				for(var key in cook){
					if(key.substring(0,key.length-1) == "infoImg"){
						arr.push(parseInt(key.substring(key.length-1)));
					}
				}
				var array = arr.sort(compare());
				index = array[array.length-1]+1;
			}
			var flag = true;
			
			for(var key in cook){
				if(cook[key] == color){
					var numIndex = key.substring(key.length-1);
					if(cook["size"+numIndex] == size){
						if((parseInt($.cookie("numVal"+numIndex)) + parseInt(numVal)) <=5){
							$.cookie("numVal"+numIndex,(parseInt($.cookie("numVal"+numIndex))+parseInt(numVal)),{expires:7});
						}else{
							$(".buy-num span").show();
						}
						flag = false;
						index--;
					}
				}
			}
			if(flag){
				$.cookie("eventTitle"+index,eventTitle,{expires:7});
				$.cookie("infoImg"+index,infoImg,{expires:7});
				$.cookie("infoTitle"+index,infoTitle,{expires:7});
				$.cookie("color"+index,color,{expires:7});
				$.cookie("size"+index,size,{expires:7});
				$.cookie("ItemEntryPrice"+index,ItemEntryPrice,{expires:7});
				$.cookie("strike"+index,strike,{expires:7});
				$.cookie("numVal"+index,numVal,{expires:7});
			}
			
			
			
		}
	})
	
	$(".continue-buy-btn").click(function(){
			$(".icon-shopping-cart").show();
			$(".btn1").show();
			$(".goPayText").hide();
			$(".add-to-cart-btn").removeClass("goPayGreen");
			$(".continue-buy-btn").css("visibility","hidden");
	})
	$(".goPayText").click(function(){
		location.href = "shoppingcart.html";
	})
	
	//数量加减
	var i = $(".detail-number input").val();;
	$(".add-num1").click(function(){
		i++;
		$(".del-num1").css("background","-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee))");
		if(i < 5){
			$(".detail-number input").val(i);
		}
		
		if(i >= 5){
			$(".add-num1").css("background","-webkit-gradient(linear,left top,left bottom,from(#e0e0e0),to(#f0f0f0))");
			$(".buy-num span").show();
			$(".detail-number input").val(5);
			i = 5;
		}
	});
	$(".del-num1").click(function(){
		i--;
		$(".add-num1").css("background","-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee))");
		if(i > 1){
			$(".detail-number input").val(i);
		}
		
		if(i <=1){
			$(".del-num1").css("background","-webkit-gradient(linear,left top,left bottom,from(#e0e0e0),to(#f0f0f0))");
			$(".buy-num span").hide();
			$(".detail-number input").val(1);
			i = 1;
		}
	});
	

	
	
	
	
	//=========================放大镜========================
	//鼠标移入中图 选择器 和大图显示
	$(".main-img-hover").mouseover(mouseOver);
	//选择器事件
	$(".main-img-hover").mousemove(mouseMove).mouseout(mouseOut);
	
	function mouseOver(e){
		if ($(".imgSelector").css("display") == "none") {
            $(".imgSelector,.bigView").show();
        }
        e.stopPropagation();
	}
	function mouseMove(e){
		fixedPosition(e);
        e.stopPropagation();
	}
	function mouseOut(e){
		if ($(".imgSelector").css("display") != "none") {
            $(".imgSelector,.bigView").hide();
        }
        e.stopPropagation(e);
	}
	
//	$("#bigView").scrollLeft(0).scrollTop(0);
	function fixedPosition(e){
		var divWidth = $(".imgSelector").width();//选择器宽度
		var divHeight = $(".imgSelector").height();//选择器高度
		var imgWidth = $(".main-img-hover").width();//中图宽度
		var imgHeight = $(".main-img-hover").height();//中图高度
		if(e == null){
			return;
		}
		var imgLeft = $(".main-img-hover").offset().left;
		var imgTop = $(".main-img-hover").offset().top;
		//选择器坐标
		var X = e.pageX - imgLeft - divWidth/2;
		var Y = e.pageY - imgTop - divHeight/2;
		
		//边界判定
		X = X < 0 ? 0 : X;
		Y = Y < 20 ? 20 : Y;
		X = X + divWidth > imgWidth ? (imgWidth - divWidth):X;
		Y = Y + divHeight > imgHeight ? (imgHeight - divHeight + 20):Y;
		$(".imgSelector").css({left:X,top:Y});
        var viewImgWidth = $(".bigView img").outerWidth();
        var viewImgHeight = $(".bigView img").outerHeight();
        //大小图 比例差
        var scrollX = X * (viewImgWidth / imgWidth);
        var scrollY = Y * (viewImgHeight / imgHeight);
        //反方向
        $(".bigView img").css({ "left": scrollX * -1, "top": scrollY * -1 + 20});
		//选择器位置
//		return {left:X,top:Y};
	}
	
	$(".foot-btn-detail").click(function(){
		location.href="shoppingcart.html"
	})
	
	
	
	
	
	
})
//=============倒计时函数======================
function show_time(){
	var time_start = new Date().getTime();  //获取当前时间
	var time_end = new Date("2016-10-30 00:00:00").getTime();  //设置停止时间
	var time_distance = time_end - time_start;   //计算时间差
	// 天   时间差（毫秒数）÷3600÷24即为天数，时分秒类似
    var int_day = Math.floor(time_distance/86400000);
    time_distance -= int_day * 86400000;   //得到除去天数外剩下的时分秒  以此类推
    // 时
    var int_hour = Math.floor(time_distance/3600000);
    time_distance -= int_hour * 3600000;   
    // 分
    var int_minute = Math.floor(time_distance/60000);
    time_distance -= int_minute * 60000; 
    // 秒 
    var int_second = Math.floor(time_distance/1000);
    time_distance -= int_second * 1000;
	//毫秒
    var int_msecond = Math.floor(time_distance/100);

    // 时分秒为单数时、前面加零 
    if(int_day < 10){ 
        int_day = "0" + int_day; 
    } 
    if(int_hour < 10){ 
        int_hour = "0" + int_hour; 
    } 
    if(int_minute < 10){ 
        int_minute = "0" + int_minute; 
    } 
    if(int_second < 10){
        int_second = "0" + int_second; 
    } 
    // 显示时间 
    $(".days").text(int_day); 
    $(".hours").text(int_hour); 
    $(".minutes").text(int_minute); 
    $(".seconds").text(int_second); 
    $(".mseconds").text(int_msecond); 
    // 设置定时器
    setTimeout("show_time()",100); 
}


/*

*/