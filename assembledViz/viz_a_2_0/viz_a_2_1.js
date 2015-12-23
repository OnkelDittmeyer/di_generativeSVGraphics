	
		//one object for each viz, each has a setup and an update method
		function viz_a_2_1(data, id){
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
			
			posX = 0;
			
//grid
			var grid = vizWidth/50; 
			
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					s.circle(i*grid+grid*0.5,n*grid+grid*0.5, grid*0.1).attr({fill: c2});		
				}
			};			



/*
//social
			var social = getArrayData(data, 3);
			var grid = vizWidth / (social.length+1);
			var posX = 0;
			var socialPaths = [];
			
			for(i=0; i<social.length; i++){
				posX = (i+1)*grid
				var path = 	'M'+posX
							+' -100 '+
							'C'+(posX+parseInt(social[i][0])*50)+
							' '+vizHeight/2+
							' '+(posX-parseInt(social[i][1])*50)+
							' '+vizHeight/2+
							' '+posX+
							' '+(vizHeight+100);
						
						
				socialPaths.push(s.path(path).attr({fillOpacity: 0.0, fill:c1, stroke: c2, strokeWidth: 200, strokeOpacity:0.1}))
			
			
			
			}
*/
			









/*
			var lifestyle = getArrayData(data,4);
			var xPos = vizWidth/2;
			var yPos = 0;
			
			for(i=0; i<lifestyle.length; i++){
			
				for(n=0; n<lifestyle[i].length; n++){
					if(i==0){yPos = vizHeight/2 - parseInt(lifestyle[i][n])};
					if(i==1){yPos = vizHeight/2 - parseInt(lifestyle[i][n])*0.5};
					if(i==2){yPos = vizHeight/2 + parseInt(lifestyle[i][n])};
					
					
					xPos = xPos + parseInt(lifestyle[i][(n+1)%4])/2;
					s.rect(xPos, yPos, lifestyle[i][n], lifestyle[i][n]).attr({fillOpacity: 0.2, fill: c1, transform: 'r45'});
				
				}
			
			
			}
*/




//particle

//random

/*
			var numP = 5;
			var allP = [];
			var pWidth = vizWidth;
			var pHeight = vizHeight;
			var xCenter = vizWidth/2
			var yCenter = vizHeight/2;
			var knowledge = getArrayData(data, 2);
			

			for(i = 0; i<knowledge.length; i++){	
						
				for(n=0; n<numP; n++){
				
					var posX = vizWidth/6 * (i+1)	+ Math.random()*knowledge[i][0];
					var rngA = Math.random()*360;				
				
					allP.push(s.circle(posX, vizHeight/2, grid).attr({fill: 'white', fillOpacity: 0.2*i, transform: 'r'+rngA +' '+posX+' '+vizHeight/2}));	
					allP.push(s.circle(posX, vizHeight/2, grid*0.2).attr({fill: c2, fillOpacity: 0.2*i, transform: 'r'+rngA +' '+posX+' '+vizHeight/2}));
				}
			}
*/






			

//bezier waves
//location	
			scale1 = 1.5;		
			for(i = 0; i<lctn.length; i++){			
				//X, Y , Cx1 Cy1, Cx2, Cy2, X2, Y2 
				var path = 	'M20'+
							
							' 0C'+
							posX +' '+
							parseInt(lctn[i][2])*scale1 +' '+
							(vizWidth-posX) +' '+
							parseInt(lctn[i][3])*scale1 +', '+
							(vizWidth-20) +', '+
							vizHeight;
								
				allPaths.push(s.path(path).attr({fillOpacity: 0.1, fill:c1, stroke: c1, strokeWidth: 1, strokeOpacity: 0.5}))
				posX = posX +0;		
			};			
	


//circles
//lifestyle

			var circSize = vizHeight/4;
			var allCircles = [];
			var interests = getArrayData(data, 4);

			
			for(i = 0; i<interests.length; i++){
				allCircles.push(s.circle(vizWidth/2-circSize/2-interests[(i+4)%3][0]*0.5,vizHeight/2-circSize/2,interests[i][0]*4)
					.attr({fill: c1, fillOpacity:0.1, stroke: c2, strokeOpacity:1, stroke: 1}));
					
					allCircles.push(s.circle(vizWidth/2+circSize/2+interests[(i+4)%3][1]*0.5,vizHeight/2-circSize/2,interests[i][1]*4)
					.attr({fill: c1, fillOpacity:0.1, stroke: c2, strokeOpacity: 1, stroke: 2}));	
						
						allCircles.push(s.circle(vizWidth/2-circSize/2-interests[(i+4)%3][2]*0.5,vizHeight/2+circSize,interests[i][2]*4)
						.attr({fill: c1, fillOpacity:0.1, stroke: c2, strokeOpacity: 1, stroke: 3}));	
							
							allCircles.push(s.circle(vizWidth/2+circSize/2+interests[(i+4)%3][3]*0.5,vizHeight/2+circSize,interests[i][3]*4)
							.attr({fill: c1, fillOpacity:0.1, stroke: c2, strokeOpacity: 1, stroke: 4}));			
					
			};

			
			

			

		
		
		
			//methods
			this.updateViz = function(data) {
				lctn = getArrayData(data, 0);
//bigBezier
				posX = 10;
				for(i = 0; i<lctn.length; i++){			
					//X, Y , Cx1 Cy1, Cx2, Cy2, X2, Y2 
					var path = 	'M0'
								+' 0C'+
								posX +' '+
								parseInt(lctn[i][2])*scale1 +' '+
								(vizWidth-posX) +' '+
								(vizHeight-parseInt(lctn[i][3])*scale1) +', '+
								(vizWidth) +', '+
								vizHeight;
								
					allPaths[i].animate({d: path}, 2000, mina.easeinout);
					posX = posX +0;		
				};

//circles update

				interests = getArrayData(data, 4);

				for(i = 0; i<interests.length; i++){
					allCircles[i*4].animate({
						cx: vizWidth/2-circSize/2-parseInt(interests[(i+4)%3][0])*0.5,
						r: interests[i][0]*4
					}, 3000);
					
					allCircles[(i*4)+1].animate({
						cx:vizWidth/2+circSize/2+parseInt(interests[(i+4)%3][0])*0.5, 
						r: interests[i][1]*4
					 }, 3000);
					
					allCircles[(i*4)+2].animate({
						cx: vizWidth/2-circSize/2-interests[(i+4)%3][2]*0.5,
						r: interests[i][2]*4
					}, 3000);	
							
					allCircles[(i*4)+3].animate({
						cx: vizWidth/2+circSize/2+interests[(i+4)%3][3]*0.5,
						r:	interests[i][3]*4
					}, 3000);								
						
				}


/*
//smallBezier			


			social = getArrayData(data, 3);
			posX = 0;
			
			for(i=0; i<socialPaths.length; i++){
				posX = (i+1)*grid;
				path = 	'M'+posX
							+' -100 '+
							'C'+(posX+parseInt(social[i][0])*50)+
							' '+vizHeight/2+
							' '+(posX-parseInt(social[i][1])*50)+
							' '+vizHeight/2+
							' '+posX+
							' '+(vizHeight+100);
			
				socialPaths[i].animate({d:path},3000);
				
			}
*/






																										
			};
			
			


			
			
			
};
		


		
