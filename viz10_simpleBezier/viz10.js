	
		//one object for each viz, each has a setup and an update method
		function viz10(data, id){
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
			
			
			var social = getArrayData(data, 3);
			var allPaths = [];
			var pathsHeight = vizHeight;
			

		
			
			
			
			 //grid
			

			var scale = vizHeight/maxNumArr(social);			
			for(i = 0; i<social.length; i++){
			
				var path = 	'M-20 '+
							i*(vizHeight/(social.length-1))
							+' C'+ (vizWidth/2)+' '+ 
							social[i][0]*scale +' '+//i*(vizHeight/social.length)+' '+	//second value
							(vizWidth/2) +' '+
							social[i][1]*scale +' '+//first value
							(vizWidth+20) +' '+
							i*(vizHeight/(social.length-1));
				
				
				
					allPaths.push(s.path(path).attr({fillOpacity: 0.0, fill:c1, stroke: c2, strokeWidth: 50, strokeOpacity: 0.5, strokeCap: 'round'}))		
				
				
			
			};			
			
	
	
			var grid = vizWidth/50; 
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					s.rect(i*grid, n*grid, grid/4, grid/4).attr({fill: 'white'});		
				}
			};
			
			

			

		
		
		
			//methods
			this.updateViz = function(data) {
				social = getArrayData(data, 3);
				scale = vizHeight/maxNumArr(social);			


				posX = 10;

				for(i = 0; i<allPaths.length; i++){			
					var path = 	'M-20 '+
							i*(vizHeight/(social.length-1))
							+' C'+ (vizWidth/2)+' '+ 
							social[i][0]*scale +' '+//i*(vizHeight/social.length)+' '+	//second value
							(vizWidth/2) +' '+
							social[i][1]*scale +' '+//first value
							(vizWidth+20) +' '+
							i*(vizHeight/(social.length-1));
				
					
					allPaths[i].animate({d: path}, 3000, mina.easeinout);

				
				};


					
																					
			};
};
		


		
