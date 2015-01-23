'use strict';
/**"Exercise 1.12."
*/
//*; The following pattern of numbers is called 
//*; Pascal's triangle.
//*; The numbers at the edge of the triangle are 
//*; all 1, and 
//*; each number inside the triangle is 
//*; the sum of 
//*; the two numbers above it. 
//*; Write a procedure that 
//*; computes elements of Pascal's triangle by means of 
//*; a recursive process.

//*;     1
//*;    1 1 - mirror - equal parts (even row)
//*;   1 2 1 - mirror - non equal parts - around odd pivot position (odd row)
//*;  1 2 2 1 - mirror - equal parts (even row)
//*; 1 2 3 2 1 - mirror - non equal parts - around odd pivot position (odd row)
//*; pivot = rowNumber == elemsInRow

//*;    1st
//*;  1st 1st(last)
//*; 1st 1st + 1 1st(last)
//*;1st 1st + 1 pivot(max in row ) 1st + 1(last - 1) 1st(last)

/* if using Global scope
must be declared before function
*/	
var 
	drawRowResult = '',
	/*
	var testObj = {}
	testObj.r1 = [0, 1, 2, 3] 
		Object {r1: Array[4]}r1: Array[4]__proto__: Object
	testObj.r1[2]
		2
	testObj.r2 = {el0: 0}//initialize / create object element
		Object {el0: 0}
	testObj.r2.el1 = 1//if object exist, it is possible to add new 'key: value' pair
	testObj['r' + 4]="r4"//for name evaluation from variables
		"r4"
	testObj.r4
		"r4"
	*/
	rowValsString = '',
	//rowVals = [],
	receiver = '',//in Global scope 
	rowVals = {},//in Global scope 
	trianglesVals = {};//container for different type stuff
	//[];//array with elements of type array
	/*var 
		obj = JSON.parse(text);//and when the opposite needed  ?*/
	
//*;(+ (/ (- 5 (mod 5 2)) 2) (mod 5 2))
function pivot
	( n) {		
		//return (n - (n % 2)) / 2 + (n % 2);
    if (n % 2 === 0) {			
				return n / 2;
			}	else {			
				return (n + 1) / 2;
			}
	}

//pivot	(5);	
//*;(pivot 5)

//*; rowsAmount == height 
//*; rowCounter
//*; elemsInRow
function drawElem 
	( elem) {		
		//console.log( " " + elem);
		drawRowResult = drawRowResult + " " + elem;
		return " " + elem;
	}

//drawElem 	( 5);	
//*;	counters must be parameters and has initial values == 1
function drawRow
	(row,
		elem,
		rowPivot)	{
			if 
				//(!(elem > row)) {					
				(elem <= row) {					
					if 
						//(!(elem > rowPivot)) {							
						(elem <= rowPivot) {							
							drawElem (elem);					
							} else { 
								if (row % 2 === 0) {		
									//1 2 2 1
									//1 + 1 + 1 - 2 
									drawElem (rowPivot + 1 + (rowPivot - elem));
								} else {	
									//1 2 3 2 1
									drawElem (rowPivot + (rowPivot - elem));
								}
						}
						
					drawRow (
						row,
						(elem + 1),
						rowPivot);					
				} else {
					drawRowResult = drawRowResult + "/\n";
					return "\n";			
				}
		}	

/*var dR3 = drawRow (
		3,
		1,
		pivot (3));*/
		
function triangleOfPascal
	( rowsAmount,
	rowCount) {		
		if 
			( rowCount <= rowsAmount) {
				//console.log( 1 + " ");
				drawRow (
					rowCount,
					1,
					pivot (rowCount));
				//rowCount = rowCount + 1;
				triangleOfPascal
					( rowsAmount,
					rowCount + 1);
			} /*else if (elemAmount > 3){				
				//console.log( elemAmount + " ");	
			}*/
	}

/*Pascal_triangle (3);
Pascal_triangle (4);				
Pascal_triangle (5);*/	

//column - index in row starting with 0
/*
; 1 = {0, 0} = {0 - 1, 0 - 1} + {0 - 1, 0} = {-1, -1} + {-1, 0} = n/a + n/a
; 1 = {1, 0} = {1 - 1, 0 - 1} + {1 - 1, 0} = {0, -1} + {0, 0} = n/a + 1
; 1 = {1, 1} = {1 - 1, 1 - 1} + {1 - 1, 1} = {0, 0} + {0, 1} = 1 + n/a
*/
/** recursive procedure
*/ 
function elemOfPascal_sTriangle (
	row,
	column) {
		'use strict';	
		if ( 
			row === 0 && 
			column === 0 ) {
				return 1; //base case
			} else if (
				row < 0 || 
				column < 0) {				
				return 0; //n/a -- no such element
			} else {				
				/*return elemOfPascal_sTriangle (
						row - 1,
						column - 1) + 
					elemOfPascal_sTriangle (
						row - 1,
						column); //Ok
				*/
				return getElem (
						row - 1,
						column - 1) + 
					getElem (
						row - 1,
						column);
			}
	}//* oK.

/** 
* uses data structure to reduce computation time,
* while preserve / reuse previous calculations 
*/	
function getElem (
	row,
	elemIndex)	{
		'use strict';
		//NaN - when out of (data structure) range
		if (trianglesVals["row" + row]["elem" + elemIndex]) {			
			return trianglesVals["row" + row]["elem" + elemIndex];//Ok	
		} else {			
			return 0;//NaN	
		}
	}	

//	receiver - must be outside the scope
// else it recreates with each function call
// previous values - will not preserve
/**
* Trying to use curring
* warp function with function
*/ 
function exploreObj (
	specificObj/*,
	receiver*/)	{
		'use strict';
		
	/*return function getEntrails (//not work
		specificObj/*,
		receiver*//*)	{
			'use strict';*/					
			var
				elem;
				
			//retrieve 'names' of keys, in key: value pair
			for (elem in specificObj) {
				if (typeof specificObj[elem] !== "undefined" && 
					typeof specificObj[elem] == "object" && 
					/Object/i.test(specificObj[elem].constructor()) && 
					specificObj[elem] !== null) {
					
					receiver += "\n" + "{";
					
					exploreObj (
					//this.getEntrails (
						specificObj[elem]/*,
						receiver*/)/*()*/;
				} else {				
					receiver += "[" + specificObj[elem] + "] ";
				}
			}
			
			receiver += "}";
			
			return receiver;
		//}
	}	
	
//some mistake possible from current row starting with 0 and 
//row counter starting from 1	
function fillRow (
	row,
	elemIndex/*,
	rowVals*/)	{
		'use strict';	
		/*var 
			rowValsString = '';*/
			
		if 
			(elemIndex <= row) {	
				//from 0 to 'row'
				/*rowVals[elemIndex] = elemOfPascal_sTriangle (
					row,
					elemIndex);*/
				rowVals['elem' + elemIndex] = elemOfPascal_sTriangle (
					row,
					elemIndex);
				
				//next element index in row				
				fillRow (
					row,
					elemIndex + 1,
					rowVals);	
					
				//return rowVals;	//return only first iteration
			} else {
				//next row delimiter 
				//drawRowResult = drawRowResult + "/\n";
				//size of array must be growing and 
				//old values be replaced by new ones 
				//console.log("rowVals is: " + rowVals);//* Ok.
				//rowVals = {};//clear all (values), but return none
				return rowVals;
				
				//getRow (	rowVals);//?
				//return /*"\n"*/rowVals;	//not return parameter value		
				//return rowValsString;	//not return inner variable value	ether 	
				/*return function getRow (
					rowVals)	{
						'use strict';
						return rowVals;	
					};//undefined*/
			}
			//return rowVals;//return only first iteration
			/*return function getRow (
				)	{
					'use strict';
					return rowVals;	
				}();//undefined	
			*/	
	}// not Ok - strange return value
	// Ok if using / changing / writing to the variable outside self scope
	
/*var row0 = fillRow (
	0,
	0,
	[]);*/
	
// parameter as state / environment of / for	procedure 
// and for initialization rowCount = 1; row = column = 0
function fillTriangle (
	/*trianglesVals,*/
	rowsAmount,
	rowCount/*,
	row,
	column*/) {	
		'use strict';
		if 
			( rowCount <= rowsAmount) {
				//zero based index
				//trianglesVals["row" + rowCount - 1] = 
				//first call - initialization
					fillRow (
						rowCount - 1,//a started from 1, but rows from 0
						0/*,
						rowVals*/);
						
				trianglesVals["row" + (rowCount - 1)] = rowVals;
				rowVals = {};//clear all (values)
				
				//recursion 
				//(in) each row have rowCount columns 
				fillTriangle ( 
					/*trianglesVals,*/
					rowsAmount,
					rowCount + 1/*,
					row,
					column*/);
					
				return trianglesVals;	
			} 
	}
	
/*fillTriangle (
	trianglesVals,
	5,
	1,
	0,
	0);	*/
					
