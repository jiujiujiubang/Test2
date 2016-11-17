$(function(){
	
	//==============登陆前后效果=========================
	var flag = $.cookie("flag");
	var cook2 = $.cookie("userNumber");
	//==============退出按钮点击==========================
	$(".out").click(function(){
		$.cookie("flag","");
		$(".wraper ul li:lt(7)").hide();
		$(".wraper ul li:eq(7)").show();
		location.href = "register.html";
	})
	if(flag){
		$(".userNumShow span a").text(cook2.substring(0,4)+"***"+cook2.substring(7,11));
		$(".wraper ul li:lt(7)").show();
		$(".wraper ul li:eq(7)").hide();
	}else{
		$(".wraper ul li:lt(7)").hide();
		$(".wraper ul li:eq(7)").show();
	}
	
	
	
	
	
	
	
	//===============侧边楼层导航栏======================
	var isClick = false;
	$(window).scroll(function(){
		if(isClick){
			return;
		}
		var scrollTop = $(this).scrollTop();
		if(scrollTop >= 1307 && scrollTop<=11850){
			$(".floor-nav").fadeIn();
			$(".slide-nav").hide();
			$(".floor-nav").css({"top":"37px","position":"fixed"})
		}else{
			$(".floor-nav").fadeOut();
			$(".slide-nav").show();
		}
		$(".floor").each(function(index,floor){
			if((scrollTop >= $(this).offset().top-$(this).outerHeight()/2)){
//				console.log(scrollTop, $(this).offset().top-$(this).outerHeight()/2);
				$(".floor-nav li").eq(index).addClass("hover").siblings().removeClass("hover");
			}
		})
	})
	
	$(".floor-nav li").click(function(){
		var index = $(this).index();
		var currentFloor = $(".floor").eq(index);
		var currentScrollTop = currentFloor.offset().top - ($(window).height() - currentFloor.outerHeight())/2;
		if(currentScrollTop < 0){
			currentScrollTop = 0;
		}
		$("body").stop().animate({scrollTop:currentScrollTop},function(){
			isClick = false;
		$(this).addClass("hover").siblings().removeClass("hover");
		});
	})
	$(".nav-go-top").click(function(){
		$("body").animate({scrollTop:0});
	})
	$(".go-to-top").click(function(){
		$(window).scrollTop(0);
	})
	
	
	//==========侧边信息栏====================
	$(".s-nav").hover(function(){
		$(".slide-nav").css("opacity","1");
	},function(){
		$(".slide-nav").css("opacity",".7");
	})
	$(".s-nav").eq(3).hover(function(){
		$(".icon-chevron-up").hide();
		$(".go-to-top").show();
	},function(){
		$(".icon-chevron-up").show();
		$(".go-to-top").hide();
	})
	$(".s-nav").eq(2).hover(function(){
		$(".icon-user").hide();
		$(".tip-text").show();
	},function(){
		$(".icon-user").show();
		$(".tip-text").hide();
	})
	$(".s-nav").eq(1).hover(function(){
		$(".app-phone").show();
	},function(){
		$(".app-phone").hide();
	})

	//======================条幅 规则========================
	$(".banner").find("span").click(function(){
		$(".rule").fadeIn();
		$(".rule-over").css("visibility","visible");
	})
	$(".close").click(function(){
		$(".rule").fadeOut();
		$(".rule-over").css("visibility","hidden");
	})
	
	//====================倒计时==========================
	show_time();
	
	
	//===================滚动上方固定菜单======================
	$(window).scroll(function(){
		if($(this).scrollTop() >= 160){
			$(".sub_nav_view").addClass("fixed");
			$(".tomorrow").hide();
			$(".oversea").show();
			$(".tuan").show();
		}else{
			$(".sub_nav_view").removeClass("fixed");
			$(".tomorrow").css("display","inline-block");
			$(".oversea").hide();
			$(".tuan").hide();
		}
	})
	
	

	
	//==================轮播图上方 品牌切换====================
	$(".b-tag li").hover(function(){
		$(this).addClass("t-on").siblings().removeClass("t-on");
		var index = ($(this).attr("data-index"));
		$(this).parent().siblings().eq(index-1).addClass("b-img-on").siblings().removeClass("b-img-on");
		$(this).parent().parent().find("p a").eq(index-1).show().siblings().hide();
	})
	
	//====================轮播图===========================
//	$(".carousel-img li").first().animate({"opacity":"0"});		
	var curIndex = 0;
	var autoChange = setInterval(function(){
		if(curIndex < $(".carousel-img li").length-1){
			curIndex++;
		}else{
			curIndex = 0;
		}
		changeTo(curIndex);
	},3000)
	
	$(".carousel-point").find("li").each(function(item){
		$(this).hover(function(){
			clearInterval(autoChange);
			changeTo(item);
			curIndex = item;
		},function(){
			autoChange = setInterval(function(){
				if(curIndex < $(".carousel-img li").length-1){
					curIndex++;
				}else{
					curIndex = 0;
				}
				changeTo(curIndex);
			},3000)
		})
	})
	
	function changeTo(num){
		 $(".carousel-img").find("li").removeClass("imgShow").hide().eq(num).fadeIn().addClass("imgShow");
		 $(".carousel-point").find("li span").removeClass("cur-point").eq(num).addClass("cur-point");
	}
	
	
	
	
	var i = 0;
	var clone = $(".m-r-oversea ul li:first").clone();
	$(".m-r-oversea ul").append(clone);
	var size = $(".m-r-oversea ul li").size();
	$(".next-btn").click(function(){
		moveLeft();
	})
	$(".pre-btn").click(function(){
		moveRight();
	})
	function moveLeft(){
		i++;
		if(i == size){
			$(".m-r-oversea ul").css("left","0");
			i=1;
		}
		$(".m-r-oversea ul").stop().animate({left:-248*i});
		if(i == (size-1)){
			$(".point-btn span").eq(0).addClass("btn-active").siblings().removeClass("btn-active");
		}else{
			$(".point-btn span").eq(i).addClass("btn-active").siblings().removeClass("btn-active");
		}
		
	}
	function moveRight(){
		i--;
		console.log(i)
		if(i == -1){
			$(".m-r-oversea ul").css("left",-(size-1)*248);
			i=size-2;
			console.log(i)
		}
		$(".m-r-oversea ul").stop().animate({left:-248*i});
		$(".point-btn span").eq(i).addClass("btn-active").siblings().removeClass("btn-active");
	}
	
	$(".point-btn span").hover(function(){
		i = $(this).index();
		$(".m-r-oversea ul").stop().animate({left:-248*i});
		$(this).addClass("btn-active").siblings().removeClass("btn-active");
	})
	
	var timer = setInterval(function(){
		moveLeft();
	},3000);
	
	$(".m-r-oversea").hover(function(){
		$(".pre-btn").show();
		$(".next-btn").show();
		clearInterval(timer);
	},function(){
		$(".pre-btn").hide();
		$(".next-btn").hide();
		setInterval(function(){
			moveLeft();
		},3000)
	})
	
	
	
	//=========================轮播图下方 品牌切换====================
	$(".c-sort li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
		var index = ($(this).attr("data-index"));
		$(this).parent().siblings().eq(index-1).addClass("con-on").siblings().removeClass("con-on");
	})
	
	
	//============================最后疯抢==================
	$(".goods-items").hover(function(){
		var text = ($(this).find(".promo-back span").text());
		if(text != ""){
			$(this).find(".promo-back").css("opacity","0.5");
		}
	},function(){
		$(this).find(".promo-back").css("opacity","0");
	})
	
	
	
	
	/*===================================JSON==================================*/
	//==============立即抢购 样式一==============
	$.get("json/best.json",function(data){
		for (var i = 0; i < 7; i++) {
			var cloneLi = $(".ul-li:first").clone();
			$(".con-ul").append(cloneLi);
		}
		$.each(data,function(index,ele){
			$(".main-title").eq(index).css("background",ele.img);
			$.each(ele.content,function(i,e){
				$(".main-con").eq(index).find(".a-img").eq(i).attr("src",e.conImg);
				$(".main-con").eq(index).find(".a-img").eq(i).attr("title",e.imgTitle);
				$(".main-con").eq(index).find(".a-h3").eq(i).text(e.conH3);
				$(".main-con").eq(index).find(".d-price em").eq(i).text(e.detailPrice);
				$(".main-con").eq(index).find(".info-first").eq(i).text(e.infoFirst);
				$(".main-con").eq(index).find(".info-second").eq(i).text(e.infoSecond);
			})
		})
	});
	
	
	//==============立即抢购 样式二==============
	$.get("json/best2.json",function(data){
			
		for (var i = 0; i < 7; i++) {
			var cloneLi = $(".t-ul-li:first").clone();
			$(".t-con-ul").append(cloneLi);
		}
		$.each(data,function(index,ele){
			$(".t-main-title").eq(index).css("background",ele.img);
			$.each(ele.content,function(i,e){
				$(".t-main-con").eq(index).find(".t-img").eq(i).attr("src",e.tImg);
				$(".t-main-con").eq(index).find(".d-name").eq(i).text(e.dName);
				$(".t-main-con").eq(index).find(".t-d-price").eq(i).text(e.dPrice);
			})
		})
		
	});
	
	//==============今日特卖==============
	$.get("json/today sale.json",function(data){
		for (var i = 0; i < 9; i++) {
			var cloneML = $(".menu-sale:first").clone();
			$(".menu-left").append(cloneML);
		}
		$.each(data, function(index,ele) {
			$(".menu-sale").eq(index).find(".s-left img").attr("src",ele.img);
			$(".menu-sale").eq(index).find(".detail-name").text(ele.dName);
			$(".menu-sale").eq(index).find(".detail-description").text(ele.dDes);
			$(".menu-sale").eq(index).find(".r-people span").text(ele.dPeo);
			$(".menu-sale").eq(index).find(".r-btn span").text(ele.dBtn);
		});
			
	});
	
	//==============品牌展示==============
	$.get("json/brand.json",function(data){
		for (var i = 0; i < 9; i++) {
			var cloneB = $(".b-img li:first").clone();
			$(".b-img").append(cloneB);
		}
		$.each(data, function(index,ele) {
			$(".b-img li").eq(index).find("img").attr("src",ele.img);
		});
		
	});
	
	//==============热卖排行榜==============
	$.get("json/hot.json",function(data){
		for(var i = 0;i < 5;i++ ){
			var cloneH = $(".c-o-one:first").clone();
			$(".con-one").append(cloneH);
		}
		
		$.each(data, function(index,ele) {
			$(".c-o-one").eq(index).find(".one-left").attr("src",ele.img);
			$(".c-o-one").eq(index).find(".one-right-title").text(ele.title);
			$(".c-o-one").eq(index).find(".price-true-color").text(ele.pTrue);
			$(".c-o-one").eq(index).find(".price-false").text(ele.pFalse);
		});
			
	});
	
	//==============最后疯抢==============
	$.get("json/last sale.json",function(data){
		for (var i = 0; i < 17; i++) {
			var cloneG = $(".goods-items:first").clone(true);
			$(".main-goods").append(cloneG);
		}
		$.each(data, function(index,ele) {
			$(".goods-items").eq(index).find(".promo-img").attr("src",ele.img);
			$(".goods-items").eq(index).find(".promo-back span:eq(0)").text(ele.t1);
			$(".goods-items").eq(index).find(".promo-back span:eq(1)").text(ele.t2);
			$(".goods-items").eq(index).find(".f-price-font").text(ele.pf);
			$(".goods-items").eq(index).find(".info-name").text(ele.name);
		});
			
	});
	
	
	//==============在售分类==============
	$.get("json/nav classify.json",function(data){
			
		for (var i = 0; i < 14; i++) {
			$(".classify-left").append($(".classify-left li:first").clone(true));
		}
		for(var j=0;j<14;j++){
			$(".classify-right").append($(".classify-right ul:first").clone())
		}
		$.each(data, function(index,ele) {
			$(".classify-left li").eq(index).text(ele.title);
			$.each(ele.detail, function(i,e) {
				$(".classify-right ul").eq(index).append("<li><a><img src="+e.img+" /><label>"+e.name+"</label></a></li>");
			});
			
			//=============三级菜单效果==========
			$(".classify-left li").eq(0).addClass("active").siblings().removeClass("active");
			$(".classify-right ul").eq(0).addClass("ul-on").siblings().removeClass("ul-on");
			$(".r_left").hover(function(){
				$(".classify").show();
				$(".classify-left li").eq(index).hover(function(){
					$(this).addClass("active").siblings().removeClass("active");
					$(".classify-right ul").eq(index).addClass("ul-on").siblings().removeClass("ul-on");
				})
			},function(){
				$(".classify").hide();
				$(".classify-left li:eq(0)").addClass("active").siblings().removeClass("active");
					$(".classify-right ul").eq(0).addClass("ul-on").siblings().removeClass("ul-on");
			})
			});
	});
	
	
	
	//获取数据
	var cook = $.cookie();
	function compare(a,b){
    	if(a>b){
    		return 1;
    	}else if(a<b){
    		return -1;
    	}else{
    		return 0;
    	}
    }
	var arr=[];
	if(!$.isEmptyObject($.cookie())){
    	for(var key in cook){
    		if(key.substring(0,key.length-1)=="infoImg" && cook[key] != "null"){
    			arr.push(parseInt(key.substring(key.length-1)));
    		}
    	}
	    var arr=arr.sort(compare());
	    var index=arr[0];
    	$(".empty-cart").hide();
    }else{
    	$(".empty-cart").show();
		$(".over-cart").hide();
    }
	for(var i=0;i<arr.length;i++){
		var index=arr[i];
		var eventTitle=$.cookie("eventTitle"+index);
		var infoImg=$.cookie("infoImg"+index);
		var infoTitle=$.cookie("infoTitle"+index);
		var color=$.cookie("color"+index);
		var size=$.cookie("size"+index);
		var ItemEntryPrice=$.cookie("ItemEntryPrice"+index);
		var strike=$.cookie("strike"+index);
		var numVal=$.cookie("numVal"+index);
		
		if(color!="null"&&size!="null"){
            
            $(".detail-menu-ul").append($(".over-cart:first").clone());
			$(".over-cart").last().find("img").attr("src",infoImg);
			$(".over-cart").last().find(".name").text(infoTitle);
			$(".over-cart").last().find(".colorsize").text("颜色:"+color+" 尺码:"+size);
			$(".over-cart").last().find(".price-pp").text("￥"+ItemEntryPrice);
			$(".over-cart").last().find(".price-num").text("x"+numVal);
			$(".over-cart").last().removeClass("cart-hide")
            
			var total = 0;
			var goodsNum = 0;
			$(".over-cart").not($(".over-cart").eq(0)).each(function(){
					total += parseInt(($(this).find(".price-pp").text().substring(1)) * ($(this).find(".price-num").text().substring(1)));
			})
				$(".menu-foot-total").find("span").text("￥"+total+".00");
			}
		
		$(".foot-btn-detail").click(function(){
			location.href = "shoppingcart.html"
		})
	}
})

//=============倒计时函数======================
function show_time(){
	var time_start = new Date().getTime();  //获取当前时间
	var time_end = new Date("2016-11-11 00:00:00").getTime();  //设置停止时间
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
    $("#time_d").text(int_day); 
    $("#time_h").text(int_hour); 
    $("#time_m").text(int_minute); 
    $("#time_s").text(int_second); 
    $("#time_dd").text(int_day); 
    $("#time_hh").text(int_hour); 
    $("#time_mm").text(int_minute); 
    $("#time_ss").text(int_second); 
    $("#time_ddd").text(int_day); 
    $("#time_hhh").text(int_hour); 
    // 设置定时器
    setTimeout("show_time()",1000); 
}

