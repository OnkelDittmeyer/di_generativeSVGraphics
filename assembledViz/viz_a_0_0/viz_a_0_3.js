	
		//one object for each viz, each has a setup and an update method
		function viz_a_0_3(data, id){
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

			var angle= 15;
			//console.log(path);
			for(i=0; i<360/angle; i++){
				
				var newPath = s.path(path).attr({fill:c1, fillOpacity: 0.2, stroke: c2, strokeWeight: 1, strokeDasharray: '2 5'});
				newPath.attr({transform: 'r'+ (i*angle)+' '+vizWidth/2+' '+vizHeight/2 })
				
				allPaths.push(newPath);
				group.add(newPath);
				
			}

			group.attr({transform: 's1.5', opacity: 0.3});			
			
			
//background lines
			
			for(i=0; i*(height+2)<vizHeight; i++){
						s.rect(xPos, yPos, vizWidth, height).attr({fill:c2, opacity: 0.2});
						yPos = yPos+height+2;
			}			
			

//side lines/bargraphs
//lifestyle + knowledge
						
			yPos = 0;
			var lifestylePolys = [];
			var knowledgeLines = [];
			
			for(n=0; n<lifestyle.length; n++){
				for(i=0; i<lifestyle[n].length; i++){
						skewI = lifestyle[n][i]*0.5;
						lifestylePolys.push(s.polygon(xPos,yPos, xPos, yPos+height, xPos+lifestyle[n][i], yPos+height+skewI, lifestyle[n][i], yPos+skewI).attr({fill:'white'}));
						yPos = yPos+height+5;			

			
						if(o<5){
							//console.log(knowledge[i][0])
							skewI = (knowledge[i][0]*20)*0.5;

							knowledgeLines.push(s.line(xPos,yPos,knowledge[i][0]*20, yPos+skewI).attr({stroke:c1, strokeWidth: 1, strokeDasharray: '5 5'}));
							yPos = yPos+5;
							o++;
						}
				}			
			}

			
//boxes,//location

		var location = 	getArrayData(data, 0);
		var locationRects = [];
		xPos = vizWidth - vizWidth/4;
		yPos = 0
		
		for(i=0; i<location.length;i++){
		yPos = yPos + Math.abs(parseInt(location[i][2]))*(evaluateMachine(location[i][1])*0.05);
				locationRects.push(s.rect(xPos - Math.abs((parseInt(location[i][3]*0.5)*0.5)), yPos, Math.abs(parseInt(location[i][3])*0.5), Math.abs(parseInt(location[i][3])*0.5)).attr({fillOpacity: 0.0, stroke:c2, strokeOpacity:0.2, transform: 'R45'}));
					//locationRects.push(s.rect(0, yPos, location[i][3], location[i][3]).attr({fillOpacity: 0.0, stroke:c2, strokeOpacity:0.2, transform: 'r45'}));
				
		
		}		

			
//lines + bubbles
//body

		var body = getArrayData(data, 1);
		var scale = vizWidth/15000;

		body[0] = body[0][0].split(',');
		
		var bodyLines =[];
		var bodyPills = [];
				
		//posY = vizHeight/(body[0].length+1);
		posY = vizHeight;		
		
		for(i=0; i<body[0].length;i++){
			posY = posY - body[2][0]*0.16;
			bodyLines.push(s.line(0, posY, vizWidth, posY).attr({stroke:c1, strokeWidth: 0.5}));
			bodyPills.push(s.line(body[0][i]*scale, posY, (body[0][i]*scale) + (body[0][i]/body[1][0]*scale), posY).attr({stroke: 'white', strokeWidth: 5, strokeLinecap: 'round'}));	
				
		}	
			
			
			
			
			


		
		
			//methods
			this.updateViz = function(data) {
				location = getArrayData(data, 0);
				knowledge = getArrayData(data, 2);
				social = getArrayData(data, 3);
				lifestyle = getArrayData(data, 4);


				path = 'M'+
						(vizWidth/2 - parseInt(social[0][0])*fa) +' '+
						(vizHeight/2 - parseInt(social[0][1]*fa)) +' l'+
						(2+fa* parseInt(social[1][0])) +' '+
						(8+fa* parseInt(social[1][1])) +' l'+
						(1+fa* parseInt(social[2][0])) +' '+
						(4+fa* parseInt(social[2][1])) +' l'+						
						(6+fa* parseInt(social[3][0])) +' '+
						(2+fa* parseInt(social[3][1])) +' l'+						
						(8+fa* parseInt(social[4][0])) +' '+
						(2+fa* parseInt(social[4][1]))

				for(i=0; i<allPaths.length; i++){					
					allPaths[i].animate({d: path},3000, mina.easeinout)			
				}
//lines update			
			xPos = 0;
			yPos = 0;
			o = 0;	
			lifestyle = getArrayData(data, 4);

			for(n=0; n<lifestyle.length; n++){
				for(i=0; i<lifestyle[n].length; i++){
						skewI = lifestyle[n][i]*0.5;					
						path = 	xPos+','+
							  	yPos+','+
								xPos+','+
								(yPos+height)+','+
								(xPos+lifestyle[n][i])+','+
								(yPos+height+skewI)+','+
								lifestyle[n][i]+','+
								(yPos+skewI);							  					
						//console.log(path);
				
						lifestylePolys[i + n*lifestyle[0].length].animate({points:path},3000, mina.easeinout)
						yPos = yPos+height+5;			

			
						if(o<5){
							//console.log(knowledge[i][0])
							skewI = (parseInt(knowledge[o][0])*20)*0.5;
							knowledgeLines[o].animate({x2:parseInt(knowledge[o][0])*20, y2: yPos+skewI},3000, mina.easeinout);
							yPos = yPos+5;
							o++;
						}
				}			
			}

//boxes update
			var oldLocation = location;
			location = 	getArrayData(data, 0);
			xPos = vizWidth - vizWidth/4;
			yPos = 0
		
			for(i=0; i<locationRects.length;i++){
				//xPos = (Math.sqrt(Math.pow(location[i][3],2)+Math.pow(location[i][3],2)))-location[i][3];
				yPos = yPos + Math.abs(parseInt(location[i][2]))*(evaluateMachine(location[i][1])*0.05);
				var scale = oldLocation[i][3]/location[i][3];
				//locationRects[i].animate({x: xPos - Math.sqrt(Math.pow(location[i][3],2)+Math.pow(location[i][3],2))*0.5, y:yPos, width: location[i][3], height: location[i][3]},3000, mina.easeinout);		
				locationRects[i].animate({transform: 's'+scale+' R45'},3000, mina.easeinout);		
				
				locationRects[i].animate({x: xPos-Math.abs(parseInt(location[i][3]))*0.5/2, y:yPos, width: (parseInt(location[i][3])*0.5), height: (parseInt(location[i][3])*0.5)},3000, mina.easeinout);		
				
			}

//body update


			body = getArrayData(data, 1);
			body[0] = body[0][0].split(',');
			posY = vizHeight;
			scale = vizWidth/15000;
			//posY = vizHeight/(body[0].length+1);		

			for(i=0; i<bodyPills.length;i++){		
				posY = posY - body[2][0]*0.16;
				bodyLines[i].animate({y1: posY, y2: posY }, 3000, mina.easeinout);
				
				bodyPills[i].animate({x1:parseInt(body[0][i])*scale, y1: posY, x2:(body[0][i]*scale) + (body[0][i]/body[1][0]*0.5), y2:posY},3000, mina.easeinout);
							
			}

			};

};
		


		
