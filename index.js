var counter = 0;
var score = 0;

// Note: container related values are hardcoded for now
// 		 changes has to be done according to the width and height property of snake and container

document.addEventListener("keydown", function() {
	var elem = document.getElementById('snake')
	var container = $('#container');
	food();
	if(event.which == 37) {
		counter++;
		key = 'LEFT';
		if(counter > 1) {
			clearInterval(id);
		}
		move("right", parseInt($('#snake').css('left')));
	} else if(event.which == 38) {
		counter++;
		key = 'TOP';
		if(counter > 1) {
			clearInterval(id);
		}
		move("bottom", parseInt($('#snake').css('top')));
	} else if( event.which == 39) {
		counter++;
		key = 'RIGHT';
		if(counter > 1) {
			clearInterval(id);
		}
		if(parseInt($('#snake').css('left')) <= 380) {
			move("left", parseInt($('#snake').css('left')));
		}
	} else if(event.which == 40) {
		counter++;
		key = 'BOTTOM';
		if(counter > 1) {
			clearInterval(id);
		}
		if(parseInt($('#snake').css('top')) <= 380) {
			move("top", parseInt($('#snake').css('top')));
		}
	}

	function move(direction, pos) {
		id = setInterval(frame, 200);
		if(!pos) {
			pos = 0;
		}
	
		function frame() {
			if(direction == "right") {
				if(parseInt($('#snake').css('left')) > 0) {
					pos = pos - 10;
					elem.style.left = pos + 'px';
					if(parseInt(elem.style.left) == 390) {
						clearInterval(id);
					}
				}
			} else if(direction == 'bottom') {
				if(parseInt($('#snake').css('top')) > 0) {
					pos = pos - 10;
					elem.style.top = pos + 'px';
					if(parseInt(elem.style.top) == 390) {
						clearInterval(id);
					}
				}
			} else {
				pos = pos + 10;
				elem.style[direction] = pos + 'px';
				if(direction == "top") {
					if(parseInt(elem.style.top) == 390) {
						clearInterval(id);
					}
				}
				if(direction == "left") {
					if(parseInt(elem.style.left) == 390) {
						clearInterval(id);
					}
				}
			}

			ballTop = $('.ball').css('top');
			ballLeft = $('.ball').css('left');

			if(elem.style.top == ballTop && elem.style.left == ballLeft) {
				dash(direction);
			}

			function dash(direction) {
				score = score + 10;
				changePlace();
				var a = parseInt(elem.offsetHeight);
				var b = parseInt(elem.offsetWidth);
				$('label').text(score);
			}

			function changePlace() {
				var x = Math.round((Math.random()*(400-0)+0)/10)*10;
				var y = Math.round((Math.random()*(400-0)+0)/10)*10;
				$('.ball').css('top', x + 'px');
				$('.ball').css('left', y + 'px');
			}
		}
	}
	// TODO: changeDimension method
});

var food = (function() {
	var createFood = true;
	return function() {
		if (createFood) {
			createFood = false;
			var ball = document.createElement('div');
			container.appendChild(ball);
			ball.className = 'ball';
		}
	}
})();