/* Execute #1, Finish #1 */ console.log('---start here!!!')
/* Execute #2, Finish #2 */ let isOpen = false
/* Execute #3, Finish #3 */ console.log(`Open: ${isOpen}`) // => false

// ASYNC Func: Example: server.get('path/to/res', (req, res) => {...})
// Execute #7 after 100ms of wait, normally Finish #6 but blocked behind Exec #5 eand Exec #6 in the "Event Loop"
// Finally, Finish #7
setTimeout(() => {
  isOpen = true
  console.log(`Open: ${isOpen}: \
  /// Func With 'Open': This function was done for a while already but was blocked\
  even behind the 'for' loop within the "Event Loop"!!'`)
}, 100) // Execute after 100 milliseconds

// ASYNC Func: Example: server.get('path/to/res', (req, res) => {...})
// Execute #5, normally finish #7 but the loop here block its execution in position #5
// Finally, Finish #5 after a very long wait
setTimeout(() => {
  let x = 0
  while (x < 9999999990) { x++ }// <-- ** "Event Loop" Blocked here ** Some CPU Intensive task **
  console.log('The first loop is now done')
}, 1) // Execute after 1 milliseconds

// ASYNC Func: Example: server.get('path/to/res', (req, res) => {...})
// Faster than above, but this loop is blocked by the first 'while' loop in the "Event Loop"
// Execute #6, normally Finish #5 but blocked until the above 'while' loop finish
// Finally Finish #6
setTimeout(() => {
  for (let y = 0; y < 999; y++) {} // <-- Faster than the previous loop but blocked behind the 'while' loop
  console.log('The second loop is now done: Second loop was done a while ago but was blocked in the event loop by first loop')
}, 1)

/* Execute #4, Finish #4 */ console.log('---End of file reached!!!')
