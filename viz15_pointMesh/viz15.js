	
		//one object for each viz, each has a setup and an update method
		function viz15(data, id){
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
			var knowledge = getArrayData(data, 2);
			var social = getArrayData(data,3);
			var fa =3;
			var group = s.g();
			var allPaths = [];
			
			var path = 'M'+
						(vizWidth/2 - parseInt(social[0][0])*fa) +' '+
						(vizHeight/2 - parseInt(social[0][1]*fa)) +' l'+
						(fa* parseInt(social[1][0])) +' '+
						(fa* parseInt(social[1][1])) +' l'+
						(fa* parseInt(social[2][0])) +' '+
						(fa* parseInt(social[2][1])) +' l'+						
						(fa* parseInt(social[3][0])) +' '+
						(fa* parseInt(social[3][1])) +' l'+						
						(fa* parseInt(social[4][0])) +' '+
						(fa* parseInt(social[4][1]))
						// +' Z';					


			var angle= 15;
			//console.log(path);
			for(i=0; i<360/angle; i++){
				
				var newPath = s.path(path).attr({fill:c1, fillOpacity: 0.2, stroke: c2, strokeWeight: 1, strokeDasharray: '2 5'});
				newPath.attr({transform: 'r'+ (i*angle)+' '+vizWidth/2+' '+vizHeight/2 })
				
				allPaths.push(newPath);
				group.add(newPath);
				
			}

			group.attr({transform: 's1.5', opacity: 0.3});
			//s.rect(0,0,vizWidth, vizHeight).attr({fill:c2, opacity:0.5});
			
			var yPos = 0;
			var xPos = 0;
			var height = 4;
			for(i=0; i*(height+2)<vizHeight; i++){
						s.rect(xPos, yPos, vizWidth, height).attr({fill:c2, opacity: 0.2});
						yPos = yPos+height+2;
			}
			

			
			
			
			
			
			
			
			


		
		
			//methods
			this.updateViz = function(data) {
				social = getArrayData(data, 3);

				path = 'M'+
						(vizWidth/2 - parseInt(social[0][0])*fa) +' '+
						(vizHeight/2 - parseInt(social[0][1]*fa)) +' l'+
						(fa* parseInt(social[1][0])) +' '+
						(fa* parseInt(social[1][1])) +' l'+
						(fa* parseInt(social[2][0])) +' '+
						(fa* parseInt(social[2][1])) +' l'+						
						(fa* parseInt(social[3][0])) +' '+
						(fa* parseInt(social[3][1])) +' l'+						
						(fa* parseInt(social[4][0])) +' '+
						(fa* parseInt(social[4][1]))

				for(i=0; i<allPaths.length; i++){
					
					allPaths[i].animate({d: path},3000, mina.easeinout)
		
				
				}




			};
};
		


		
