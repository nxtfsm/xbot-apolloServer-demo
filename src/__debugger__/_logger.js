// ./src/__debugger__/_logger.js
const messages = []

export default function logger(msg) {
  !!msg ? printOutput() : clearConsole()

  function printOutput() {
      messages.push(msg)
      console.log(messages[messages.length - 1])
    }

  function clearConsole() {
    messages.push('console cleared because logger() received null')
    console.clear()
  }

}
