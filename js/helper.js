/*

MIT licence

Copyright (c) 2016 Michael Krause

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
	

    var gTitle = "";//optional additional title

    const DRT_CB = '#enableMetricDrt'; 
    const OCC_CB = '#enableMetricOcc'; 
    const GLANCE_TR_CB = '#enableMetricGlanceTr'; 
    const GLANCE_OR_CB = '#enableMetricGlanceOr'; 
    const DRV_CB = '#enableMetricDriving'; 
    const METRIC_CHECKBOXES = [DRT_CB, OCC_CB, GLANCE_TR_CB, GLANCE_OR_CB, DRV_CB];
    const IGNORE_CB = '#ignoreDelay'; 
    const VERSION = 1;
    
    const URL_VERSION = "version";
    const URL_TITLE = "title";  
    const URL_IGNORE = "ignoreDelay"; 
    const URL_DRT = "drt"; 
    const URL_OCC = "occ"; 
    const URL_DRV = "drv"; 
    const URL_GLANCE_TR = "glancetr"; 
    const URL_GLANCE_OR = "glanceor"; 
    const URL_SUBTASK = "s"; 
    const URL_DISABLED = "d"; 
    
    
	function checkIfUserOnlyRequestedGlanceVisualization(){//if yes; the first URL parameter is 'subtask=xy' e.g. subtask=2060200. returns the subtask number or NULL
		
		gSubtaskArray = [];
		
		var query = window.location.search.substring(1);
 		var vars = query.split("&");
 		
 		for (var i=0;i<vars.length;i++) {
	 		var temp = vars[0].split("=");
	 		var key = "";
	 		var value = "";
	 		if (temp.length > 0){ key = decodeURIComponent(temp[0]);}
	 		if (temp.length > 1){ value = decodeURIComponent(temp[1]);}
			switch (key) {
			    case 'subtask': 
			    	return value;
			    break;			 
			 
			    default: //console.log('handleUrl unknown:'+key +value); 
			  }	 		
	 		
	 	}
	 	
	 	return null; //not found
		
	}	
  
     
	function handleUrl(){
		
		gSubtaskArray = [];
		
		var query = window.location.search.substring(1);
 		var vars = query.split("&");
 		
 		for (var i=0;i<vars.length;i++) {
	 		var temp = vars[i].split("=");
	 		var key = "";
	 		var value = "";
	 		if (temp.length > 0){ key = decodeURIComponent(temp[0]);}
	 		if (temp.length > 1){ value = decodeURIComponent(temp[1]);}
			switch (key) {
			    case URL_VERSION: 
			    	if (value != VERSION){
			    	  new jBox('Notice', {
					    content: "[click to close] The URL you submitted is for another version. Check the subtasks and results carefully. You submitted an URL for version:"+value+"; however this is version:"+VERSION+". If you need a specific version to get exactly the same results, you can download versions from the GitHub repository. Links to different version can be found in the <a href='#' onclick=\"about('aboutChangeLog');\">Change Log</a>",
					    color: 'red',
					    autoClose: false,
					    stack: true,
					    fixed: true,
					    repositionOnOpen: true,
					    position: {x: 'left', y: 'top'}
					  });
				    }
			    break;
			    case URL_DRT: 
			    	if(value == "false"){
				    	$(DRT_CB).prop('checked', false);
				    }else{
				    	$(DRT_CB).prop('checked', true);					    
					}
			    break;
			    case URL_OCC: 
			    	if(value == "false"){
				    	$(OCC_CB).prop('checked', false);
				    }else{
				    	$(OCC_CB).prop('checked', true);					    
					}
			    break;
			    case URL_GLANCE_TR: 
			    	if(value == "false"){
				    	$(GLANCE_TR_CB).prop('checked', false);
				    }else{
				    	$(GLANCE_TR_CB).prop('checked', true);					    
					}
			    break;
			    case URL_GLANCE_OR: 
			    	if(value == "false"){
				    	$(GLANCE_OR_CB).prop('checked', false);
				    }else{
				    	$(GLANCE_OR_CB).prop('checked', true);					    
					}
			    break;
			    case URL_DRV: 
			    	if(value == "false"){
				    	$(DRV_CB).prop('checked', false);
				    }else{
				    	$(DRV_CB).prop('checked', true);					    
					}
			    break;
			    case URL_IGNORE: 
			    	if(value == "false"){
				    	$(IGNORE_CB).prop('checked', false);
				    }else{
				    	$(IGNORE_CB).prop('checked', true);					    
					}

			    break;
			    case URL_SUBTASK:
			        var temp = {subtask: value, enabled: true};  
			    	gSubtaskArray.push(temp);
			    break;
			    case URL_DISABLED://disable last added subtask
			    	gSubtaskArray[gSubtaskArray.length-1]['enabled'] = false;
			    break;
			    case URL_TITLE:
				document.title = "Distract.one - "+ value; 
				gTitle = value; 
			    break;

			    case "":
			    	//empty,ignore
			    break;
			 
			 
			    default: console.log('handleUrl unknown:'+key +value); 
			  }	 		
	 		
	 	}
		
	}
	
	function constructUrl(){
		retValue ="?";
		
		retValue +=  URL_VERSION + "="+ VERSION +"&";

		if (gTitle != ""){
			retValue += URL_TITLE +"="+encodeURIComponent(gTitle) + "&";
		}		

		if (isChecked(DRT_CB)){
			retValue +=  URL_DRT + "=true&";
		}else{
			retValue +=  URL_DRT + "=false&";			
		}
		
		if (isChecked(OCC_CB)){
			retValue +=  URL_OCC + "=true&";
		}else{
			retValue +=  URL_OCC + "=false&";			
		}

		if (isChecked(GLANCE_TR_CB)){
			retValue +=  URL_GLANCE_TR + "=true&";
		}else{
			retValue +=  URL_GLANCE_TR + "=false&";			
		}

		if (isChecked(GLANCE_OR_CB)){
			retValue +=  URL_GLANCE_OR + "=true&";
		}else{
			retValue +=  URL_GLANCE_OR + "=false&";			
		}

		if (isChecked(DRV_CB)){
			retValue +=  URL_DRV + "=true&";
		}else{
			retValue +=  URL_DRV + "=false&";			
		}
		

		if (isChecked(IGNORE_CB)){
			retValue +=  URL_IGNORE + "=true&";
		}else{
			retValue +=  URL_IGNORE + "=false&";			
		}

		for(var i = 0; i < gSubtaskArray.length; i++){
			retValue +=  URL_SUBTASK +"="+ gSubtaskArray[i]['subtask'] +"&";
			if(!gSubtaskArray[i]['enabled']){//only add if disabled
				retValue +=  URL_DISABLED +"&";
			}
		}
		
		return retValue;
	}   

	function isChecked(cb){
		if ($( cb ).is(':checked')){
			return true;
		}else{
			return false;
		}
	}
	
	
	function arrayIdx(array, idx){//helper uses indices array to access array e.g. if array=[10,20,30] and idx=[0,0,1] the return value is => [10,10,20]
								  //if idx = null array is returned 
	  if (idx == null) return array;
	  var retValue = [];
	  for(var i= 0; i< idx.length; i++){
		  retValue.push(array[idx[i]]);
	  }
	  return retValue
	}
	
	
	function merge(arrayA, arrayB){//helper merges arrayA and arrayB e.g. if a=[[1,1],2] b=[[0],[3,3]] return value = [[1,1,0],[2,3,3]]
	 var retValue = [];
	 var max = math.max(arrayA.length, arrayB.length);
	 //if(arrayA.length != arrayB.length){error('merge() arrayA.length != arrayB.length. A:'+arrayA.length +' B:'+arrayB.length);}
	  for(var i= 0; i< max;i++){
	        var temp;
	        if (typeof arrayA[i] != 'undefined'){
	         temp = arrayA[i];
	    	} 
	        if (typeof arrayB[i] != 'undefined'){
	         temp = arrayB[i];
	    	} 
	        if ((typeof arrayA[i] != 'undefined') && (typeof arrayB[i] != 'undefined')){
	         temp = [arrayA[i], arrayB[i]];
	    	} 
		retValue.push(temp);
	  }
	  return retValue;
	
	}
	
	
	function error(msg) {
	    throw msg;
	    alert(msg);
	}
	
	
	function replaceNaN(vector) {//replace NaN by 0
		
	  for(var i= 0; i< vector.length;i++){
	   if (isNaN(vector[i])) {
	     vector[i] = 0;
	   }
	  }	
	   
	  return vector;
	}

	function omitNaN(vector) {//omit/delete NaN
	  if (vector == null){return null;}
	 
	  var retValue = [];
	  for(var i= 0; i< vector.length;i++){
		if (!isNaN(vector[i])) {
		 retValue.push(vector[i]);
		}
	  }		   
	  return retValue;
	}	
	
	function omitZero(vector) {//omit/delete zero
	  if (vector == null){return null;}
	 
	  var retValue = [];
	  for(var i= 0; i< vector.length;i++){
		if (vector[i] != 0) {
		 retValue.push(vector[i]);
		}
	  }		   
	  return retValue;
	}		

	function specialCeil(vector) {//ceil every 0.x to 1
	  if (vector == null){return null;}
	 
	  var retValue = [];
	  for(var i= 0; i< vector.length;i++){
		if ((vector[i] != 0) && (vector[i] < 1)) {
		 retValue.push(1);
		}else{
		 retValue.push(vector[i]);			
		}		
	  }		   
	  return retValue;
	}		
			
	
	function getNum(val) {
	   if (isNaN(val)) {
	     return 0;
	   }
	   return val;
	}

	function pad(num, size) {//pad(5, 2) => "05"
	    var s = num+"";
	    while (s.length < size) s = "0" + s;
	    return s;
	}
	
	function padSpace(num, size) {//pad(5, 2) => " 5"
	    var s = num+"";
	    while (s.length < size) s = "&nbsp;" + s;
	    return s;
	}	

	
  
  function getLongLabel(subtask){//helper to generate label for each subtask for legends and tooltips etc
	  var retValue ="";
	  retValue += "ID"+SUBTASKS[subtask]["Nr"] + " ";
	  retValue += SUBTASKS[subtask]["Mode"] + " ";
	  retValue += SUBTASKS[subtask]["Type"] + " ";
	  retValue += SUBTASKS[subtask]["Subtype"] + " ";
	  retValue += SUBTASKS[subtask]["Subsubtype"];
	  return retValue;
  }	
	
  const SUBTASKS = {

  "1010200": { "Nr":1, "Image":"determined.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"Determined", "Subsubtype":"2s", "Info":"Delay is indicated by a progress bar"},
  "1020200": { "Nr":2, "Image":"determined.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"Determined", "Subsubtype":"4s", "Info":"Delay is indicated by a progress bar"},
  "1030200": { "Nr":3, "Image":"determined.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"Determined", "Subsubtype":"8s", "Info":"Delay is indicated by a progress bar"},
  "1040200": { "Nr":4, "Image":"indetermined.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"Indetermined", "Subsubtype":"2s", "Info":"Delay is indicated by a circle (indetermined)"},
  "1050200": { "Nr":5, "Image":"indetermined.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"Indetermined", "Subsubtype":"4s", "Info":"Delay is indicated by a circle (indetermined)"},
  "1060200": { "Nr":6, "Image":"indetermined.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"Indetermined", "Subsubtype":"8s", "Info":"Delay is indicated by a circle (indetermined)"},
  "1070200": { "Nr":7, "Image":"noindication.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"No Indication", "Subsubtype":"2s", "Info":"Delay is not indicated (system looks stalled/frozen)"},
  "1080200": { "Nr":8, "Image":"noindication.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"No Indication", "Subsubtype":"4s", "Info":"Delay is not indicated (system looks stalled/frozen)"},
  "1090200": { "Nr":9, "Image":"noindication.png", "Mode":"Touchscreen", "Type":"Delay", "Subtype":"No Indication", "Subsubtype":"8s", "Info":"Delay is not indicated (system looks stalled/frozen)"},
  "1100300": { "Nr":10, "Image":"typingnum.png", "Mode":"Touchscreen", "Type":"Input", "Subtype":"Number", "Subsubtype":"3 digits", "Info":"Typing a number on a touch screen numpad (big buttons)"},
  "1110300": { "Nr":11, "Image":"typingnum.png", "Mode":"Touchscreen", "Type":"Input", "Subtype":"Number", "Subsubtype":"5 digits", "Info":"Typing a number on a touch screen numpad (big buttons)"},
  "1120300": { "Nr":12, "Image":"typingnum.png", "Mode":"Touchscreen", "Type":"Input", "Subtype":"Number", "Subsubtype":"10 digits", "Info":"Typing a number on a touch screen numpad (big buttons)"},
  "1130300": { "Nr":13, "Image":"list.png", "Mode":"Touchscreen", "Type":"List Selection", "Subtype":"", "Subsubtype":"first", "Info":"Selection from an alphabetical list (100 entries). Target item is on first visible page (6 entries visible in selection window)"},
  "1140300": { "Nr":14, "Image":"list.png", "Mode":"Touchscreen", "Type":"List Selection", "Subtype":"Kinetic Scrolling", "Subsubtype":"mid", "Info":"Selection from an alphabetical list (100 entries). Target item is in the middle of the list. (6 entries/page)"},
  "1150300": { "Nr":15, "Image":"list.png", "Mode":"Touchscreen", "Type":"List Selection", "Subtype":"Kinetic Scrolling", "Subsubtype":"end", "Info":"Selection from an alphabetical list (100 entries). Target item is on last page (6 entries/page)"},
  "1160300": { "Nr":16, "Image":"list.png", "Mode":"Touchscreen", "Type":"List Selection", "Subtype":"Non Kinetic Scrolling", "Subsubtype":"mid", "Info":"Selection from an alphabetical list (100 entries) WITHOUT KINETIC/INERTIAL scrolling. Target item is in the middle of the list. (6 entries/page)"},
  "1170300": { "Nr":17, "Image":"list.png", "Mode":"Touchscreen", "Type":"List Selection", "Subtype":"Non Kinetic Scrolling", "Subsubtype":"end", "Info":"Selection from an alphabetical list (100 entries) WITHOUT KINETIC/INERTIAL scrolling. Target item is on last page (6 entries/page)"},
  "1180300": { "Nr":18, "Image":"numpickertap.png", "Mode":"Touchscreen", "Type":"Adjust Number Picker", "Subtype":"Tap", "Subsubtype":"+/-2", "Info":"Adjust a number picker / spin box with 2 taps on +/- button to a given number"},
  "1190300": { "Nr":19, "Image":"numpickertap.png", "Mode":"Touchscreen", "Type":"Adjust Number Picker", "Subtype":"Tap", "Subsubtype":"+/-4", "Info":"Adjust a number picker / spin box with 4 taps on +/- button to a given number"},
  "1200300": { "Nr":20, "Image":"numpickertap.png", "Mode":"Touchscreen", "Type":"Adjust Number Picker", "Subtype":"Tap", "Subsubtype":"+/-8", "Info":"Adjust a number picker / spin box with 8 taps on +/- button to a given number"},
  "1210300": { "Nr":21, "Image":"numpicker.png", "Mode":"Touchscreen", "Type":"Adjust Number Picker", "Subtype":"Roll", "Subsubtype":"+/-2", "Info":"Adjust a number picker / spin box with vertical scrolling gestures (rolling) to a given number +/- 2 steps"},
  "1220300": { "Nr":22, "Image":"numpicker.png", "Mode":"Touchscreen", "Type":"Adjust Number Picker", "Subtype":"Roll", "Subsubtype":"+/-4", "Info":"Adjust a number picker / spin box with vertical scrolling gestures (rolling) to a given number +/- 4 steps"},
  "1230300": { "Nr":23, "Image":"numpicker.png", "Mode":"Touchscreen", "Type":"Adjust Number Picker", "Subtype":"Roll", "Subsubtype":"+/-8", "Info":"Adjust a number picker / spin box with vertical scrolling gestures (rolling) to a given number +/- 8 steps"},
  "1240300": { "Nr":24, "Image":"slidernum.png", "Mode":"Touchscreen", "Type":"Slider", "Subtype":"Numeric", "Subsubtype":"", "Info":"A slider (one dimensional item) is adjusted to a given number (0-100 slider, snaps to multiples of 5)"},
  "1250300": { "Nr":25, "Image":"slidervis.png", "Mode":"Touchscreen", "Type":"Slider", "Subtype":"Visual", "Subsubtype":"", "Info":"A slider (one dimensional item) is adjusted to a visual target (0-100 slider, snaps to multiples of 5)"},
  "1260300": { "Nr":26, "Image":"typingchar.png", "Mode":"Touchscreen", "Type":"Input / Typing", "Subtype":"Alphabetic", "Subsubtype":"2 chars", "Info":"Typing chars on a touch keyboards (qwerty) small buttons"},
  "1270300": { "Nr":27, "Image":"typingchar.png", "Mode":"Touchscreen", "Type":"Input / Typing", "Subtype":"Alphabetic", "Subsubtype":"4 chars", "Info":"Typing chars on a touch keyboards (qwerty) small buttons"},
  "1280300": { "Nr":28, "Image":"typingchar.png", "Mode":"Touchscreen", "Type":"Input / Typing", "Subtype":"Alphabetic", "Subsubtype":"8 chars", "Info":"Typing chars on a touch keyboards (qwerty) small buttons"},
  "2010200": { "Nr":29, "Image":"determined.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"Determined", "Subsubtype":"2s", "Info":"Delay is indicated by a progress bar"},
  "2020200": { "Nr":30, "Image":"determined.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"Determined", "Subsubtype":"4s", "Info":"Delay is indicated by a progress bar"},
  "2030200": { "Nr":31, "Image":"determined.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"Determined", "Subsubtype":"8s", "Info":"Delay is indicated by a progress bar"},
  "2040200": { "Nr":32, "Image":"indetermined.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"Indetermined", "Subsubtype":"2s", "Info":"Delay is indicated by a circle (indetermined)"},
  "2050200": { "Nr":33, "Image":"indetermined.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"Indetermined", "Subsubtype":"4s", "Info":"Delay is indicated by a circle (indetermined)"},
  "2060200": { "Nr":34, "Image":"indetermined.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"Indetermined", "Subsubtype":"8s", "Info":"Delay is indicated by a circle (indetermined)"},
  "2070200": { "Nr":35, "Image":"noindication.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"No Indication", "Subsubtype":"2s", "Info":"Delay is not indicated (system looks stalled/frozen)"},
  "2080200": { "Nr":36, "Image":"noindication.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"No Indication", "Subsubtype":"4s", "Info":"Delay is not indicated (system looks stalled/frozen)"},
  "2090200": { "Nr":37, "Image":"noindication.png", "Mode":"Rotary", "Type":"Delay", "Subtype":"No Indication", "Subsubtype":"8s", "Info":"Delay is not indicated (system looks stalled/frozen)"},
  "2100300": { "Nr":38, "Image":"rnum.png", "Mode":"Rotary", "Type":"Input", "Subtype":"Number", "Subsubtype":"3 digits", "Info":"Input numbers with a number ray"},
  "2110300": { "Nr":39, "Image":"rnum.png", "Mode":"Rotary", "Type":"Input", "Subtype":"Number", "Subsubtype":"5 digits", "Info":"Input numbers with a number ray"},
  "2120300": { "Nr":40, "Image":"rnum.png", "Mode":"Rotary", "Type":"Input", "Subtype":"Number", "Subsubtype":"10 digits", "Info":"Input numbers with a number ray"},
  "2130300": { "Nr":41, "Image":"rchar.png", "Mode":"Rotary", "Type":"Input", "Subtype":"Alphabetic", "Subsubtype":"2 chars", "Info":"Input 2 chars with an alphabetical char ray (no intelligent logic i.e. NOT graying out impossible chars)"},
  "2140300": { "Nr":42, "Image":"rchar.png", "Mode":"Rotary", "Type":"Input", "Subtype":"Alphabetic", "Subsubtype":"4 chars", "Info":"Input 4 chars with an alphabetical char ray (no intelligent logic i.e. NOT graying out impossible chars)"},
  "2150300": { "Nr":43, "Image":"rchar.png", "Mode":"Rotary", "Type":"Input", "Subtype":"Alphabetic", "Subsubtype":"8 chars", "Info":"Input 8 chars with an alphabetical char ray (no intelligent logic i.e. NOT graying out impossible chars)"},
  "2160300": { "Nr":44, "Image":"list.png", "Mode":"Rotary", "Type":"List Selection", "Subtype":"", "Subsubtype":"first", "Info":"Selection from an alphabetical list (100 entries). Target item is on first visible page (6 entries visible in selection window)"},
  "2170300": { "Nr":45, "Image":"list.png", "Mode":"Rotary", "Type":"List Selection", "Subtype":"", "Subsubtype":"mid", "Info":"Selection from an alphabetical list (100 entries). Target item is in the middle of the list. (6 entries/page)"},
  "2180300": { "Nr":46, "Image":"list.png", "Mode":"Rotary", "Type":"List Selection", "Subtype":"", "Subsubtype":"end", "Info":"Selection from an alphabetical list (100 entries). Target item is on last page (6 entries/page)"},
  "2190300": { "Nr":47, "Image":"numpicker.png", "Mode":"Rotary", "Type":"Adjust Number Picker", "Subtype":"", "Subsubtype":"+/-2", "Info":"Adjust a number picker / spin box with +/-2 rotary indents to a given number"},
  "2200300": { "Nr":48, "Image":"numpicker.png", "Mode":"Rotary", "Type":"Adjust Number Picker", "Subtype":"", "Subsubtype":"+/-4", "Info":"Adjust a number picker / spin box with +/-4 rotary indents to a given number"},
  "2210300": { "Nr":49, "Image":"numpicker.png", "Mode":"Rotary", "Type":"Adjust Number Picker", "Subtype":"", "Subsubtype":"+/-8", "Info":"Adjust a number picker / spin box with +/-8 rotary indents to a given number"},
  "2220300": { "Nr":50, "Image":"slidernum.png", "Mode":"Rotary", "Type":"Slider", "Subtype":"Numeric", "Subsubtype":"", "Info":"A slider (one dimensional item) is adjusted to a given number (0-100 slider, snaps to multiples of 5)."},
  "2230300": { "Nr":51, "Image":"slidervis.png", "Mode":"Rotary", "Type":"Slider", "Subtype":"Visual", "Subsubtype":"", "Info":"A slider (one dimensional item) is adjusted to a visual target (0-100 slider, snaps to multiples of 5)."}
}