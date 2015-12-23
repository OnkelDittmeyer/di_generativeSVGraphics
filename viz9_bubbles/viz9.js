	
		//one object for each viz, each has a setup and an update method
		function viz9(data, id){
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
			var s = Snap('#'+id);
			
			
			var lctn = getArrayData(data, 0);

			 //grid
			var grid = vizWidth/50; 
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					s.circle(i*grid+grid*0.5,n*grid+grid*0.5, grid*0.1).attr({fill: c2});		
				}
			};			
			
			
			var circSize = vizHeight/4;
			var allCircles = [];
			var interests = getArrayData(data, 4);

			
			for(i = 0; i<interests.length; i++){
				allCircles.push(s.circle(vizWidth/2-circSize/2-interests[(i+4)%3][0]*0.1,vizHeight/2-circSize/2,interests[i][0]*0.5)
					.attr({fill: c1, fillOpacity:0.2, stroke: c2, strokeOpacity:0.0}));
					
					allCircles.push(s.circle(vizWidth/2+circSize/2+interests[(i+4)%3][1]*0.1,vizHeight/2-circSize/2,interests[i][1]*0.5)
					.attr({fill: c1, fillOpacity:0.2, stroke: c2, strokeOpacity: 0.0}));	
						
						allCircles.push(s.circle(vizWidth/2-circSize/2-interests[(i+4)%3][2]*0.1,vizHeight/2+circSize,interests[i][2]*0.5)
						.attr({fill: c1, fillOpacity:0.2, stroke: c2, strokeOpacity: 0.0}));	
							
							allCircles.push(s.circle(vizWidth/2+circSize/2+interests[(i+4)%3][3]*0.1,vizHeight/2+circSize,interests[i][3]*0.5)
							.attr({fill: c1, fillOpacity:0.2, stroke: c2, strokeOpacity: 0.0}));			
					
			};

			
			

			

		
		
		
			//methods
			this.updateViz = function(data) {
				interests = getArrayData(data, 4);

				for(n=0; n<allCircles.length; n++){
					allCircles[n].animate({r: interests[Math.floor(n/4)][n%4]*0.5}, 3000, mina.easeinout);	
				};																					
			};
};
		


		
