	
		//one object for each viz, each has a setup and an update method
		function viz_a_0_0(data, id){
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
			
			//star		
			var lifestyle = getArrayData(data, 4);
			var knowledge = getArrayData(data, 2);
			var social = getArrayData(data,3);
			var fa =3;
			var group = s.g();
			var allPaths = [];
			
			
			//lines/bargraphs
			
			var lifestyle = getArrayData(data, 4);
			var knowledge = getArrayData(data, 2);
			var social = getArrayData(data,3);

			var allLines = [];
			var xPos = 0;
			var yPos = 0;
			var height = 4;
			var width = 100;
			var skew = 50;
			var o = 0;
			
			var skewI = lifestyle[0][0]*0.5			
			
			
			
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
			
			//star
			//social

/*
			var angle= 15;
			//console.log(path);
			for(i=0; i<360/angle; i++){
				
				var newPath = s.path(path).attr({fill:c1, fillOpacity: 0.2, stroke: c2, strokeWeight: 1, strokeDasharray: '2 5'});
				newPath.attr({transform: 'r'+ (i*angle)+' '+vizWidth/2+' '+vizHeight/2 })
				
				allPaths.push(newPath);
				group.add(newPath);
				
			}

			group.attr({transform: 's1.5', opacity: 0.3});
*/
			
			
			//side lines/bargraphs
			//lifestyle + knowledge
			
			for(i=0; i*(height+2)<vizHeight; i++){
						s.rect(xPos, yPos, vizWidth, height).attr({fill:c2, opacity: 0.2});
						yPos = yPos+height+2;
			}			
			
						
			yPos = 0;
			
			for(n=0; n<lifestyle.length; n++){
				for(i=0; i<lifestyle[n].length; i++){
						skewI = lifestyle[n][i]*0.5;
						s.polygon(xPos,yPos, xPos, yPos+height, xPos+lifestyle[n][i], yPos+height+skewI, lifestyle[n][i], yPos+skewI).attr({fill:'white'});
						yPos = yPos+height+5;			

			
						if(o<5){
							//console.log(knowledge[i][0])
							skewI = (knowledge[i][0]*10)*0.5;

							s.line(xPos,yPos,knowledge[i][0]*10, yPos+skewI).attr({stroke:c1, strokeWidth: 1, strokeDasharray: '5 5'});
							yPos = yPos+5;
							o++;
						}
				}			
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
		


		
