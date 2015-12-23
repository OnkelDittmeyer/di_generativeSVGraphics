	
		//one object for each viz, each has a setup and an update method
		function viz12(data, id){
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
			
			var body = getArrayData(data, 1);
			body[0]= body[0][0].split(',');
			
			var lifestyle= getArrayData(data, 4)
			var allLines = [];
			
			
/*
			for(i=0; i<body[0].length; i++){
			allLines.push(s.line(vizWidth/2, vizHeight/2, vizWidth/2+(body[0][i]/(body[1][0]*5)+(body[2][0]/10)), vizHeight/2).attr({stroke: c2, strokeWidth:3, strokeOpacity: 0.5, strokeLinecap: 'round', transform: 'r'+(i*(360/body[0].length)+15)+' '+vizWidth/2+' '+vizHeight/2}));		
			}

			s.circle(vizWidth/2, vizHeight/2, (body[2][0]/10)).attr({fill: 'white', stroke:c2, strokeWidth: 3});
*/
			var angle = 1;

			for(i=0; i<lifestyle.length; i++){
			
				for(n=0; n<lifestyle[i].length; n++){
					allLines.push(s.line(vizWidth/2, vizHeight/2, vizWidth/2+(lifestyle[i][n]*0.5+5), vizHeight/2).attr({stroke: c1, strokeWidth:3, strokeLinecap: 'round', strokeOpacity: 0.3*(i+1),  transform: 'r'+(angle+n)*(360/(lifestyle.length*lifestyle[0].length))+' '+vizWidth/2+' '+vizHeight/2}));		
					//console.log((angle+n)*(360/(lifestyle.length*lifestyle[0].length)));
				}
				angle = angle+n;
			}

			s.circle(vizWidth/2, vizHeight/2, 10).attr({fill: 'white', stroke:c1, strokeWidth: 3});			
		
		
		
			//methods
			this.updateViz = function(data) {
				lifestyle = getArrayData(data, 4);
				
				for(i=0; i<allLines.length; i++){
					allLines[i].animate({x2: vizWidth/2+(lifestyle[(Math.floor(i/4))][i%4]*0.5+5)}, 3000);
				
				}
				



			};
};
		


		
