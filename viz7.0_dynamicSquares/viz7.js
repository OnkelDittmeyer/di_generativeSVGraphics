	
		//one object for each viz, each has a setup and an update method
		function viz7(data, id){
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
			var bdy = getArrayData(data, 1);
			
			var pos = 10;
			var allRects = [];
			 	
			 	s.rect(0,0, vizWidth, vizHeight).attr({fill: c2, opacity: 0.5})
			 	
			var grid = vizWidth/50;
			var centerSpace = (vizHeight-(Math.floor(vizHeight/grid)*grid))/2

			 	
				for(n=0; n*grid < vizHeight; n++){
					for(i=0; i*grid < vizWidth; i++){
						//x,y,r,
						console.log
						s.circle(i*grid+grid*0.5,n*grid+grid*0.5 + centerSpace, grid*0.1).attr({fill: 'white'});		
					}
				};			 	
			 	
			 	
			 	

			 	
			
				for(i=0; i<lctn.length; i++){
					//allRects.push(s.rect(pos,pos,lctn[i][2],lctn[i][2]).attr({fillOpacity: 0.0 ,stroke: c1, strokeWidth: 5}));	
						
					allRects.push(s.rect(lctn[i][2],lctn[i][2], pos,pos).attr({fillOpacity: 0.0 ,stroke: c1, strokeWidth: 5, strokeOpacity: Math.random()*0.5+0.5}));	
					pos = pos + lctn[i][2]/2

				}
			
			

			

		
		
		
			//methods
			this.updateViz = function(data) {
			
					var lctn = getArrayData(data, 0);
					pos = 10;
					
					for(i=0; i<lctn.length; i++){
						//allRects.push(s.rect(pos,pos,lctn[i][2],lctn[i][2]).attr({fillOpacity: 0.0 ,stroke: c1, strokeWidth: 5}));	
						allRects[i].animate({x: lctn[i][2], y:lctn[i][2], height:pos, width: pos}, 1000, mina.easeinout);	
						pos = pos + lctn[i][2]/2;

					}																	
			};
};
		


		
