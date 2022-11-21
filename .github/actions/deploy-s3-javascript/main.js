// El nombre de la función puede ser cualquiera, pero suele llamarse run
// He accedido a este directorio y ejecutado npm init -y para que se genere el fichero package.json e instalar
// paquetes necesarios para realizar acciones en GitHub Actions:
// npm install @actions/core @actions/github @actions/exec
// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
// https://github.com/actions/toolkit
//
// IMPORTANTE: NO se puede añadir a .gitignore el node_modules generado aquí. Es requerido por GitHub Actions
// para ejecutar la acción con éxito.
const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // 1) Obtener los valores del input del custom JavaScript action
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // No se usa en el ejemplo, pero se indica para que se sepa que github.getOctokit()
  // permite enviar muy fácilmente requests al REST API de GitHub y también obtenemos acceso al context object
  // que ofrece algunos valores del context object de GitHub.
  // github.getOctokit();
  // github.context.

  // 2) Subir archivos
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // log en GitHub Actions workflow
  core.notice('Hello from my custom JavaScript Action!');
}

run();
