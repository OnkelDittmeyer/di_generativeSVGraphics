	
		//one object for each viz, each has a setup and an update method
		function viz4(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
			

			
			this.data = data;
			//this.fullLength = 0;
			this.fullHeight = 0;
			this.allRects = [];
			var allBars = [];
						
			
			// create svg canvas for new viz and place it in document
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				svg.setAttribute('style', 'border: 3px solid white');
				svg.setAttribute('width', vizWidth);
				svg.setAttribute('height', vizHeight);
				svg.setAttribute("id", id);
				svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
				document.body.appendChild(svg);
				
				document.getElementById(id).style.position = "absolute";
				document.getElementById(id).style.left = 
				border+(border*0.5)*(numberOfViz%rows) + vizWidth*(numberOfViz%rows)+'px';
				document.getElementById(id).style.top = 
				border+(border*0.5)*(Math.floor(numberOfViz/rows)) + vizHeight*(Math.floor(numberOfViz/rows))+'px';				
				
				//svg.style.left = border*numberOfViz + vizWidth*numberOfViz+'px';
				//svg.style.top = border*numberOfViz + vizHeight*numberOfViz+'px';
			
			numberOfViz++;

			
			
			
			//creates graphic and actual viz			
			this.s = Snap('#'+id);
			this.s.rect(0,0, vizWidth, vizHeight).attr({fill:'white'});
			
			
			var rndData = createTwoArray(5);
			//knowledge multiplicator
			var km = getArrayData(data, 2);

			var scaleY = Math.round(vizHeight/rndData.length);
			

			
			
			
/*
			var offSetY = 8;
			var grid = (vizWidth-offSetY)/50;
			var centerSpace = (vizHeight-(Math.floor(vizHeight/grid)*grid))/2
 
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					this.s.circle(i*grid+grid*0.5,n*grid+grid*0.5 + centerSpace, grid*0.1).attr({fill: c1});		
				}
			};
*/			
			
			
			
			for(n = 0; n<rndData.length;n++){
				this.fullLength = 0;
				var sum = arraySum(rndData[n]);
				var scaleX = Math.round(vizWidth/sum);

				for(i = 0; i<rndData[n].length; i++){
						this.allRects.push(this.s.rect(this.fullLength, this.fullHeight,parseInt(rndData[n][i])*scaleX, scaleY)
													.attr({fill: c2, opacity: Math.random()*parseInt(km[i][0])*0.01})
						);
						this.fullLength = this.fullLength + parseInt(rndData[n][i])*scaleX;
											
				}
				this.fullHeight +=scaleY; 
			};
			
			



			scaleX = vizWidth/rndData.length;
			var fullLength = 0;
 
			for(n = 0; n<rndData.length; n++){
				var fullHeight = 0;
				sum = arraySum(rndData[n]);
				scaleY = vizHeight/sum;
			
				for(i = 0; i<rndData[n].length; i++){
					//console.log(parseInt(rndData[n][i])*scaleY);
					this.allRects.push(this.s.rect(fullLength, fullHeight, scaleX, parseInt(rndData[n][i])*scaleY)
											.attr({fill: c2, opacity: Math.random()*parseInt(km[i][0])*0.1})
					);
					fullHeight = fullHeight + parseInt(rndData[n][i])*scaleY;
				}
				fullLength = fullLength + scaleX;			
			};



							
			//createVerticalBar(this.s, getArrayData(data, 0), 70, 0);
		
			//createCrossHair(this.s, vizWidth/2, vizHeight/2);
			
/*
			//body
			var bodyRects = [];
			var km = getArrayData(data, 1);
			var posX=00;
			km[0]= km[0][0].split(',');
			console.log(km);
			
			
			for(i=0; i<km[0].length; i++){
					posX = posX + parseInt(km[0][i])*0.01;
					console.log(parseInt(km[0][i])*0.01);
					bodyRects.push(this.s.line(posX,-10,posX+parseInt(km[1][0]),vizHeight+10).attr({stroke: c1, strokeWidth: 5}))					
			}
*/			
			
			
			

		
		
		
			//methods
			this.updateViz = function(data) {
			
				var knwldg = getArrayData(data, 2);
				//console.log('update viz');
				for(i = 0; i<this.allRects.length; i++){
					this.allRects[i].animate({opacity: parseInt(knwldg[i%5][0])*0.05},3000);									
				};
				
				var lctn = getArrayData(data, 0);
				var scale = vizHeight/locationSum(getArrayData(data, 0));
				var yPos = 0;
				var m = 0;
				
				
				for(n = 0; n<lctn.length; n++){
					//console.log(lctn[n][2] +','+ scale)
					allBars[m].animate({height: parseInt(lctn[n][2])*scale, opacity: evaluateMachine(lctn[n][0]), y: yPos},4000);
					//allBars[m+(allBars.length/2)].animate({height: parseInt(lctn[n][2])*scale, opacity: evaluateMachine(lctn[n][0]), y: yPos},4000);
					
					
					yPos = yPos + parseInt(lctn[n][2])*scale;
					m++;
					
					allBars[m].animate({height: parseInt(lctn[n][3])*scale, opacity: evaluateTech(lctn[n][1]), y: yPos},4000);
					//allBars[m+(allBars.length/2)].animate({height: parseInt(lctn[n][3])*scale, opacity: evaluateTech(lctn[n][1]), y: yPos},4000);

					yPos = yPos + parseInt(lctn[n][3])*scale;
					m++;				
				}										
			};	
			
			
			
			
			
				
		
			function createVerticalBar(canvas, array, width, x){
					var canvas = canvas
					var data = array;
					var barWidth = width;
					var xPos = x;
					var yPos = 0;
					var scale = vizHeight/locationSum(data);
					
					canvas.rect(xPos-2, yPos, barWidth+4, vizHeight).attr({fill: 'white'});
			
					for(n = 0; n<data.length; n++){	
						//console.log('xPos: '+ xPos +'yPos:'+ yPos +', Height: '+ data[n]*scale +'Width: '+ barWidth);
				
							allBars.push(canvas.rect(xPos, yPos, barWidth, parseInt(data[n][2])*scale)
													.attr({fill: c1, opacity: evaluateMachine(data[n][0])}));	
				
							yPos = yPos + parseInt(data[n][2])*scale;
							
							allBars.push(canvas.rect(xPos, yPos, barWidth, parseInt(data[n][3])*scale)
													.attr({fill: c1, opacity: evaluateTech(data[n][1])}));
													
							yPos = yPos + parseInt(data[n][3])*scale;																
					}			
			};		
		
		
		
		
		
		
		};
		


		
