	
		//one object for each viz, each has a setup and an update method
		function viz14(data, id){
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

			var allLines = [];
			var xPos = 0;
			var yPos = 0;
			var height = 4;
			var width = 100;
			var skew = 50;
			var o = 0;
			
			var skewI = lifestyle[0][0]*0.5
			
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

			
			xPos = vizWidth - 20;
			yPos = 20;
			
			for(n=0; n<social.length;n++){
				for(m=0; m<social[n].length; m++){
				
					s.rect(xPos, yPos, social[n][m], social[n][m] ).attr({fill: c1, opacity: parseInt(social[m][1])*0.1});
					yPos  = yPos + parseInt(social[n][m]*2);
			
				}			
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
		


		
