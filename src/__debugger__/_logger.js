// ./src/__debugger__/_logger.js
const messages = []

export default function logger(msg) {
  !!msg ? parseMsg() : clearConsole()

  function parseMsg() {
    messages.push({ [messages.length] : msg })
    typeof msg === "string" ? printOutput() : switchObj()
  }

  function printOutput() {
      console.log(messages[messages.length - 1][messages.length - 1])
    }

  function switchObj() {
    try {
      Object.keys(msg).map(key => {
        if (key === 'info') { console.info( msg[key] )}
        if (key === 'err') { console.error( msg[key] )}
      })
    }
    catch(err) {
      console.log(`switchObj didn't know how to handle this obj: ${err}`)
    }
  }

  function clearConsole() {
    messages.push('console cleared when logger() received null')
    console.clear()
  }

}
