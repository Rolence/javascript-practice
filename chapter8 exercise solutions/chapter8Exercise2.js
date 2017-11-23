var box =  {
locked:true, 
unlock:function() {this.locked = false; }, 
lock:function() {this.locked = true; }, 
_content:[], 
get content() {
if (this.locked)throw new Error("Locked!"); 
return this._content; 
}
}; 
function withBoxUnlocked(body) {
var locked = box.locked; 
if ( ! locked)
return body; 

box.unlock(); 
try {
return body; 
}finally {
box.lock(); 
}
}

withBoxUnlocked(function () {
box.content.push("main piece"); 
}); 

try {
withBoxUnlocked(function () {
throw new Error("Abort!"); 
}); 
}catch (e) {
console.log("Error raised:", e); 
}

console.log(box.locked); 
//console.log(box.unlock());
// → true