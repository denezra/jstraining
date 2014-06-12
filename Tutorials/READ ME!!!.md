/*===================JAVASCRIPT IMPORTANT NOTES==========================*/

/*
 *				BINDING SCOPES
 */

There are three(3) kinds of binding methods in Javascript, they are:

	* Apply
	* Bind
	* Call

LEGENDS:
	^ 	= look at end of the lesson for meaning.
	<> = Reserved word for Javascript.

- <Apply> and <Call> are nearly identical and they are used for borrowing methods and explicitly^ for setting the <this>^ value. We also use <Apply> for variable-arity^ functions.

- On the other hand, we user <Bind> for setting the <this>^ value in methods, and for currying^ functions.

/*
 *			 	JAVASCRIPT’S Bind Method
 */

- The <bind()> method is used primarily to call a function with the this value set explicitly. It other words, <bind()> allows you to easily set which specific object will be bound to this when a function or method is invoked. 

REFERENCE LINK
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

SYNTAX
function_name.bind(thisArg[, arg1[, arg2[, ...]]])

PARAMETERS
	- thisArg : The value to be passed as the this parameter to the target function when the bound function is called. The value is ignored if the bound function is constructed using the new operator.
	- arg1, arg2, ... : Arguments to prepend to arguments provided to the bound function when invoking the target function.

WORKAROUND FIX FOR bind method on older browser:
// Credit to Douglas Crockford for this bind method
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError ("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call (arguments, 1),
                fToBind = this,
                fNOP = function () {
                },
                fBound = function () {
                    return fToBind.apply (this instanceof fNOP && oThis
                            ? this
                            : oThis,
                            aArgs.concat (Array.prototype.slice.call (arguments)));
                };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP ();

        return fBound;
    };
}

/*
 *			 	JAVASCRIPT’S Apply and Call Method
 */

- The <Apply> and <Call> methods are two of the most often used Function methods in JavaScript, and for good reason: they allow us to borrow functions and set the this value in function invocation. And the apply function in particular allows us to execute a function with an array of parameters, such that each parameter is passed to the function individually when the function executes and great for variadic^ functions.

- The most common use of the Apply and Call methods in Javascript is probably to borrow functions. We can borrow functions with the Apply and Call methods as we did with the bind method, but in a more robust and versatile manner.

REFERENCE LINK
	Apply : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
	Call 	: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

SYNTAX
	Apply : 
		function_name.apply(thisArg, [argsArray])
	Call 	: 
		function_name.call(thisArg[, arg1[, arg2[, ...]]])

PARAMETERS
Apply:
	- thisArg : The value of this provided for the call to fun. Note that this may not be the actual value seen by the method: if the method is a function in non-strict mode code, null and undefined will be replaced with the global object, and primitive values will be boxed.
	- argsArray : An array-like object, specifying the arguments with which fun should be called, or null or undefined if no arguments should be provided to the function. Starting with ECMAScript 5 these arguments can be a generic array-like object instead of an array. See below for browser compatibility information.
Call:
	- thisArg : The value to be passed as the this parameter to the target function when the bound function is called. The value is ignored if the bound function is constructed using the new operator.
	- arg1, arg2, ... : Arguments to prepend to arguments provided to the bound function when invoking the target function.

	- variadic : is a function of indefinite arity.
	- currying : Currying is when you break down a function that takes multiple arguments into a series of functions that take part of the arguments.
	- explicitly : Stated clearly and in detail, leaving no room for confusion or doubt.
	- variable-arity : In programming it is the number of arguments a function or operator takes.