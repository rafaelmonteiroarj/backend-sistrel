module.exports = {
  semi: true, /* definido como true significa que o Prettier adicionará ponto e vírgula quando necessário. */
  bracketSpacing: true, /** Imprima espaços entre colchetes em literais de objeto. { foo: bar } */
  arrowParens: "avoid", /** Omita os parênteses quando possível. Exemplo:x => x */
  trailingComma: "none", /** definido como none significa que o Prettier removerá as vírgulas finais no final dos objetos. */
  singleQuote: false, /** definido como true significa que o Prettier usará aspas simples automaticamente em vez de aspas duplas. */
  printWidth: 80, /** definido como 80 especifica que a impressora quebrará todas as linhas que excedam 80 caracteres. */
  "endOfLine": "auto"
}
