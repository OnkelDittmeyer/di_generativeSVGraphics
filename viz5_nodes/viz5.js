	
		//one object for each viz, each has a setup and an update method
		function viz5(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
			

			
			this.data = data;
			//this.fullLength = 0;
			this.fullHeight = 0;
			this.allRects = [];
			window.allBars = [];
						
			
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
			
			var grid = vizWidth/20;
			var centerSpace = (vizHeight-(Math.floor(vizHeight/grid)*grid))/2
			
			var knwldg = getArrayData(data, 2);
						
			//knowledge values
/*
			for(m=0; m<knwldg.length; m++){
				this.s.line(m*grid + grid*0.5, 0, m*grid + grid*0.5, grid*Math.floor(parseInt(knwldg[m][0])/10)-grid*0.5).attr({stroke: c2, strokeWidth: 2});
				
				this.s.line(m*grid + grid*0.5, 
							grid*Math.floor(parseInt(knwldg[m][0])/10)-grid*0.4, 
							grid*(parseInt(knwldg[m][0])%(Math.floor(parseInt(knwldg[m][0])/10)*10))-grid*0.5, 
							grid*Math.floor(parseInt(knwldg[m][0])/10)-grid*0.4)
							.attr({stroke: c2, strokeWidth: 2});	
			};
*/
			
			
			//pedometer
			var steps = getArrayData(data, 1);
			var allLines = [];
			var allLinesOld = [];

			steps = steps[0][0].split(',');
			this.s.rect(0,0,vizWidth, vizHeight).attr({fill: c1, opacity: 0.2});
	
			 //grid

			
				for(i=0; i*grid -grid*0.5 < vizWidth; i++){
					//x,y,r,
					this.s.line(grid*i -grid*0.5 , 0, grid*i - grid*0.5, vizHeight).attr({stroke: c2, strokeWeight: 0.8, opacity:0.5});
					this.s.line(grid*i, 0, grid*i, vizHeight).attr({stroke:'white', strokeWeight: 0.2, opacity:0.1});
					
					this.s.line(0, grid*i -grid*0.5 + +centerSpace, vizWidth, grid*i -grid*0.5).attr({stroke: c2, strokeWeight: 0.8, opacity:0.5});		
					this.s.line(0, grid*i +centerSpace, vizWidth, grid*i).attr({stroke: 'white', strokeWeight: 0.2, opacity:0.1});		
				};	
	

			
			for(i=0; i<steps.length; i++){
					var p = 1;
					var int = 0;
					var xPos = 0;
					var yPos = grid*-0.4;
					var yPosNew = 0;
					var xPosNew = 0;
					
					xPos = i*grid + grid*0.5;
					
					for(p = 1; p<=steps[i].length; p++){
						
						int = parseInt(steps[i].charAt(steps[i].length-p));
						if(int == 0){int++;};
						//console.log('Number:'+ i +' Step: '+ p +' Number: '+ int);
						
						if(p%2==1){
							if(yPos<vizHeight/2){yPosNew = yPos + grid*(int)}else{yPosNew = yPos - grid*(int)};
							allLines.push(this.s.line(xPos, yPos, xPos, yPosNew ).attr({stroke: c2, strokeWidth: 2}));
							yPos = yPosNew;
						}else{
							if(xPos<vizWidth/2){xPosNew = xPos + grid*(int)}else{xPosNew = xPos - grid*(int)};
							allLines.push(this.s.line(xPos, yPos, xPosNew, yPos).attr({stroke: c2, strokeWidth: 2}));
							xPos = xPosNew;												
						}					
					}														
			};			
			
			
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					console.log
					this.s.circle(i*grid+grid*0.5,n*grid+grid*0.5 + centerSpace, grid*0.25).attr({fill: c1});			
				}
			};
		

				
			createCrossHair(this.s, vizWidth/2, vizHeight/2, 0.8);
			

		
		
		
			//methods
			this.updateViz = function(data) {
			
			var newSteps = getArrayData(data, 1);
			newSteps = newSteps[0][0].split(',');
			
			for(i=0; i<newSteps.length; i++){
					var p = 1;
					var n = 0;
					var int = 0;
					var xPos = 0;
					var yPos = grid*-0.4;
					var yPosNew = 0;
					var xPosNew = 0;
					
					xPos = i*grid + grid*0.5;
					
					for(p = 1; p<newSteps[i].length; p++){
						int = 1+parseInt(newSteps[i].charAt(newSteps[i].length-p));
						

						if(int =! 1+parseInt(steps[i].charAt(newSteps[i].length-p))){

							if(p%2==1){
									if(allLinesOld[n]!=null){allLinesOld[n].animate({opacity:0.0}, 3000);};
									if(allLines[n]!=null){allLines[n].animate({opacity:0.5}, 3000);};
									allLinesOld[n] = allLines[n]
							
									if(yPos<vizHeight/2){yPosNew = yPos + grid*int}else{yPosNew = yPos - grid*int};
									allLines[n] = this.s.line(xPos, yPos, xPos, yPosNew ).attr({stroke: c2, strokeWidth: 2});
									yPos = yPosNew;	
									n++;
							}else{
								//if(allLinesOld[n]!=null){allLinesOld[n].animate({opacity:0.0}, 3000);};
								//allLines[n].animate({opacity:0.5}, 3000);
								//allLinesOld[n] = allLines[n]
							
							
								if(xPos<vizWidth/2){xPosNew = xPos + grid*int}else{xPosNew = xPos - grid*int};
								allLines[n] = this.s.line(xPos, yPos, xPosNew, yPos).attr({stroke: c2, strokeWidth: 2});
								xPos = xPosNew;	
								n++;											
							}
												
						}
					
					}														
			};
			
			
			
			
			
			
			}
			
				
		
			function createVerticalBar(canvas, array, width, x){
					var canvas = canvas
					var data = array;
					var barWidth = width;
					var xPos = x;
					var yPos = 0;
					var scale = vizHeight/locationSum(data);
					
					canvas.rect(xPos-5, yPos, barWidth+10, vizHeight).attr({fill: 'white'});
					
					
					
		
			
					for(n = 0; n<data.length; n++){	
						//console.log('xPos: '+ xPos +'yPos:'+ yPos +', Height: '+ data[n]*scale +'Width: '+ barWidth);
				
							allBars.push(canvas.rect(xPos, yPos, barWidth, parseInt(data[n][2])*scale)
													.attr({fill: c2, opacity: evaluateMachine(data[n][0])}));	
				
							yPos = yPos + parseInt(data[n][2])*scale;
							
							allBars.push(canvas.rect(xPos, yPos, barWidth, parseInt(data[n][3])*scale)
													.attr({fill: c2, opacity: evaluateTech(data[n][1])}));
													
							yPos = yPos + parseInt(data[n][3])*scale;																
					}			
			};		
		
		
		
		
		
		
		};
		


		
