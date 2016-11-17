
$(function(){
	
	//手机号码验证
	var isName = true;
	$(".userName").blur(function(){
		var number = $(".userName").val();
		/*if(number < 11 || number > 12 || number == ""){
			$(".n-error").show();
			isName = false;
		}*/
		var reg = /^1[34578]\d{9}$/;
		if(!reg.test(number)){
			$(".n-error").show();
			isName = false;
		}else{
			$(".n-error").hide();
			isName = true;
		}
	})
	//验证码
	var isCode = true;
	$(".checkCode").blur(function(){
		var code = $(".checkCode").val();
		if(code.toLowerCase() != $(".c-img").text().toLowerCase()){
			$(".c-error").show();
			isCode = false;
		}else{
			$(".c-error").hide();
			isCode = true;
		}
	})
	
	//手机验证码
	$(".m-btn").click(function(){
		setTimeout(function(){
			$(".checkMsg").val(autoMsg());
		},3000);
	})
	
	//密码验证
	//6-16位字符，可包含数字、字母和特殊字符。
	var isPas = true;
	$(".f-password input").blur(function(){
		var pas = $(this).val();
		//能匹配的组合为：数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符组合，而且不能是纯数字，纯字母，纯特殊字符
		var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/;
		if(!reg.test(pas)){
			$(".p-error").show();
			isPas = false;
		}else{
			$(".p-error").hide();
			isPas = true;
		}
		
	})
	
	
	//密码可见
	$(".f-password i").click(function(){
		var pasSee = $(".userPassword").val();
		$(this).toggleClass("iBkPs");
		if($(this).hasClass("iBkPs")){
			$(".userPasswordSee").val($(".userPassword").val()).show();
			$(".userPassword").hide();
		}else{
			$(".userPassword").val($(".userPasswordSee").val()).show();
			$(".userPasswordSee").hide();
		}
	})
	
	
	//注册跳转
	$(".f-btn").click(function(){
		console.log(isName);
		console.log(isCode);
		console.log(isPas);
		if(isName&&isCode&&isPas){
			$.cookie("userNumber",$(".userName").val(),{expris:7});
			$.cookie("flag",1,{expris:7});
			$.cookie("userPassword",$(".f-password input").val(),{expris:7});
			location.href = "index.html";
		}
	})
	
	//随机验证码
	autoString();
	$(".c-img").click(function(){
		autoString(this);
	})
	
	function autoString(obj){
		var str = "";
		for (var i = 0; i < 4; i++) {
			var num = parseInt(Math.random()*10)%3;
			var randomNum = 0;
			if(num == 0){
				randomNum = parseInt(Math.random()*1000)%10+48;
			}
			if(num == 1){
				randomNum = parseInt(Math.random()*1000)%25+65;
			}
			if(num == 2){
				randomNum = parseInt(Math.random()*1000)%25+97;
			}
			str = str.concat(String.fromCharCode(randomNum));
		}
		$(".c-img").text(str) ;
	}
	function autoMsg(){
		var str = '';
		for (var i = 0; i < 6; i++) {
			randomNum = parseInt(Math.random()*1000)%10+48;
			str = str.concat(String.fromCharCode(randomNum));
		}
		return str;
	}
	
})


