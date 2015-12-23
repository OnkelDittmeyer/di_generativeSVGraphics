	
		//one object for each viz, each has a setup and an update method
		function viz6(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
			

			
			this.data = data;
			//this.fullLength = 0;
			this.fullHeight = 0;
			this.allRects = [];
			window.allBars = [];
						
			
			// create svg canvas for new viz and place it in document
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				//svg.setAttribute('style', 'border: 3px solid black');
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
			var knwldg = getArrayData(data, 2);


			var s = Snap('#'+id);
			
			var xPos = 0;
			var yPos = 20;
			var i = 0;

			
			var ani = setInterval(function(){
				var rotation = knwldg[i][0];
				s.line( xPos, yPos, xPos, yPos+60).attr({stroke: c1, strokeWidth: 1, opacity:0.3, transform: 'r'+rotation });
				xPos = xPos + 3;
				i = (i+1)%knwldg.length;
			
			}, 100);			
			

			

		
		
		
			//methods
			this.updateViz = function(data) {
			
				knwldg = getArrayData(data, 2);
				clearInterval(ani);
				var rect = null;
				var n = 0;
				
				ani = setInterval(function(){
					rect = s.rect(0,0,vizWidth,vizHeight).attr({fill: 'white', opacity: 0});
					var rotation = knwldg[i][0];
					s.line( xPos, yPos, xPos, yPos+60).attr({stroke: c1, strokeWidth: 1, opacity:0.3, transform: 'r'+rotation });
					
					if(xPos > vizWidth){ 
						xPos = 0; rect.animate({opacity: 0.5}, 2000);						 
						if(yPos > vizHeight-80){
							yPos = 20
						}else{
							yPos = yPos+30
							}
					}else{
						xPos = xPos + 2;
						}
					
					i = (i+1)%knwldg.length;

			
				}, 100);
				
				
				
																		
			};
			
			
			
			
			
			

			
				
		
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
		


		
