$(function(){
	window.DrawImage=function(image,width,height)
	{
		var scale=image.width/image.height;
		if(image.width>=image.height&&image.width>width){
				image.style.width=width+"px";
				image.style.height=(width*image.height/image.width-0.5)+"px";
				image.parentNode.style.cssText="display:block;width:"+width+"px;height:"+(width*image.height/image.width-0.5)+"px;"+"padding: "+(height-width/scale)/2+"px"+" 0 "+(height-width/scale)/2+"px"+" 0;";
			}
			else if(image.width<image.height&&image.height>height){
				image.style.height=height+"px";
				image.style.width=(height*image.width/image.height-0.5)+"px";
				image.parentNode.style.cssText="display:block;height:"+height+"px;width:"+(height*image.width/image.height-0.5)+"px;"+"padding: 0 "+(width-height*scale)/2+"px"+" 0 "+(width-height*scale)/2+"px;";
			}
			else if(image.height<=height&&image.width<=width){
				image.parentNode.style.cssText="display:block;padding: "+(height-image.height)/2+"px"+" "+(width-image.width)/2+"px"+" "+(height-image.height)/2+"px"+" "+(width-image.width)/2+"px;width:"+image.width+"px;height:"+image.height+"px;";
			}
	};
	
	$.fn.ownDialog=function(options){
		$.fn.ownDialog.defaults={
			triggerDom:".showOwnDialog",
			triggerAction:"click",
			target:".ownDialog",
			overLay:".mengban",
			showTool:false,//是否显示确定 取消等按钮
			btnOk:null,//当按下确定按钮时执行的操作
			width:null,
			height:null,
			startFun:null,
			closeFun:null
		};
		return this.each(function(){
			var opts = $.extend({},$.fn.ownDialog.defaults,options);
			if(opts.width) $(opts.target).width(opts.width);
			if(opts.height) $(opts.target).height(opts.height);
			if(opts.showTool){
				var tollDIV=$("<div>").addClass("dialog_tool"),BtnOK=$("<input type=\"button\" class=\"btn btn_ok\" />"),BtnCancel=$("<input style=\"margin-left:20px;\" type=\"button\" class=\"btn btn_cancel\" />");
				BtnCancel.bind("click",{target:$(".close_owndialog_btn",$(this))},function(event){
					event.data.target.trigger("click");
				});
				if(opts.btnOk&&jQuery.isFunction(opts.btnOk)){
					BtnOK.click(opts,function(event){
						event.data.btnOk();
					});
				}
				tollDIV.append(BtnOK).append(BtnCancel);
				$(opts.target).append(tollDIV);
			}
			$(opts.triggerDom).bind(opts.triggerAction,opts,function(event){
				$(event.data.overLay).show().css({"height":document.body.scrollHeight+"px"});
				$(event.data.target).show().css({"top":(200+(document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop))+"px","left":(document.body.clientWidth-$(event.data.target).width())/2+"px"});
			});
			$(".close_owndialog_btn",$(this)).click(opts,function(event){
				$(event.data.target).hide();
				$(event.data.overLay).hide().css({"height":"0px"});
			});
		});
	};
	
	window.show_success_message=function(){
		$div=$("<div>").addClass("succes_message");
		$div.appendTo("body");
		var top=(130+(document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop));
		$div.show().css({"top":top+"px","left":(document.body.clientWidth-$div.width())/2+"px"});
		$div.animate({"opacity":"0","top":top-100+"px"},1200,function(){
			$(this).remove();
		});
	};
	
	$.fn.ownNavbar=function(options){
		$.fn.ownNavbar.defaults={
			navBar:".navbar",
			contentPanel:".panel",
			effect:"fade",
			exchange:null
		};
		return this.each(function(){
			var opts=$.extend({},$.fn.defaults,options);
			$(opts.navBar).children("li").click(opts,function(event){
				var index=$(event.data.navBar).children("li").index($(this));
				$(event.data.contentPanel).children("div").hide();
				$(event.data.contentPanel).children("div").eq(index).show();
				$(event.data.navBar).children("li").removeClass("active");
				$(this).addClass("active");
				if($.isFunction( event.data.exchange) ){ 
					event.data.exchange(index); 
				}
			});
		});
	};
}());

function getPageSettings() {
	return {rows:6, page:1, orderkey:"", orderby:""};
}