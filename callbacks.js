'use strict'
var A = function(callback) {
    setTimeout(function() { console.log("one"); callback();}, 100);    
}

var B = function(callback) {
    setTimeout(function() { console.log("two"); callback();}, 100);    
}

var C = function(callback) {
    setTimeout(function() { console.log("three");  callback();}, 100);    
}

var D = function(callback) {
    setTimeout(function() { console.log("four"); callback();}, 100);    
}

var arr = new Array();
arr.push(A);
arr.push(B);
arr.push(C);
arr.push(D);
arr.push(function(){});

var result = arr.reduceRight(function(a,b) {
	return function() {b(a);};
});

result();
