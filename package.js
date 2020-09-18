Package.describe({
  summary: "Mandrill",
  name: 'c316:mandrill',
  version: '1.0.2',
  git: "https://github.com/c316/meteor-mandrill",
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.11');
  api.use(['email', 'http'], ['server']);
  api.addFiles('mandrill.js', 'server');
  api.export('Mandrill');
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('c316:mandrill');
  api.addFiles('tests.js', 'server');
});
