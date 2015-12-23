	
		//one object for each viz, each has a setup and an update method
		function viz_a_2_2(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
				
			this.data = data;
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
			}
			
			scale1 = vizHeight/sum1;
			scale2 = vizHeight/sum2;
	
			posX = 0;
			
//grid
			var grid = vizWidth/50; 
			
			for(n=0; n*grid < vizHeight; n++){
				for(i=0; i*grid < vizWidth; i++){
					//x,y,r,
					s.circle(i*grid+grid*0.5,n*grid+grid*0.5, grid*0.1).attr({fill: c2});		
				}
			};			



//bg blocks
//knowledge

		
			var knowledge = getArrayData(data,2)
			var posX = 10;
			var posY = vizHeight/2;
			var knowledgeSum = 0;
			var knowledgeScale = 1;
			var knowledgeRects = [];
			
			for(n=0; n<knowledge.length; n++){
				knowledgeSum = knowledgeSum + parseInt(knowledge[n][0]);
			};
			
			if(knowledgeSum != 0){knowledgeScale = vizWidth/knowledgeSum;}else{knowledgeScale = 1};
						
			for(i=0; i<knowledge.length; i++){
				//console.log(posX+', '+posY+', '+knowledge[i][0]);
				
			
				//posX = posX + parseInt(knowledge[i][0])*knowledgeScale*0.5;		

				//s.line(posX , posY-parseInt(knowledge[i][0])/2, posX, posY+parseInt(knowledge[i][0])/2).attr({stroke:'white', strokeLineCap: 'round', strokeWidth:(parseInt(knowledge[i][0])*knowledgeScale)});
				knowledgeRects.push(s.rect(posX, posY-parseInt(knowledge[i][0])*knowledgeScale*0.5, parseInt(knowledge[i][0])*knowledgeScale, parseInt(knowledge[i][0])*knowledgeScale).attr({fill: 'white', fillOpacity: 1.0, transform: 'r45', stroke:'white', strokeWidth: 10}));
			
				posX = posX + parseInt(knowledge[i][0])*knowledgeScale;		

			
			};




//side bezier
//social
			var social = getArrayData(data, 3);
			var grid = vizWidth / (social.length+1);
			posX = 0;
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
			};
					

//bezier waves
//location			
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
								
				allPaths.push(s.path(path).attr({fillOpacity: 0.1, fill:c1, stroke: 'white', strokeWidth: 2, strokeOpacity: 0.0}))
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

			
			


//bodyData

		var bodyData= getArrayData(data,1);
		bodyData[0] = bodyData[0][0].split(',');
		var allbodyRects = [];
		posX = 0;
		posY = 40;
		
		for(i=0; i<bodyData[0].length; i++){
			allbodyRects.push(s.rect(posX + parseInt(bodyData[0][i])/(parseInt(bodyData[2][0])*6),posY,parseInt(bodyData[0][i])/(parseInt(bodyData[1][0]*2)), 10).attr({fill:'white', opacity:0.3}));		
			posY = posY + parseInt(bodyData[0][i])/(parseInt(bodyData[2][0])*6);
		};


	
//updates		
//methods


		this.updateViz = function(data) {

// bodyData update
// white rects		
		
			bodyData= getArrayData(data,1);
			bodyData[0] = bodyData[0][0].split(',');
			posX = 0;
			posY = 40;
			
			for(i=0; i<allbodyRects.length; i++){
				posY = posY + parseInt(bodyData[0][i])/(parseInt(bodyData[2][0])*6 +30);
			
				allbodyRects[i].animate({x:posX + parseInt(bodyData[0][i])/(parseInt(bodyData[2][0])*6), y: posY, width: parseInt(bodyData[0][i])/(parseInt(bodyData[1][0])*2)}, 3000);		
				//allbodyDataRects.animate(s.rect(posX + parseInt(bodyData[0][i])/(parseInt(bodyData[2][0])*6),posY,parseInt(bodyData[0][i])/(parseInt(bodyData[1][0]*2)), 10).attr({fill:'white', opacity:0.3}));		
			};
	
	
	
				lctn = getArrayData(data, 0);
//bigBezier
				posX = 10;
				scale1 = 1.5;
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
						
				};



//bg blocks update
			knowledge = getArrayData(data,2)
			knowledgeSum = 0;
			knowledgeScale = 0;
			var posX = 0;
			var posY = vizHeight/2;
			
			for(n=0; n<knowledge.length; n++){
				knowledgeSum = knowledgeSum + parseInt(knowledge[n][0]);
			};
			
			
			if(knowledgeSum != 0){knowledgeScale = vizWidth/knowledgeSum;}else{knowledgeScale = 1};
			
			for(i=0; i<knowledgeRects.length; i++){

				knowledgeRects[i].animate({x:posX , y:(posY-(parseInt(knowledge[i][0])*knowledgeScale*0.5)), width:(parseInt(knowledge[i][0])*knowledgeScale),  height: (parseInt(knowledge[i][0])*knowledgeScale)}, 3000);
				//console.log(posX +', '+ (posY-parseInt(knowledge[i][0])*knowledgeScale*0.5));
			
				posX = posX + parseInt(knowledge[i][0])*knowledgeScale;		
			
			};







//smallBezier update			
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
			}						
};
		


		
