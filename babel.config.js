const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
  presets: [
    [
      // 预设polyfill
      '@babel/preset-env',
      {
        // polyfill 只加载使用的部分
        useBuiltIns: 'usage',
        // 使用corejs解析，模块化
        corejs: '3'
      }
    ],
    // 解析react
    '@babel/preset-react'
  ],
  plugins: [
    isDEV && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-runtime']
  ].filter(Boolean)
}
