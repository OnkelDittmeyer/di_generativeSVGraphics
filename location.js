	
	function locationDataIntoArray(data){
	
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
					values[i] = arr[i].value.split(", ");
					//console.log(values[i]);
				}
			
				//console.log(values);
				return values;
	};
	
	

	
	
	function evaluateMachine(machine){
		var value = null;
		var machine = machine;
	
		//console.log(machine);
		switch(machine){
		
			case 'smartphone':			value = 0.0;	break;
			case 'car':					value = 0.1;	break;
			case 'keycard':				value = 0.2;	break;
			case 'laptop':				value = 0.3;	break;
			case 'railpass':			value = 0.4;	break;
			case 'camera':				value = 0.5;	break;
			case 'phone':				value = 0.6;	break;
			case 'creditcard':			value = 0.7;	break;
			case 'cctv':				value = 0.8;	break;
			case 'passport':			value = 0.9;	break;
			case 'smartwatch':			value = 0.95;	break;

			
			default:			value = 1;			
		}	
		return value;	
	};
	
	
	function evaluateTech(tech){
		var value = null;
		var tech = tech;
	
		switch(tech){
		
			case 'gps':				value = 0.1;	break;
			case 'wifi':			value = 0.2;	break;
			case 'bluetooth':		value = 0.3;	break;
			case 'cellular':		value = 0.4;	break;
			case 'metadata':		value = 0.5;	break;
			case 'rfid':			value = 0.6;	break;
			case 'ethernet':		value = 0.7;	break;
			case 'landline':		value = 0.8;	break;
			case 'movementpattern':	value = 0.9;	break;
			case 'facial':			value = 0.95;	break;

			
			default:			value = 1;			
		}	
		return value;	
	};
	
	
	function locationSum(array){
		var sum = 0;
	
		for(i = 0; i<array.length; i++){
			//console.log(array[i][2] +' & '+ array[i][3]);
			sum = sum + parseInt(array[i][2]) + parseInt(array[i][3]);
			//console.log(sum);			
		}
		
		return sum;
	
	};