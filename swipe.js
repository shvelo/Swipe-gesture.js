/***
* Swipe-gesture.js 
* http://shvelo.github.com/Swipe-gesture.js
* by Nick Shvelidze
*/
(function(window) {
	var isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};	
	var swipe = function(first,second){
		var element, options;
		if(!first && !second) {
			element = document.documentElement;
			options = {};
		} else if(!second) {
			element = document.documentElement;
			options = first;
		} else {
			element = first;
			options = second;
		}
		
		element.swipe = {startX: 0, startY: 0};
				
		var minDistance = 20;
		switch(typeof(options.minDistance)) {
			case 'int':
				minDistance = options.minDistance;
				break;
			case 'string':
				if(isNumber(options.minDistance))
					minDistance =  parseInt(options.minDistance);
				else if(options.minDistance.charAt(options.minDistance.length - 1) == '%' &&
						isNumber(options.minDistance.substr(0,options.minDistance.length - 1))) {
					var percentDistance = parseInt(options.minDistance.substr(0,options.minDistance.length - 1));
					var diagonal =  Math.sqrt(element.offsetWidth * element.offsetWidth + element.offsetHeight * element.offsetHeight);
					minDistance = Math.round(diagonal * percentDistance / 100);					
				} else
					minDistance = 20;				
				break;
			default:
				minDistance = 20;
				break;
		}		
		
		if(options.onSwipeRight)
			element.onSwipeRight = options.onSwipeRight;
		else
			element.onSwipeRight = function() {};
		
		if(options.onSwipeLeft)
			element.onSwipeLeft = options.onSwipeLeft;
		else 
			element.onSwipeLeft = function() {};
		
		if(options.onSwipeDown)
			element.onSwipeDown = options.onSwipeDown;
		else 
			element.onSwipeDown = function() {};
		
		if(options.onSwipeUp)
			element.onSwipeUp = options.onSwipeUp;
		else 
			element.onSwipeUp = function() {};
		
		var swipeStart = function(e){
			if(typeof(e.touch) != 'undefined') {				
				element.swipe.startX = e.touch.pageX;
				element.swipe.startY = e.touch.pageY;
			} else if(typeof(e.touches) != 'undefined') {
				var touch = e.touches[0];
				element.swipe.startX = touch.pageX;
				element.swipe.startY = touch.pageY;
			} else {
				element.swipe.startX = e.pageX;
				element.swipe.startY = e.pageY;
			}
		};
		var swipeEnd = function(e){
			if(typeof(e.touch) != 'undefined') {				
				newX = e.touch.pageX;
				newY = e.touch.pageY;
			} else if(typeof(e.changedTouches) != 'undefined') {
				var touch = e.changedTouches[0];
				newX = touch.pageX;
				newY = touch.pageY;
			} else if(typeof(e.touches) != 'undefined') {
				var touch = e.touches[0];
				newX = touch.pageX;
				newY = touch.pageY;
			} else {
				newX = e.pageX;
				newY = e.pageY;
			}
			var diffX = Math.max(newX,element.swipe.startX) - Math.min(newX,element.swipe.startX);
			var diffY = Math.max(newY,element.swipe.startY) - Math.min(newY,element.swipe.startY);
			if(diffX > diffY) {
				if(newX > element.swipe.startX + minDistance)
					element.onSwipeRight();
				else if (newX < element.swipe.startX - minDistance)
					element.onSwipeLeft();
			} else if(diffX < diffY) {
				if(newY > element.swipe.startY + minDistance)
					element.onSwipeDown();
				else if (newY < element.swipe.startY - minDistance)
					element.onSwipeUp();
			}
		};
		
		element.addEventListener('mousedown',swipeStart);
		element.addEventListener('mouseup',swipeEnd);
		element.addEventListener('touchstart',swipeStart);
		element.addEventListener('touchend',swipeEnd);
		if(options.unselectable) element.onselectstart = function() { return false; };
	};
	window.swipe = swipe;
})(window);