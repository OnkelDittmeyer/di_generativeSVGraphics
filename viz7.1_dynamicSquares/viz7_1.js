	
		//one object for each viz, each has a setup and an update method
		function viz7_1(data, id){
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
			
			var pos = 10;
			var allRects = [];
			var allRects2 = [];
			var allBars = [];

			
			var offSetY = 8;
			var grid = (vizWidth-offSetY)/50;
			var centerSpace = (vizHeight-(Math.floor(vizHeight/grid)*grid))/2
			
			//barchart
			var bdy = getArrayData(data,1); 			
			bdy[0] = bdy[0][0].split(',');
			var scale = vizWidth / arraySum(bdy[0]);
			var xPos = 0;			
			
			 	
			s.rect(0,0+offSetY, vizWidth, vizHeight).attr({fill: c2, opacity: 0.5});
			 	


			 //grid
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					s.circle(i*grid+grid*0.5,n*grid+grid*0.5 + centerSpace, grid*0.1).attr({fill: 'white'});		
				}
			};			 	
			 	
			 	

				//whitesquares
				pos = vizWidth - 10;
				for(i=0; i<lctn.length; i++){						
					allRects2.push(s.rect(vizWidth-lctn[i][3],vizHeight-lctn[i][3], pos,pos).attr({fillOpacity: 0.0 ,stroke: 'white', strokeWidth: 4, strokeOpacity: evaluateTech(lctn[i][1])*2}));	
					pos = pos + lctn[i][2]/2;
				};

			 	
			 	//bluesquares
				pos = 10
				for(i=0; i<lctn.length; i++){						
					allRects.push(s.rect(lctn[i][2],parseInt(lctn[i][2])+offSetY, pos,pos).attr({fillOpacity: 0.0 ,stroke: c1, strokeWidth: 5, strokeOpacity: evaluateMachine(lctn[i][0])*2}));	
					pos = pos + lctn[i][2]/2;
				};



				//barsTop
				s.rect(xPos, 0, vizWidth, grid).attr({fill: 'white'});
				for(m = 0; m<bdy[0].length; m++){
					allBars.push(s.rect(xPos, -1,  parseInt(bdy[0][m])*scale, grid).attr({fill: c1, opacity: Math.random()*0.5}))
					xPos = xPos + parseInt(bdy[0][m])*scale;
				
				}



			
			

			

		
		
		
			//methods
			this.updateViz = function(data) {
			
					var lctn = getArrayData(data, 0);

					pos = vizWidth - 10;
					for(n=0; n<lctn.length; n++){						
						allRects2[n].animate({x: vizWidth-lctn[n][3], y: vizHeight-lctn[n][3], height: pos, width:pos, strokeOpacity: evaluateTech(lctn[n][1])*2}, 1000, mina.easeinout);	
						pos = pos + lctn[n][2]/2;
					};



					pos = 10;					
					for(i=0; i<lctn.length; i++){
						//allRects.push(s.rect(pos,pos,lctn[i][2],lctn[i][2]).attr({fillOpacity: 0.0 ,stroke: c1, strokeWidth: 5}));	
						allRects[i].animate({x: lctn[i][2], y:parseInt(lctn[i][2])+offSetY, height:pos, width: pos, strokeOpacity:evaluateMachine(lctn[i][0])*2}, 1000, mina.easeinout);	
						pos = pos + lctn[i][2]/2;

					}	
					
					
					
					bdy = getArrayData(data, 1);
					bdy[0] = bdy[0][0].split(',')					
					xPos = 0;
					
					for(m = 0; m<bdy[0].length; m++){
						allBars[m].animate({x: xPos, width: parseInt(bdy[0][m])*scale }, 1000)
						xPos = xPos + parseInt(bdy[0][m])*scale;
				
					}					
					
																					
			};
};
		


		
