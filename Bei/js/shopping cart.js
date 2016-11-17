$(function(){
	
	
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
		$(".cart-empty").hide();
		$(".cart-list").show();
    	for(var key in cook){
    		if(key.substring(0,key.length-1)=="infoImg" && cook[key] != "null"){
    			arr.push(parseInt(key.substring(key.length-1)));
    		}
    	}
	    var arr=arr.sort(compare());
	    var index=arr[0];
    }else{
    	$(".cart-empty").show();
		$(".cart-list").hide();
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
            
            $(".footer-entry").before($(".item-entry:first").clone());
			$(".event-title a").text(eventTitle);
			$(".item-entry").last().find(".info-image img").attr("src",infoImg);
			$(".item-entry").last().find(".info-title").text(infoTitle);
			$(".item-entry").last().find(".cart-td-item-sku p span").eq(0).text(color);
			$(".item-entry").last().find(".cart-td-item-sku p span").eq(1).text(size);
			$(".item-entry").last().find(".view-ItemEntryPrice").text(ItemEntryPrice);
			$(".item-entry").last().find(".strike").text(strike);
			$(".item-entry").last().find(".detail-number input").val(numVal);
            $(".item-entry:gt(0)").removeClass("item-hide");
            
            var unitPrice = $(".item-entry").last().find(".view-ItemEntryPrice").text();
            var mul = $(".item-entry").last().find(".detail-number input").val();
			$(".item-entry").last().find(".view-ItemSubtotal").text(unitPrice*mul+".00");
		}
	}	
	
	
	//数量加减
	
	$.each($(".detail-number input"), function() {
		if($(this).val() > 1){
			$(this).siblings(".del-num").css("background","-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee))");
		}
		if($(this).val() >= 5){
			$(this).siblings(".add-num").css("background","-webkit-gradient(linear,left top,left bottom,from(#e0e0e0),to(#f0f0f0))");
		}
	});
	
	$(".add-num").click(function(){
		var i =$(this).siblings("input").val();
		i++;
		$(this).parent().find(".del-num").css("background","-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee))");
		if(i < 5){
			var ii = $(this).parent().parent().parent().index() - 2;
			$.cookie("numVal"+ii,i,{exprise:7})
			$(this).parent().find("input").val($.cookie("numVal"+ii));
		}
		if(i >= 5){
			$(this).css("background","-webkit-gradient(linear,left top,left bottom,from(#e0e0e0),to(#f0f0f0))");
			var ii = $(this).parent().parent().parent().index() - 2;
			i = 5;
			$.cookie("numVal"+ii,i,{exprise:7});
			$(this).parent().find("input").val($.cookie("numVal"+ii));
		}
		var unitPrice = $(this).parent().parent().siblings(".cart-td-item-price").find(".view-ItemEntryPrice").text();
        var mul = $(this).parent().find("input").val();
        $(this).parent().parent().siblings(".cart-td-subtotal").find(".view-ItemSubtotal").text(unitPrice*mul+".00");
        calPrice();
	})
	
	$(".del-num").click(function(){
		var i =$(this).parent().find("input").val();
		i--;
		$(this).parent().find(".add-num").css("background","-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee))");
		if(i > 1){
			var ii = $(this).parent().parent().parent().index() - 2;
			$.cookie("numVal"+ii,i,{exprise:7})
			$(this).parent().find("input").val($.cookie("numVal"+ii));
		}
		if(i <= 1){
			$(this).css("background","-webkit-gradient(linear,left top,left bottom,from(#e0e0e0),to(#f0f0f0))");
			var ii = $(this).parent().parent().parent().index() - 2;
			i = 1;
			$.cookie("numVal"+ii,i,{exprise:7})
			$(this).parent().find("input").val($.cookie("numVal"+ii));
		}
		var unitPrice = $(this).parent().parent().siblings(".cart-td-item-price").find(".view-ItemEntryPrice").text();
        var mul = $(this).parent().find("input").val();
        $(this).parent().parent().siblings(".cart-td-subtotal").find(".view-ItemSubtotal").text(unitPrice*mul+".00");
        calPrice();
	})
	
	
	
	//勾选框  
	$(".J_checkAll").click(function(){
		$(".J_eventCheck").prop("checked",$(".J_checkAll").prop("checked"));
		$(".s_all_slave").prop("checked",$(".J_checkAll").prop("checked"));
		$(".J_itemCheck").not($(".J_itemCheck").eq(0)).prop("checked",$(".J_checkAll").prop("checked"));
		calPrice();
	})
	$(".s_all_slave").click(function(){
		$(".J_eventCheck").prop("checked",$(".s_all_slave").prop("checked"));
		$(".J_checkAll").prop("checked",$(".s_all_slave").prop("checked"));
		$(".J_itemCheck").not($(".J_itemCheck").eq(0)).prop("checked",$(".s_all_slave").prop("checked"));
		calPrice();
	})
	$(".J_eventCheck").click(function(){
		var flag = true;
		$(".J_eventCheck").each(function(){
			if( !$(this).prop("checked") ){
				flag = false;
			}
		})
		$(".J_checkAll").prop("checked",flag);
		$(".s_all_slave").prop("checked",flag);
		$(".J_itemCheck").prop("checked",flag);
		calPrice();
	})
	$(".J_itemCheck").not($(".J_itemCheck").eq(0)).click(function(){
		var flag = true;
		$(".J_itemCheck").not($(".J_itemCheck").eq(0)).each(function(){
			if( !$(this).prop("checked") ){
				flag = false;
			}
		})
		$(".J_checkAll").prop("checked",flag);
		$(".s_all_slave").prop("checked",flag);
		$(".J_eventCheck").prop("checked",flag);
		calPrice();
	})
	
	
	//价格总计
	function calPrice(){
		var total = 0;
		var goodsNum = 0;
		$(".J_itemCheck").not($(".J_itemCheck").eq(0)).each(function(){
			if($(this).prop("checked")){
				total += parseInt($(this).parent().siblings(".cart-td-subtotal").find("span").text());
				goodsNum += 1;
			}
		})
		$(".view-EventTotal").text(total+".00");
		$(".cart-payment").text(total+".00");
		$(".red").text(goodsNum);
	}
	calPrice();
	
	
	//删除
	$(".view-DelItemBtn").click(function(){
		$(".miniDialog_mask").show();
		$(".miniDialog_wrapper").show();
		var delTr = $(this).parent().parent();
		console.log(delTr.index());
//		console.log($.cookie("infoImg"+(delTr.index()-2)));
		$(".miniDialog_button_secondary").click(function(){
			$(".miniDialog_mask").hide();
			$(".miniDialog_wrapper").hide();
		})
		$(".miniDialog_button_confirm").click(function(){
			$(".miniDialog_mask").hide();
			$(".miniDialog_wrapper").hide();
			console.log(delTr.index());
			var iii = delTr.index() - 2;
			console.log(iii);
			$.cookie("infoImg"+iii,"null");
			$(delTr).remove();
			calPrice();	
		})
	})
	
})