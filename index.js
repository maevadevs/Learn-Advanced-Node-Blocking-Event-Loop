// DEPENDENCIES
// ************

const path = require('path')
const express = require('express')
const lupus = require('lupus')

// SERVER CONFIG
// *************

const app = express()
const port = process.env.PORT || 8080 // Using Port 80 will needs sudo
const servePath = path.join(__dirname, '.')

// MIDDLEWARE: SERVE STATIC
// ************************

app.use(express.static(servePath))

// ROUTES
// ******

let isOpen = false

app.get('/isopen', (req, res) => {
  isOpen = true
  res.send({
    message: `Open: ${isOpen}: \
      /// Func With 'Open': This function was done for a while already but was blocked\
      even behind the 'for' loop within the "Event Loop"!!'`
  })
})

app.get('/whileloop', async (req, res) => {
  await whileLoop()
  let x = 0
  while (x < 9999999990) { x++ }// <-- ** "Event Loop" Blocked here ** Some CPU Intensive task **
  res.send({
    message: 'The first loop is now done'
  })
})

app.get('/whileloop-lupus', async (req, res) => {
  let x = 0
  let xMax = 20000
  lupus(x, xMax, (iterator) => {
    console.log(`We are on ${iterator}`)
  }, () => {
    res.send({
      message: `The first loop is now done.`
    })
  })
})

app.get('/forloop', (req, res) => {
  for (let y = 0; y < 999; y++) {} // <-- Faster than the previous loop but blocked behind the 'while' loop
  res.send({
    message: 'The second loop is now done: Second loop was done a while ago but was blocked in the event loop by first loop'
  })
})

app.get('/some-route', (req, res) => {
  let total = 0
  // Some sort of loop: This could potentially block all routes from
  // from executing and exponentially take longer for every single request that hit
  // this route. Assume limit is even bigger than 99999. Or assume nested loop operations.
  for (let y = 0; y < 99999; y++) {
    // Some sort of iterative operation
    total += y
  }
  // Finally, respond... If 1000s concurrent users, and I am the nth user,
  // how many milliseconds has passed until I get here?
  res.send({
    total: total
  })
})

// LOOP FUNCTION
// *************

async function whileLoop () {
  return new Promise((resolve, reject) => {
    try {
      let x = 0
      while (x < 9999999990) { x++ }
      resolve(x)
    } catch (e) {
      reject(new Error('Loop failed'))
    }
  })
}

// START LISTENING
// ***************

app.listen(port, () => console.log(`Express server is up on port ${port}...`))
