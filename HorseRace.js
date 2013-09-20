// Immediately executes the data inside and prevents global namespace issues
(function() {
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame            ||
	window.webkitRequestAnimationFrame             ||
	window.mozRequestAnimationFrame                ||
	window.oRequestAnimationFrame                  ||
	window.msRequestAnimationFrame                 ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
}) ();


/* (function () { */
    numMoveAmt = 11;
	minAbility = 8;
	maxAbility = 15;
	horseArr = new Array();
	
	function changeText(id, newText)
	{
	       // check parameters
	    if (typeof id != "string" || typeof newText != "string") return;

	    if (typeof(Node) != 'undefined') { // firefox
	       var node = document.getElementById(id); // find node with id
	       node.innerHTML += newText;
	    } // end Firefox
	    else { // IE
	       var IE_node = document.all[id];
	       if (IE_node)
	       {
	           IE_node.innerHTML = newText;
	    //       Node = {TEXT_NODE:1};
	       }
	    }
	}
	displayHorses = function() {
		         // document.getElementById(elementId)
		var id = document.getElementById("moveAmt");
		    id.value = "Test483";
		var tableStr = "<table>";
		for ( var h = 0; h < horseArr.length; h++)
	    {
		   tableStr = tableStr.concat("<tr>");
	       for ( var m = 1; m < numMoveAmt; m++) {
	    	   tableStr = tableStr.concat("<td>" + horseArr[h].moveAmt[m] + "</td>");
	       }
	       tableStr = tableStr.concat("</tr>");
		}
		tableStr = tableStr.concat("</table>");
		changeText("moveAmt", tableStr);
	};
	var ctx = null;
	var Game = {
			canvas: document.getElementById('myCanvas'),
			
			setup: function (){
			    if (this.canvas.getContext) {
			    	ctx = this.canvas.getContext('2d');
			    	this.width = this.canvas.width;
			        this.height = this.canvas.height;
			    
			        this.init();
			        Ctrl.init();
			}
	},
	animate: function() {
		Game.play = requestAnimFrame(Game.animate);
		Game.draw();
	},
	
	init:function() {
		theHorses.init();
		Background.init();
		horseRace.init();
		
		this.animate();
	},
	
	draw: function() {
		ctx.clearRect(0, 0, this.width, this.height);
		
		Background.draw();
		horseRace.draw();
	}
};

var Background = {
		init: function() {
			this.ready = false;
			this.img = new Image();
			this.img.src = 'background.jpg';
			
			this.img.onload = function() {
				Background.ready = true;
			};
		},
		draw: function() {
			if (this.ready) {
				ctx.drawImage(this.img, 0, 0);
			}
		}
};

var horse = {

	//moveAmt: [],
    //finish : 0,
    //finishedRace: false,

    getAbilityArr: function() {
    	var arr = [];
    	for (var m = 0; m < numMoveAmt; m++){
           arr[m] = Math.floor(Math.random() *
        		   (maxAbility - minAbility + 1)) + 8;		
    	}
    	return arr;
    }  
};

var theHorses = {
    
	init: function() {
        for (var i = 0; i < horseRace.numHorses; i++) {
        	horseArr[i] = { };
		    horseArr[i].moveAmt = [numMoveAmt]; // .init();
		    horseArr[i].moveAmt = horse.getAbilityArr();
		    horseArr[i].finish = -1;
		    horseArr[i].fishedRace = false;
        }
        displayHorses();
	}
};

var horseRace = {
	gap: 2,
	test: 9,

	w: 15,
	h: 40,

    numHorses: 9,
    finishedRace : [], //[false, false, false, false, false],
    horseXPos : [], // [0, 0, 0, 0, 0],
	headHeight: 4,
	headWidth: 6,
	neckHeight: 4,
	neckWidth: 3,
	bodyHeight: 5,
	bodyWidth: 18,
	legWidth: 3,
	legHeight: 5,
	totalHeight: 0, // initialized in init
	numFinished: 0,
	
	init: function() {
	    this.row = 3;
	    this.total = 0;
	    this.totalHeight = this.headHeight + this.neckHeight + this.bodyHeight + this.legHeight;
	    this.totalWidth = this.headWidth + this.neckWidth + this.bodyWidth + this.legWidth;
	    this.count = [this.row];
	    for (var h = 0; h < this.numHorses; h++) {
	    	this.finishedRace[h] = false;
	    	this.horseXPos[h] = this.totalWidth + 2;
	    }
	},
	collide: function(i, j) {
		this.count[i][j] = false;
		Ball.sy = - Ball.sy;
	},
	
	assignFinishPlace : function(finishArray)
	{
		for (var i = 0; i < finishArray.length; i++){
			this.numFinished++;
			horseArr[finishArray[i].horseNum].finish = this.numFinished;
		}
	},
	
	draw: function() {
	    var finishLine = 500;
	    var finishedArr = new Array();  // list of horses that crossed the finish line
	                  // during this invocation of draw(), sorted by distance accross finish line

	    ctx.font = "20px Arial";
		ctx.fillStyle = this.gradient(-1);
		ctx.fillRect(finishLine, 0, 2, this.numHorses * (this.totalHeight + this.gap));	
	
		for (var horse=0; horse < this.numHorses; horse++) {
			ctx.fillStyle = this.gradient(horse);			
			if (horseArr[horse].finishedRace) {
				ctx.fillText(horseArr[horse].finish.toString(), finishLine - 30, this.y(horse + 1));
				    // need horse +1, because (x, y) specify lower-right hand
				    // corner of area to place text 
			}
			else {
				this.horseXPos[horse] += horseArr[horse].moveAmt[Math.floor(Math.random() * 11)] / 8;

				// ctx.fillRect(this.horseXPos[horse] + 20, this.y(horse), this.w / 5, this.h); // old
				ctx.fillRect(this.horseXPos[horse], this.y(horse),
						 this.headWidth, this.headHeight); // draw head
				ctx.fillRect(this.horseXPos[horse] - this.headWidth * 0 - this.neckWidth * 0,
						     this.y(horse) + this.headHeight,
						 this.neckWidth, this.neckHeight + this.bodyHeight + this.legHeight);   // draw neck, front, and front leg
				ctx.fillRect(this.horseXPos[horse] - this.headWidth * 0 - this.neckWidth * 0 - this.bodyWidth,
						this.y(horse) + this.headHeight + this.neckHeight,
						this.bodyWidth, this.bodyHeight); // draw body
				ctx.fillRect(this.horseXPos[horse] - this.headWidth *0 - this.neckWidth * 0 - this.bodyWidth,
						this.y(horse) + this.headHeight + this.neckHeight + this.bodyHeight,
						this.legWidth, this.legHeight);  // draw back Leg
				if (this.horseXPos[horse] >= finishLine) {
				    horseArr[horse].finishedRace = true;
				    this.insertByValue(finishedArr, horse);
				    // this.numFinished++;
				    // horseArr[horse].finish = this.numFinished;
				}
			}
		} // endfor
		this.assignFinishPlace(finishedArr);
	},
	
	insertByValue: function(theArray, horseNum)
	{
		var i;
		if (theArray.length == 0) {
			theArray[0] = { };
			theArray[0].horseNum = horseNum;
			theArray[0].finishXPos = this.horseXPos[horseNum];
		}
		else {
		   for (i = 0; i < theArray.length; i++) {
			  if (theArray[i].horseXPos < this.horseXPos[horseNum]) {
				  temp = theArray[i]; // copy element being displaced
				  theArray[i].horseNum = horseNum;
				  theArray[i].finishXPos = this.horseXPos[horseNum];
				  horseNum = temp.HorseNum;
			  } // endif -- found insertion position
		   } // endfor
		   // place last horse at the end of the arreay
		   theArray[i] = { };
		   theArray[i].horseNum = temp.horseNum;
		   theArray[i].finishXPos = this.horseXPos[horseNum];
		}
	},
	
	x: function(row) {
		return (row * this.w) + (row * this.gap);
	},
	y: function(col) {
		return (col * this.totalHeight) + (col * this.gap);
	},
	gradient: function(row) {
		switch(row % 3) {
		    case 0:
			    return this.gradientPurple ?
					this.gradientPurple :
						// this.makeGradient(row, '#F9064A',
						// '#c7043b');
					    this.gradientPurple = this.makeGradient(row, '#bd06f9',
						'#9604c7');
		    case 1:
			    return this.gradientRed ?
			    	this.gradientRed :
				    this.gradientRed = this.makeGradient(row, '#F9064A',
						'#c7043b');
		    case 2:
			    return this.gradientGreen ?
				    this.gradientGreen :
				    this.gradientGreen = this.makeGradient(row, '#05fa15',
						'#04c711');
		    default:
			    return this.gradientOrange ?
			    	this.gradientOrange :
					this.gradientOrange = this.makeGradient(row, '#faa105',
						'#c77f04');
		}		
	},
	
	makeGradient: function(row, color1, color2) {
		var y = this.y(row);
		//var y = 1;
		var grad = ctx.createLinearGradient(0, y, 0, y + this.h);
		grad.addColorStop(0, color1);
	    grad.addColorStop(1, color2);
		
		return grad;
	}
	};
	

    window.onload = function() {
	    Game.setup();
    };
} () );

