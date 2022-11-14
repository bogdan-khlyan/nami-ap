const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const app = express()

app.use('/api', createProxyMiddleware({target: 'https://nami.devserver.host', changeOrigin: true, cookieDomainRewrite: 'localhost'}))
app.use('/', createProxyMiddleware({target: 'http://192.168.31.128:8081', changeOrigin: true}))
app.use('/image', createProxyMiddleware({target: 'https://nami.devserver.host', changeOrigin: true}))

app.listen(8080, () => void console.log('start'))
