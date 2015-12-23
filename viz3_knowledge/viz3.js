	
		//one object for each viz, each has a setup and an update method
		function viz3(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
			

			
			var data = data;
			//console.log(data);
			
			
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
			this.s = Snap('#'+id);

			var allBars = [];
			var posX = -20;
			var scale = vizHeight/maxNumArr(data);
			var barWidth = vizWidth/data.length +20
			this.s.rect(0,0,vizWidth,vizHeight).attr({fill: c1, opacity: 0.5});
			
			
			for(i = 0; i<data.length; i++){
				allBars.push(this.s.rect(posX, vizHeight/2-(parseInt(data[i][0])*scale/2), barWidth, parseInt(data[i][0])*scale)
					.attr({fill: c2, opacity:0.5})
				);
				
				allBars.push(this.s.rect(posX, 0-(parseInt(data[i][0])*scale/2), barWidth, parseInt(data[i][0])*scale)
					.attr({fill: c2, opacity:0.5})
				);
				allBars.push(this.s.rect(posX, vizHeight-(parseInt(data[i][0])*scale/2), barWidth, parseInt(data[i][0])*scale)
					.attr({fill: c2, opacity:0.5})
				);				
				
				
				posX = posX + barWidth-10;
			
			};
			
			createCrossHair(this.s, 0, vizHeight/2, 1.5, c1);
			createCrossHair(this.s, vizWidth, vizHeight/2, 1.5, c1);






		
			//methods


			this.updateViz = function(array) {


						var newData = array;
						//console.log(data);
/*
						var n = 0;
						var check = 0;

						for(i = 0; i<allBars.length; i++){
							
							check = i%3;
							scale = vizHeight/maxNumArr(newData);
							
							
							
							
							if(check==0){
								allBars[i].animate({ height: parseInt(newData[n][0])*scale},3000);
							}
							

							switch(check){
							
								case 0:
									allBars[i].animate({ height: parseInt(data[n][0])*scale, 
												y: vizHeight/2-(parseInt(data[n][0])*scale/2)
												},3000);
									break;
									
								case 1:
									allBars[i].animate({ height: parseInt(data[n][0])*scale, 
												y: 0-(parseInt(data[n][0])*scale/2)
												},3000);
									break;									
								case 2:
									allBars[i].animate({ height: parseInt(data[n][0])*scale, 
												y: vizHeight-(parseInt(data[n][0])*scale/2)
												},3000);
									n++;			
									break;								
									
							
							}

						
						}
												
*/								
				
			};

		
	
		
		
};
		


		
