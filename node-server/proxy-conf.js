//代理配置
let conifg = {
    '/manage/':{
        target: 'http://www.baudu.com',
        changeOrigin: true,
        secure: false,

    },
}
module.exports = conifg