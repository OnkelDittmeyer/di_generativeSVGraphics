	
		//one object for each viz, each has a setup and an update method
		function viz2(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
			

			
			var data = data;
			data[0] = data[0][0].split(',');
			//console.log(data);

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

			// 7values
			var grid = vizWidth/3
			var posX = 0;
			var posY = 0;
			
			var allLines = [];
			var scale = vizWidth/arraySum(data)*0.15;
			
				this.s.rect(0,0, vizWidth, vizHeight).attr({fill: c2, opacity: 0.5});
			
				for(i = 0; i<data[0].length; i++){
					//console.log('From: '+ posX +','+ posY +' To: '+ posX+grid +','+ posY+grid )
					//console.log(posX +','+ posY);

					allLines.push(this.s.line(posX, posY, posX+grid, posY+vizHeight)
												.attr({stroke: 'white', strokeWidth:'5px',
	 												strokeLinecap: 'square', opacity: '1'})
									);
								
					//console.log(scale);
					//console.log(parseInt(data[0][i])*scale);
					posX = posX+(parseInt(data[0][i])*scale);
					
							
				};


			createCrossHair(this.s, vizWidth/6, vizHeight/2, 1, c1);





		
			//methods


			this.updateViz = function(array) {
						data = array;
						data[0] = data[0][0].split(',');

						//console.log(array);
						scale = vizWidth/arraySum(data)*(parseInt(data[1][0])*0.001);
						//console.log(scale);
						
						
						var posX = 0;
						//console.log(posX);
						
						for(i = 0; i<allLines.length;i++){
						
							allLines[i].animate({x1: posX, x2: posX+grid}, 3000, mina.easeinout);
							posX = posX+(parseInt(data[0][i])*scale);							
						
						}						
							
				
			};

		
		
		
		
};
		


		
