		//global variables for layout
		var rows = 4;
		var columns = 3;		
		var border = 100;
		
		var vizHeight = screen.height/columns-border;
		var vizWidth = screen.width/rows-border;		
		
		//colors
		c1 = '#5e83a0';
		c2 = '#2D6666';

		//viz variables
		window.numberOfViz = 0;
		window.dataArray = null;
		


		//create text tags
		function createTextTags(){
			
	
			var vizNo = [12,14,24,35,13,14,25,39,13,19,24,30,20,25,34,39];
		

			for(i=0; i<numberOfViz; i++){
				if(i%4==0){rngNo=10;};
			
				var div = document.createElement('div');
				document.body.appendChild(div);
				var t = document.createTextNode('viz_'+numberOfViz+'_'+Math.floor(i/4)+'_'+vizNo[i]+'.xxy');
				div.appendChild(t);
				//console.log('viz_'+numberOfViz+'_'+i);

				//div.setAttribute('style', 'border: 3px solid black');
				div.setAttribute('style', 'fontFamily: Arial')
				div.setAttribute('width', vizWidth);
				div.setAttribute("id", 'viz_'+numberOfViz+'_'+i);
				div.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
				
				document.getElementById('viz_'+numberOfViz+'_'+i).style.position = "absolute";
				document.getElementById('viz_'+numberOfViz+'_'+i).style.left = border + i%rows*(vizWidth+0.5*border)+'px';
				document.getElementById('viz_'+numberOfViz+'_'+i).style.top = border + vizHeight + Math.floor(i/rows)*(vizHeight+0.5*border)+'px';
				
				
					//border+(border*0.5)*(numberOfViz%rows) + vizWidth*(numberOfViz%rows)+'px';
			
				//document.getElementById('viz_'+numberOfViz+'_'+i).style.top = 	border+(border*0.5)*(Math.floor(numberOfViz/rows)) + vizHeight*(Math.floor(numberOfViz/rows))+'px';				

				
				
			
			
			}

					
		};
		
		
		
		
		
				
		
		//help functions
		function createRandomArray(lengthX){
				var rdmArray = [];

				for(i = 0; i<=lengthX; i++){
					rdmArray[i]= Math.round(Math.random()*100);	
				}
				
				return rdmArray;		
				
		};
		
		
		//multidimensional array
		function createTwoArray(lengthX){
			var multiArray = new Array(lengthX);
		
			for(i=0; i<multiArray.length; i++){
				multiArray[i] = new Array(lengthX);
			}
			
			for(n=0;n<multiArray.length;n++){
				for(i=0; i<multiArray[n].length; i++){
					multiArray[n][i] = Math.round(Math.random()*100);

				}		
			}
			
			return multiArray;
			//console.log(multiArray);
		};
		
		
		//tag
		function createTag(canvas, x, y){
				canvas.g(
				canvas.rect(0, 0, 70,64).attr({fill:'white'}),
				canvas.rect(15, 12, 40,40).attr({fill:c1}),
				canvas.rect(25, 22, 20,20).attr({fill:'white'}),
				canvas.rect(30, 27, 10,10).attr({fill:c1})
				).attr({transform: 'T'+ (x-35)+' '+ (y-32)});
		
		
		}
		
		
		function createCrossHair(canvas, x, y, scale, color){
			var color = color;
			
			canvas.g(
				//canvas.circle(10,10,13).attr({fill:'white' }),
				//canvas.circle(10,10,12).attr({fill:'#2D6666' }),			
				canvas.circle(10,10,15).attr({fill:'white' }),
				canvas.rect(0, 9, 20, 2).attr({fill: color}),
				canvas.rect(9, 0, 2, 20).attr({fill: color})			
			).attr({transform: 'T'+ (x-10)+' '+ (y-10)+ ' r45'+ 's'+ scale});
		
		
		
		}
		
		
		
		
		function arraySum(array){
			var sum = 0;
			var array = array;
		
			for(i = 0; i<array.length; i++){
				console.log('summe:'+sum+' array wert: '+array[i]);
				sum = sum + parseInt(array[i]);
			};
			return parseInt(sum);		
		};
		
		
		function maxNumArr(array){
			var num = 0;
			var arr = array;
			
			for(i = 0; i<arr.length; i++){
				if(arr.length > 1){
					for(n = 0; n<arr[i].length; n++){
						if(parseInt(arr[i][n])>num){
							num = parseInt(arr[i][n]);
						}				
					}
				}else{
						if(parseInt(arr[i][n])>num){
							num = parseInt(arr[i][n]);
						}
				}			
			}
		
			return num;
		
		};
		
		
		
		
		
	function getArrayData(data, dataNo){
		var datasets = [];
		var values = [];
	
		  for(var _datasetI in data.datasets){
   			 datasets.push(data.datasets[_datasetI]);
 		 }
	
 		 
 		 for(var n in datasets[dataNo].data){
 			 //values.push(datasets[dataNo].data[n].value)
 			 values.push(datasets[dataNo].data[n].value.split(', ')) 		 
 		 
 		 }
 		 //console.log(values);
 		 
 		 //parseInt
/*
 		 for(i=0; i<values.length; i++ ){
 		 	try{
 		 		values[i]=parseInt(values[i]);
 		 	}catch(err){
 		 	
 		 	}
 		 }
*/	

		return values;
	
	};
	
	
	function newArraySum(array){
		var array = array;
		var arraySum = 1;
		
		
			for(n=0; n<array.length; n++){
				arraySum = arraySum + parseInt(array[n]);	
			}
		
		if(arraySum==0){arraySum = 1;};
		return arraySum;
	
	}