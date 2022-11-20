// El nombre de la función puede ser cualquiera, pero suele llamarse run
// He accedido a este directorio y ejecutado npm init -y para que se genere el fichero package.json e instalar
// paquetes necesarios para realizar acciones en GitHub Actions:
// npm install @actions/core @actions/github @actions/exec
// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
// https://github.com/actions/toolkit
const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // log en GitHub Actions workflow
  core.notice('Hello from my custom JavaScript Action!');
}

run();
