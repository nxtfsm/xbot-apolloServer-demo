// ./src/__debugger__/_logger.js
const messages = []

export default function logger(msg) {
  messages.push(msg)
  console.log(messages[messages.length - 1])
}
