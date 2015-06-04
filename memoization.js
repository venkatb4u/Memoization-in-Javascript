 (function() {
     var totalinvokes = 0; // to track the no. of function invokes

     /* 
      * Normal Fibonacci Function
      */
     var fibonacci = function(num) {
         try {
             ++totalinvokes;
             if (isNaN(num))
                 throw "Sorry, Not a number";
             if (num >= 2)
                 return (fibonacci(num - 1) + fibonacci(num - 2));
             else
                 return (num === 1) ? 1 : 0;
         } catch (err) {
             alert(err);
         }
     };

     /* 
      * Memoized Fibonacci Function
      * Application of Memoization over all of the occurrences of recursive calls.
      */
     var cache = {},
         memFib = function(num) {
             try {
                 if (isNaN(num))
                     throw "Sorry, Not a number";
                 if (num >= 2) {
                     if (num in cache) {
                         return cache[num];
                     } else {
                         ++totalinvokes;
                         return cache[num] = (memFib(num - 1) + memFib(num - 2));
                     }
                 } else {
                     ++totalinvokes;
                     return (num === 1) ? 1 : 0;
                 }
             } catch (err) {
                 alert(err);
             }
         };
     /*
      *  Memoize for all Function objects
      */
     Function.prototype.memoize = function() {
         var cache = {},
             self = this;
         return function(arg) {
             if (arg in cache) {
                 return cache[arg];
             } else {
                 return cache[arg] = self(arg);
             }
         }
     };


     /*
      * Binding Memoization over non-memoized fibonacci function
      */
     var singleLevelMemoizedFibonacci = fibonacci.memoize();


     /*
      * Binding Memoization over memoized fibonacci function
      */
     var multipleLevelMemoizedFibonacci = memFib.memoize();
 })();

 /* 
  * PERFORMANCE COMPARISON
  * (Try the following commands in console one by one, to understand the time consumption of each type of functions)
  */

 fibonacci(30); // outputs: 832040 with 5 secs of delay
 totalinvokes; // outputs: 2692537
 totalinvokes = 0; // initialize the totalinvokes back to 0

 {
     fibonacci(30); // outputs: 832040 with the same 5 secs of delay
     totalinvokes = 0;
 }

 /* ------------------------- */

 singleLevelMemoizedFibonacci(30); // outputs: 832040 with 5 secs of delay
 totalinvokes; // outputs: 2692537
 singleLevelMemoizedFibonacci(30); // outputs: 832040 IMMEDIATELY (cached -- Outer/Single level of Memoization)
 totalinvokes = 0;

 /* ------------------------- */

 multipleLevelMemoizedFibonacci(30); // outputs: 832040 IMMEDIATELY (repeated argument-functions are not executed, rather fetched from cache -- Inner/Multiple level of Memoization)
 totalinvokes; // outputs: 32 :)  It takes just 32 unique argument loops
 totalinvokes = 0;

 /* ------------------------- */

 multipleLevelMemoizedFibonacci(30); // outputs: 832040 VERY IMMEDIATELY (cached -- Outer/Single level of Memoization)
 totalinvokes; // outputs: 0 :D  Just fetch the cached value of cache[30]
