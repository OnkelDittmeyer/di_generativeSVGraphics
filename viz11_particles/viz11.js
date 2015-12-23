	
		//one object for each viz, each has a setup and an update method
		function viz11(data, id){
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
			
			
			var	lifestyle = getArrayData(data, 4);
			var oldData = lifestyle;

	
/*
			var grid = vizWidth/10; 
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					s.rect(i*grid, n*grid, grid/5, grid/5).attr({fill: c1});		
				}
			};
*/
			
			
			
			var numP = 50;
			var allP = [];
			var pWidth = vizWidth;
			var pHeight = vizHeight;
			var xCenter = vizWidth/2
			var yCenter = vizHeight/2;
			

			for(i = 0; i<numP; i++){
			
				allP.push(s.circle(Math.random()*pWidth, Math.random()*pHeight, 2).attr({fill: c1}));
			
			}		

		
		
		
			//methods
			this.updateViz = function(data) {
				lifestyle = getArrayData(data, 4);
				

				for(i = 0; i<allP.length; i++){
					
					xRange = Math.random()*lifestyle[(Math.floor(i/numP))][0]*0.01*vizWidth;
					yRange = Math.random()*lifestyle[(Math.floor(i/numP))][1]*0.01*vizHeight;
		
						if(
							oldData[(Math.floor(i/numP))][0]	!=	lifestyle[Math.floor(i/numP)][0] || 
							oldData[(Math.floor(i/numP))][1]	!=	lifestyle[Math.floor(i/numP)][1]
						){	
						
							//console.log(Math.random()*lifestyle[(Math.floor(i/numP))][0]);
							allP[i].animate({cx: xCenter + Math.random()*lifestyle[(Math.floor(i/numP))][0], cy: yCenter, transform: 'r'+ Math.random()*360 +' '+xCenter+' '+yCenter}, 3000, mina.easeinout)
							//allP[i].animate({cx: xRange, cy: yRange}, 3000, mina.easeinout);
						}
									
				};
				
				oldData = lifestyle;

			};
};
		


		
