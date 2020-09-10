module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [
            2,
            'always',
            ['core', 'providers', 'config', 'logs', 'entry', 'scripts', 'deps', 'lint', 'infra'],
        ],
    },
};
