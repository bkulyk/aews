module.exports = {
  reporter: ['console', 'html', 'lcov', 'json'],
  output: ['stdout', 'coverage/coverage.html', 'coverage/lcov.info', 'coverage/data.json'],
  globals: 'SharedArrayBuffer,Atomics,queueMicrotask,__extends,__assign,__rest,__decorate,__param,__metadata,__awaiter,__generator,__exportStar,__values,__read,__spread,__await,__asyncGenerator,__asyncDelegator,__asyncValues,__makeTemplateObject,__importStar,__importDefault',
};