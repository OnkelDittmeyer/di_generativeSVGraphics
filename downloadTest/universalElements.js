		//global variables for layout
		rows = 3;
		columns = 3;		
		border = 100;
		
		//colors
		c1 = '#5e83a0';
		c2 = '#2D6666';

		//viz variables
		window.numberOfViz = 0;
		window.dataArray = null;
		
				
		
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
				sum = sum + array[i];
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
 			 values.push(datasets[dataNo].data[n].value.split(', ')) 		 
 		 }
 		 //console.log(values);	

		return values;
	
	};