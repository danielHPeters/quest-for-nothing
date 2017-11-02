// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {
			
	var numCoins = 5,
		score = 0,
	    coins = [],
		canvas;			

	function gameLoop () {
	
	  var i;
	
	  window.requestAnimationFrame(gameLoop);
	  
	  // Clear the canvas
	  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	  for (i = 0; i < coins.length; i += 1) {
		  coins[i].update();
		  coins[i].render();
	  }
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.x = 0;
		that.y = 0;
		that.image = options.image;
		that.scaleRatio = 1;
		
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {

		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    that.x,
		    that.y,
		    that.width / numberOfFrames * that.scaleRatio,
		    that.height * that.scaleRatio);
		};
		
		that.getFrameWidth = function () {
			return that.width / numberOfFrames;
		};
		
		return that;
	}
	
	function destroyCoin (coin) {
	
		var i;
		
		for (i = 0; i < coins.length; i += 1) {
			if (coins[i] === coin) {
				coins[i] = null;
				coins.splice(i, 1);
				break;
			}
		}
	}
	
	function spawnCoin () {
	
		var coinIndex,
			coinImg;
	
		// Create sprite sheet
		coinImg = new Image();	
	
		coinIndex = coins.length;
		
		// Create sprite
		coins[coinIndex] = sprite({
			context: canvas.getContext("2d"),
			width: 1000,
			height: 100,
			image: coinImg,
			numberOfFrames: 10,
			ticksPerFrame: i
		});
		
		coins[coinIndex].x = Math.random() * (canvas.width - coins[coinIndex].getFrameWidth() * coins[coinIndex].scaleRatio);
		coins[coinIndex].y = Math.random() * (canvas.height - coins[coinIndex].height * coins[coinIndex].scaleRatio);
		
		coins[coinIndex].scaleRatio = Math.random() * 0.5 + 0.5;
		
		// Load sprite sheet
		coinImg.src = "images/coin-sprite-animation.png";
	}
	
	function getElementPosition (element) {
	
       var parentOffset,
       	   pos = {
               x: element.offsetLeft,
               y: element.offsetTop 
           };
           
       if (element.offsetParent) {
           parentOffset = getElementPosition(element.offsetParent);
           pos.x += parentOffset.x;
           pos.y += parentOffset.y;
       }
       return pos;
    }
	
	function distance (p1, p2) {
	
		var dx = p1.x - p2.x,
			dy = p1.y - p2.y;
			
		return Math.sqrt(dx * dx + dy * dy);
	}
	
	function tap (e) {
	
		var i,
			loc = {},
			dist,
			coinsToDestroy = [];
			pos = getElementPosition(canvas),
			tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
			tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
			canvasScaleRatio = canvas.width / canvas.offsetWidth;

		loc.x = (tapX - pos.x) * canvasScaleRatio;
		loc.y = (tapY - pos.y) * canvasScaleRatio;
			
		for (i = 0; i < coins.length; i += 1) {
		
			// Distance between tap and coin
			dist = distance({
				x: (coins[i].x + coins[i].getFrameWidth() / 2 * coins[i].scaleRatio),
				y: (coins[i].y + coins[i].getFrameWidth() / 2 * coins[i].scaleRatio)
			}, {
				x: loc.x,
				y: loc.y
			});
			
			// Check for tap collision with coin		
			if (dist < coins[i].getFrameWidth() / 2 * coins[i].scaleRatio) {
				coinsToDestroy.push(coins[i]);
			}
		}
		
		// Destroy tapped coins
		for (i = 0; i < coinsToDestroy.length; i += 1) {
		
			score += parseInt(coinsToDestroy[i].scaleRatio * 10, 10);
			destroyCoin(coinsToDestroy[i]);	
			setTimeout(spawnCoin, 1000);	
		}
		
		if (coinsToDestroy.length) {
			document.getElementById("score").innerHTML = score;
		}
	}
	
	// Get canvas
	canvas = document.getElementById("coinTapGame");
	canvas.width = 460;
	canvas.height = 230;
	
	for (i = 0; i < numCoins; i += 1) {
	
		spawnCoin();
	}
	
	gameLoop();
	
	canvas.addEventListener("touchstart", tap);
	canvas.addEventListener("mousedown", tap);

} ());

