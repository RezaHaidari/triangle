
class Terminal {

  constructor(commands) {
    this.commandLine = document.querySelector('.terminal > .body');
    this.prompt = document.querySelector('.prompt');
    this.command = document.querySelector('.command');
    this.lineNumber = 0;
    this.currentCommands = null
    this.state = []
    this.lastCommand = ''
    this.commands = commands
  }

  init() {

    let notAllowedKeys = [8, 13, 16];

    document.addEventListener('keyup', (e) => {
      let commands = this.currentCommands || this.commands;
      if (e.keyCode === 8) this.command.innerHTML = this.command.innerHTML.slice(0, -1);
      if (e.keyCode === 13) this.getShellInput(commands);
      if (notAllowedKeys.includes(e.keyCode)) return;
      this.command.innerHTML += e.key;
    })
  }

  getShellInput(_commands) {

    this.lineNumber++;
    this.command.classList.remove('focus')
    let input = this.command.innerHTML.replace(' ', '');

    let hasInput = _commands['input'] ? _commands['input']['input'] : _commands[input] ? _commands[input]['input'] : null;
    let hasAction = _commands['input'] ? _commands['input']['action'] : null;

    if (!Object.keys(_commands).includes(input) && !hasInput && !hasAction) {
      this.displayError(`<span style="color:red;">${input} </span>: command not found`);
    } else {
      this.lastCommand = input;
    }

    if (_commands['input']) this.state.push(input);

    if (hasAction) {
      try {
        hasAction.method(this.state);
      } catch (error) {
        this.displayError(error);
        setTimeout(() => {
          this.clear();
        }, 3000)
      }
      this.state = [];
      this.currentCommands = this.commands;
      this.lastCommand = 'Root';
    }

    this.commandNewLine(hasInput ? hasInput.title : hasAction ? 'Root' : this.lastCommand);

    this.command = document.querySelector(`.command${this.lineNumber}`);


    let hasCommands = _commands['input'] ? _commands['input'] : _commands[input];

    if (hasCommands && Object.keys(hasCommands).length && !hasAction) {
      this.currentCommands = hasCommands
    }
    return input;
  }

  displayError(errorString) {
    this.prompt.innerHTML += ` <p>
    -bash: ${errorString}
  </p>`;
  }
  commandNewLine(name) {
    this.prompt.innerHTML += ` <p>
    ${name} > <span class="command${this.lineNumber} command focus"> </span>
    </p>`
  }
  clear() {
    this.prompt.innerHTML = '<p> Root > <span class="command focus"> </span></p>'
    this.command = document.querySelector('.command');
  }
}

export default Terminal;