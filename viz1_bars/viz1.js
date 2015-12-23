	
		//one object for each viz, each has a setup and an update method
		function viz1(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
			

			
			var data = data;
			
			//console.log(data);
			
			
			// create svg canvas for new viz and place it in document
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				//svg.setAttribute('style', 'border: 1px solid white');
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
			this.s.rect(0,0, vizWidth, vizHeight).attr({fill:'white'});
			var allRects = [];
			
			this.xPos = 0;
			var scale = vizWidth/locationSum(data);
			//console.log(data[1][0]);



			
			
			for(i = 0; i<data.length; i++){
			
				//console.log(this.xPos +','+ 0 +','+ scale*parseInt(data[i][2])+','+evaluateMachine(data[i][0]))
					 
	   			allRects.push(this.s.rect(this.xPos, 0, scale*parseInt(data[i][2]), vizHeight)
	   									 	.attr({fill: c1, opacity: evaluateMachine(data[i][0])})
	   								);
	   																					
	   			this.xPos = this.xPos + scale*parseInt(data[i][2]);	 
	   			
	   			
	   			//console.log(this.xPos +','+ 0 +','+ scale*parseInt(data[i][3])+' , '+evaluateTech(data[i][1]))

	   			
	   			allRects.push(this.s.rect(this.xPos, 0, scale*parseInt(data[i][3]), vizHeight)
	   									 	.attr({fill: c1, opacity: evaluateTech(data[i][1])})
	   								);
	   																					
	   			this.xPos = this.xPos + scale*parseInt(data[i][3]);			  	
	 	  	};
									
	
			//createCrossHair(this.s, vizWidth/2, vizHeight/2 , 1, c2);
	
	
			
			//relationsgröße verändern!
		
			//methods
			this.updateViz = function(array) {

						var data = array;
						//console.log(array);
						var n = 0;
						var oldscale = scale;
						var newXpos = 0;
						scale = vizWidth/locationSum(data);

						for(i = 0; i< data.length; i++){

							allRects[n].animate({ width:parseInt(data[i][2])*scale, x: newXpos, opacity:evaluateMachine(data[i][0])},3000, mina.easeinout);
							newXpos = newXpos + parseInt(data[i][2])*scale
							n++;
							allRects[n].animate({ width:parseInt(data[i][3])*scale, x: newXpos, opacity:evaluateTech(data[i][1])},3000, mina.easeinout);
							newXpos = newXpos + parseInt(data[i][3])*scale							
							n++;				
						}
						
					//}		
				//)
			};		
		
		
		
};
		


		
