module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: '18.2',
        },
    },
    rules: {
        'react/jsx-no-target-blank': 'warn',
        'react/prop-types': 'off',
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'eqeqeq': ['error', 'always'],
        'curly': 'error',
        'semi': ['error', 'always'],
        'react/no-unknown-property': ['error', { ignore: [
            'object', 'position', 'rotation', 'args',
            'intensity', 'groundColor', 'angle', 'penumbra',
            'castShadow', 'receiveShadow', 'shadow-mapSize',
            'position-y', 'rotation-y',
            'polygonOffset', 'polygonOffsetFactor', 'flatShading',
            'stride', 'frustumCulled', 'sizeAttenuation', 'depthWrite',
        ] }],
    },
};
