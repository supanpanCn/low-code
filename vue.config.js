const path = require('path')
module.exports = {
    lintOnSave:true,
    publicPath:'./',
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',path.join(__dirname,'src'))
        .set('~utils',path.join(__dirname,'src/utils'))
        .set('ui',path.join(__dirname,'src/components'))
    }
}