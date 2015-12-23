	
		//one object for each viz, each has a setup and an update method
		function viz_a_1_0(data, id){
			var vizHeight = screen.height/columns-border;
			var vizWidth = screen.width/rows-border;
			

			
			this.data = data;
			//this.fullLength = 0;
			this.fullHeight = 0;
			this.allRects = [];
			var allBars = [];
						
			
			// create svg canvas for new viz and place it in document
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				//svg.setAttribute('style', 'border: 3px solid white');
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
			s.rect(0,0, vizWidth, vizHeight).attr({fill:'white'});
			
			
			//knowledge multiplicator
			var km = getArrayData(data, 2);
			var sideBars = 0;

			var posX = sideBars ;
			var posY = 0;
			
			
			var allRects = [];
			
			
			
//barpattern
//lifestyle			
			
			var lifestyle = getArrayData(data, 4);
			var knowledge = getArrayData(data, 2);
			var scale = 0;
			
			for(m=0; m<lifestyle.length; m++){
				
				scale = (vizWidth-sideBars)/arraySum(lifestyle[m]);
				posX = sideBars;
				
				
				for(o=0; o<lifestyle[m].length; o++){
					//console.log(posX+', '+posY+', '+(lifestyle[m][o]*scale)+', '+(vizHeight/lifestyle.length))
					allRects.push(s.rect(posX, posY, (lifestyle[m][o]*scale), (vizHeight/lifestyle.length)).attr({stroke: c1, strokeWidth: 1,strokeOpacity:0.0, fill:c2, fillOpacity: 0.1+0.2*o}));				
					posX = posX + lifestyle[m][o]*scale;
				}
				posY = posY + vizHeight/lifestyle.length
			
			};
			
			posX = sideBars;


			for(m=0; m<lifestyle.length; m++){
				scale = vizHeight/arraySum(lifestyle[m]);
				posY = 0;
				
				for(o=0; o<lifestyle[m].length; o++){
					//console.log(posX+', '+ posY +', '+ vizWidth/lifestyle.length +', '+lifestyle[m][o]*scale);
					allRects.push(s.rect(posX, posY , vizWidth/lifestyle.length, lifestyle[m][o]*scale).attr({stroke: c1, strokeWidth: 1, strokeOpacity:0.0, fill:c2, fillOpacity: 0.1+0.2*o}));				
					posY = posY + lifestyle[m][o]*scale;					
				}
				posX = posX + vizWidth/lifestyle.length;
				
			
			};

		

//location
							
			createVerticalBar(s, getArrayData(data, 0), 30, 0);
		



//body
			var body = getArrayData(data, 1);
			body[0] = body[0][0].split(',');
			var bodyScale = vizHeight/15000;
			var barWidth = parseInt(body[1][0])*0.08;
			var bodyRects = [];
			
/*
			for(i=0; i<body[0].length; i++){
				xPos = vizWidth - i*2*barWidth;
				
				bodyRects.push(s.rect(xPos, (body[0][i]*bodyScale)/(body[2][0]*0.1), 8, body[0][i]*bodyScale).attr({ strokeWeight: 3, fill: c1, fillOpacity: 0.5, transform: 'R90'}))
			
			
			}
*/





//knowledge

			var knowledge = getArrayData(data, 2);
			
			




			//createCrossHair(this.s, vizWidth/2, vizHeight/2);
			
		
			
		
			

		
		
		
			//methods
			this.updateViz = function(data) {
// bars
// location update

			var lctn = getArrayData(data, 0);
			var scale = vizHeight/locationSum(getArrayData(data, 0));
			var yPos = 0;
			var m = 0;
				
				

			for(n = 0; n<lctn.length; n++){
					//console.log(lctn[n][2] +','+ scale)
					allBars[m].animate({height: parseInt(lctn[n][2])*scale, opacity: evaluateMachine(lctn[n][0]), y: yPos},2000, mina.easeinout);
					//allBars[m+(allBars.length/2)].animate({height: parseInt(lctn[n][2])*scale, opacity: evaluateMachine(lctn[n][0]), y: yPos},4000);
					
					
					yPos = yPos + parseInt(lctn[n][2])*scale;
					m++;
					
					allBars[m].animate({height: parseInt(lctn[n][3])*scale, opacity: evaluateTech(lctn[n][1]), y: yPos},2000, mina.easeinout);
					//allBars[m+(allBars.length/2)].animate({height: parseInt(lctn[n][3])*scale, opacity: evaluateTech(lctn[n][1]), y: yPos},4000);

					yPos = yPos + parseInt(lctn[n][3])*scale;
					m++;				
			}









//body 
// blue lines update
				lifestyle = getArrayData(data, 4);
				body = getArrayData(data, 1);
				body[0] = body[0][0].split(',');
				barWidth = parseInt(body[1][0])*0.08;
			
/*
			for(i=0; i<bodyRects.length; i++){
				xPos = vizWidth - i*2*barWidth;
				
				bodyRects[i].animate({x: xPos, y:(body[0][i]*bodyScale)/(body[2][0]*0.1), height:body[0][i]*bodyScale }, 3000, mina.easeinout);
			
			
			}
*/
				
				
//bg boxes
//update, lifestyle

			sideBars = 0;
			posX = sideBars ;
			posY = 0

			lifestyle = getArrayData(data, 4);
			scale = 0;
			rectCounter = 0;
			
			for(m=0; m<lifestyle.length; m++){
				
				scale = (vizWidth-sideBars)/arraySum(lifestyle[m]);
				posX = sideBars;
				
				
				for(o=0; o<lifestyle[m].length; o++){
					allRects[rectCounter].animate({x: posX, y: posY, width:(lifestyle[m][o]*scale), height: (vizHeight/lifestyle.length) }, 3000, mina.easeinout);
					rectCounter++;
					//allRects.push(s.rect(posX, posY, (lifestyle[m][o]*scale), (vizHeight/lifestyle.length)).attr({stroke: c1, strokeWidth: 1,strokeOpacity:0.0, fill:c2, fillOpacity: 0.1+0.2*o}));				
					posX = posX + lifestyle[m][o]*scale;
				}
				posY = posY + vizHeight/lifestyle.length
			
			};
			
			posX = sideBars;


			for(m=0; m<lifestyle.length; m++){
				scale = vizHeight/arraySum(lifestyle[m]);
				posY = 0;
				
				for(o=0; o<lifestyle[m].length; o++){
					//console.log(posX+', '+ posY +', '+ vizWidth/lifestyle.length +', '+lifestyle[m][o]*scale);
					allRects[rectCounter].animate({x:posX, y:posY, width: (vizWidth/lifestyle.length), height: (parseInt(lifestyle[m][o])*scale)},3000, mina.easeinout);
					rectCounter++;
					//allRects.push(s.rect(posX, posY , vizWidth/lifestyle.length, lifestyle[m][o]*scale).attr({stroke: c1, strokeWidth: 1, strokeOpacity:0.0, fill:c2, fillOpacity: 0.1+0.2*o}));				
					posY = posY + parseInt(lifestyle[m][o])*scale;					
				}
				posX = posX + vizWidth/lifestyle.length;
				
			
			};











				
/*
				posX = sideBars;
				posY = 0;
				var sum1 = parseInt(lifestyle[0][0]) + parseInt(lifestyle[0][1]) + parseInt(lifestyle[0][2]) + parseInt(lifestyle[0][3]);
				var sum2 = parseInt(lifestyle[1][0]) + parseInt(lifestyle[1][1]) + parseInt(lifestyle[1][2]) + parseInt(lifestyle[1][3]);
				var sum3 = parseInt(lifestyle[2][0]) + parseInt(lifestyle[2][1]) + parseInt(lifestyle[2][2]) + parseInt(lifestyle[2][3]);
				var newScale = 0;
		
				
				for(i=0; i<24; i++){
					
					if(i<12){
						switch(Math.floor(i/4)){
							case 0:
								newScale = (vizWidth-sideBars)/sum1;
								break;
							case 1:
								newScale = (vizWidth-sideBars)/sum2;
								break;					
							case 2:
								newScale = (vizWidth-sideBars)/sum3;
								break;														
						};
						
						
						if(i%4 == 0){
							posX = sideBars
						}else{
							posX = posX+parseInt(lifestyle[Math.floor((i-1)/4)][(i-1)%4])*newScale;
						}										
						//console.log('Row: '+Math.floor(i/4)+' Number: '+(i%4));					
	
						allRects[i].animate({x: posX, width: lifestyle[Math.floor(i/4)][i%4]*newScale},3000, mina.easeinout);
						//console.log(posX+', original number: '+lifestyle[Math.floor(i/4)][i%4]+' scaled: '+ lifestyle[Math.floor(i/4)][i%4]*newScale );
						posY = vizHeight/lifestyle.length*(Math.floor(i/4));
					}else{
							switch(Math.floor(i/4-3)){
							case 0:
								newScale = (vizHeight)/sum1;
								break;
							case 1:
								newScale = (vizHeight)/sum2;
								break;					
							case 2:
								newScale = (vizHeight)/sum3;
								break;														
							};					
					
					
							if(i%4 == 0){
								posY = 0;						
							}else{
								posY = posY + parseInt(lifestyle[Math.floor((i-1)/4-3)][(i-1)%4])*newScale;
							};
							
							//console.log(Math.floor(i/4)-3);
							//console.log(posY+', original number: '+lifestyle[Math.floor(i/4-3)][i%4]+' scaled: '+ lifestyle[Math.floor(i/4-3)][i%4]*newScale );
							allRects[i].animate({y: posY, height:lifestyle[Math.floor(i/4-3)][i%4]*newScale},3000, mina.easeinout);
							posX = vizWidth/lifestyle.length*(Math.floor(i/4-3));							
							
							
												
					}				
				}
*/
		
										
			};	
			
			
			function arraySum(array){
				var sum= 0;
				for(i=0; i<array.length; i++){
					sum = sum + parseInt(array[i]);					
				}
			
				return sum;
			}
			
			
				
		
			function createVerticalBar(canvas, array, width, x){
					var canvas = canvas
					var data = array;
					var barWidth = width;
					var xPos = x;
					var yPos = 0;
					var scale = vizHeight/locationSum(data);
					
					canvas.rect(xPos, yPos, barWidth, vizHeight).attr({fill: 'white'});
			
					for(n = 0; n<data.length; n++){	
						//console.log('xPos: '+ xPos +'yPos:'+ yPos +', Height: '+ data[n]*scale +'Width: '+ barWidth);
				
							allBars.push(canvas.rect(xPos, yPos, barWidth, Math.abs(parseInt(data[n][2])*scale))
													.attr({fill: c2, opacity: evaluateMachine(data[n][0])}));	
				
							yPos = yPos + parseInt(data[n][2])*scale;
							
							allBars.push(canvas.rect(xPos, yPos, barWidth, Math.abs(parseInt(data[n][3])*scale))
													.attr({fill: c2, opacity: evaluateTech(data[n][1])}));
													
							yPos = yPos + Math.abs(parseInt(data[n][3]))*scale;																
					}			
			};		
		
		
		
		
		
		
		};
		


		
