	
		//one object for each viz, each has a setup and an update method
		function viz13(data, id){
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
			console.log(social);

			var allLines = [];
			var xPos = parseInt(social[i][0]);
			var yPos = parseInt(social[i][1]);
			var dis = 20;


			for(i=0; i<social.length; i++){
					//console.log('X: '+xPos+' Y: '+yPos);
					allLines.push(s.line(0,yPos, vizWidth, yPos).attr({stroke:c2, strokeWidth: 1, strokeLinecap: 'round', strokeOpacity: 0.5}));
					allLines.push(s.line(xPos, 0, xPos, vizHeight).attr({stroke:c2, strokeWidth: 1, strokeLinecap: 'round', strokeOpacity: 0.5}));
					
					dis = 5+(parseInt(social[i][0])+parseInt(social[i][1]))
					allLines.push(s.line(xPos+dis,yPos,xPos+dis+parseInt(social[i][0]*3), yPos).attr({stroke:c1, strokeWidth: 5, strokeLinecap: 'round'}));
					allLines.push(s.line(xPos,yPos+dis,xPos, yPos+parseInt(social[i][1]*3)+dis).attr({stroke:c1, strokeWidth: 5, strokeLinecap: 'round'}));	
					
					xPos = xPos + parseInt(social[i][0]*3);
					yPos = yPos + parseInt(social[i][1]*3);		
			
			}
			
			
			
			
			
			
			


		
		
			//methods
			this.updateViz = function(data) {
				social = getArrayData(data, 3);
				
				xPos = parseInt(social[0][0]);
				yPos = parseInt(social[0][1]);	
				var m = 0;			
				
					for(i=0; i<allLines.length; i++){
						allLines[i].animate({y1:yPos, y2:yPos},3000, mina.easeinout);
						i++;
						allLines[i].animate({x1:xPos, x2:xPos},3000, mina.easeinout);
						i++;
						dis = 5+(parseInt(social[m][0])+parseInt(social[m][1]))
						allLines[i].animate({x1:xPos+dis, x2:xPos+dis+parseInt(social[m][0]*3)},3000, mina.easeinout);
						i++;
						allLines[i].animate({y1:yPos+dis, y2: yPos+parseInt(social[m][1]*3)+dis},3000, mina.easeinout);
						
						
						xPos = xPos + parseInt(social[m][0]*3);
						yPos = yPos + parseInt(social[m][1]*3);	
						
						m++;					
						
					}

			};
};
		


		
