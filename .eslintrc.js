module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'next',
    ],
    plugins: [
        'react',
        'react-hooks'
    ],
    rules: {
        semi: ['error', 'always'],
    },
    ignorePatterns: [
        '/node_modules/*',
        '/.next/*',
        '/public/sw.js',
        '/public/workbox-327c579b.js',
        '/tailwind.config.js',
        '/next.config.js',
        '/postcss.config.js'
    ],
};