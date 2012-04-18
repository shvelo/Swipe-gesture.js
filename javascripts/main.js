var target = document.getElementById('demo');
swipe(target,{
	onSwipeRight: function(){
		target.innerHTML = 'Right';
	},
	onSwipeLeft: function(){
		target.innerHTML = 'Left';
	},
	onSwipeDown: function(){
		target.innerHTML = 'Down';
	},
	onSwipeUp: function(){
		target.innerHTML = 'Up';
	},
	minDistance: 0
});