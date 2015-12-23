	
	function bodyDataIntoArray(data){
	
		    dataset = data.dataset;
    		//gives all data objects within selected dataset
			//console.log(dataset);
			//console.log(dataset.data);
			//console.log(dataset.data.243.value);
		
			var arr = [];
			var values = []


				for(var x in dataset.data){
  					arr.push(dataset.data[x]);
				}
				//console.log(arr);
			
				for(var i in arr){
					values[i] = arr[i].value.split(",");
					//console.log(values[i]);
				}
			
				//console.log(values);
				return values;
	};
	
	

	
	
	