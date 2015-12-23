	
		//one object for each viz, each has a setup and an update method
		function viz9_1(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
			

			
			this.data = data;
			//this.fullLength = 0;
			this.fullHeight = 0;
			this.allRects = [];
			window.allBars = [];
						
			
			// create svg canvas for new viz and place it in document
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				//svg.setAttribute('style', 'border: 1px solid black');
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
			
			
			var lifestyle = getArrayData(data, 4);

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
			var gridC = vizWidth/(lifestyle.length+1);
			var posX = gridC;
			var sum = arraySum(lifestyle);
			
			
			for(i = 0; i<lifestyle.length; i++){

				for(m = 1; m<lifestyle[i].length; m++){						
					//console.log('i: '+i+' , m: '+m);
					allCircles.push(s.circle(posX, vizHeight/2, lifestyle[i][m]*0.5).attr({fill: c1,stroke: c1, fillOpacity: 0.2, strokeOpacity: 0.3}));

				};
				posX = posX + gridC
					
			};

			
			

			

		
		
		
			//methods
			this.updateViz = function(data) {
				interests = getArrayData(data, 4);
				
				for(i=1; i<=allCircles.length; i++){
						allCircles[(allCircles.length-i)].remove();
		
				}


																					
			};
};
		


		
