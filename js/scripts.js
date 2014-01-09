function initPage(){
	$(document).ready(function(){
	
		$('.presentation').slideShow(
			{
				item: '.item',
				carNav: '.presentation-nav',
				nav: 'a',
				actionEvent: 'click',
				speed: 5000,
			}
		);

	});
};

$.fn.slideShow = function(opt){

	var options = jQuery.extend({}, opt);

	return this.each(function(){
	
		var _hold = $(this);
		var _item = _hold.find(options.item);
		var car_nav = _hold.find(options.carNav);
		
		var _a=-1;
		var i=0;
		var _timer;

		_item.each(function(i){
			car_nav.append("<a href='#/slide"+(i+1)+"'>Slide"+ (i+1) +"</a>");
		});
		
		var _nav = car_nav.find(options.nav);
		
		_nav.on(options.actionEvent, function(){
			nextSlide();
		});
		
		function nextSlide(){
			if (_a==_item.length-1) {_a=-1;}
			changeEl(_a+1);
			return false;
		};

		function prevSlide(){
			if (_a==-1) {_a=_item.length-1;}
			changeEl(_a-1);
			return false;
		};

//Init: add active class	
		_a = _item.index(_item.filter(".active"));
		if(_a==-1) _a=0;
		_item.eq(_a).addClass('active');
		_nav.eq(_a).addClass('active');
		window.location.hash = "#/slide"+(i+1)+"";
		

		function changeEl(_ind){
			_nav.removeClass('active');
			_nav.eq(_ind).addClass('active');
			_item.removeClass('active');
			_item.eq(_ind).addClass('active');
			window.location.hash = "#/slide"+(_ind+1)+"";
			_a=_ind;
		};
		
		$(document).keydown (function(event){

			if (event.keyCode == 39 || event.keyCode == 32) nextSlide(); // right , space
			if (event.keyCode == 37 ) prevSlide();  //left
			
		});

		//_timer = setInterval(play, options.speed);
		
		function play(){
			if (i==_nav.length){i=0; } ;
			changeEl(i);  
			i++;
			return false;	
		};

	});
};

if (window.addEventListener) window.addEventListener("load", initPage, false); else if (window.attachEvent && !window.opera) window.attachEvent("onload", initPage);


