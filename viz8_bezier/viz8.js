	
		//one object for each viz, each has a setup and an update method
		function viz8(data, id){
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
			var allPaths = [];
			var pathsHeight = vizHeight;
			
			var sum1 = 0;
			var sum2 = 0;
			var scale1 = 0;
			var scale2 = 0;
			
			
			//console.log(lctn);
			for(n = 0; n<lctn.length; n++){
			
				if(lctn[n][2]>=sum1){ sum1 = lctn[n][2]};
				if(lctn[n][3]>=sum2){ sum2 = lctn[n][3]};
				
				//sum1 = sum1 + parseInt(lctn[n][2]);
				//sum2 = sum2 + parseInt(lctn[n][3]);			
			}
			
			scale1 = vizHeight/sum1;
			scale2 = vizHeight/sum2;
			
			
			//for(i = 0; i<lctn.length; i++){			
				//X, Y , Cx1 Cy1, Cx2, Cy2, X2, Y2 
				//var path = 'M'+parseInt(lctn[i][2])*scale1+' 0C'+ parseInt(lctn[i][2])*scale1 +' '+ pathsHeight/2 +' '+ parseInt(lctn[i][3])*scale2+ ' '+ pathsHeight/2+ ' '+  parseInt(lctn[i][3])*scale2 +' '+ pathsHeight;
				//allPaths.push(s.path(path).attr({fillOpacity: 0.0, stroke: c1, strokeWidth: 10, strokeOpacity: 0.3}))		
			//};
			
			posX = 10;
			
			 //grid
			var grid = vizWidth/50; 
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					s.circle(i*grid+grid*0.5,n*grid+grid*0.5, grid*0.1).attr({fill: c2});		
				}
			};			
			
			
			for(i = 0; i<lctn.length; i++){			
				//X, Y , Cx1 Cy1, Cx2, Cy2, X2, Y2 
				var path = 	'M'+
							posX
							+' 0C'+
							posX +' '+
							parseInt(lctn[i][2])*scale1 +' '+
							(vizWidth-posX) +' '+
							parseInt(lctn[i][3])*scale1 +', '+
							(vizWidth-posX) +', '+
							vizHeight;
								
				allPaths.push(s.path(path).attr({fillOpacity: 0.3, fill:c1, stroke: c2, strokeWidth: 1, strokeOpacity: 0.5}))
				posX = posX +10;		
			};			
	

			
			

			

		
		
		
			//methods
			this.updateViz = function(data) {
				lctn = getArrayData(data, 0);

				posX = 10;
				for(i = 0; i<lctn.length; i++){			
					//X, Y , Cx1 Cy1, Cx2, Cy2, X2, Y2 
					var path = 	'M'+
								posX
								+' 0C'+
								posX +' '+
								parseInt(lctn[i][2])*scale1 +' '+
								(vizWidth-posX) +' '+
								parseInt(lctn[i][3])*scale1 +', '+
								(vizWidth-posX) +', '+
								vizHeight;
								
					allPaths[i].animate({d: path}, 2000, mina.easeinout);
					posX = posX +10;		
				};

					
																					
			};
};
		


		
