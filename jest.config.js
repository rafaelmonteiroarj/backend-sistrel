const { resolve } = require("path");

const root = resolve(__dirname);

module.exports = {
  rootDir: root /**  raiz do diretório que contém o arquivo de configuração do Jest */,
  displayName:
    "root-tests" /** Permite que uma etiqueta seja impressa ao lado de um teste durante sua execução. */,
  testMatch: [
    "<rootDir>/src/**/__tests__/*.ts"
  ] /** Os padrões global que Jest usa para detectar arquivos de teste. */,
  testEnvironment: "node" /** O ambiente de teste que será usado para teste. */,
  clearMocks: true /** Limpe automaticamente chamadas e instâncias antes de cada teste. */,
  preset:
    "ts-jest" /** Uma predefinição que é usada como base para a configuração de Jest. */,
  collectCoverage: true /** Indica que as informações de coleta do teste devem ser coletadas e reportadas no console. */,
  collectCoverageFrom: [
    "src/app/**/*.ts"
  ] /** Um padrão glob relativo à rootDircorrespondência dos arquivos dos quais as informações de cobertura precisam ser coletadas. */,
  coverageDirectory:
    "test/coverage" /** O diretório onde o Jest deve enviar seus arquivos de cobertura */,
  coverageReporters: [
    "text",
    "lcov"
  ] /** Uma lista de nomes de repórteres que Jest usa ao escrever relatórios de cobertura */
};
