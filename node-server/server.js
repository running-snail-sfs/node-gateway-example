let http  = require('http')
let fs = require('fs')
const chalk = require('chalk');
let conifg = require('./proxy-conf')


let app = http.createServer ( function(request,response){
    let url = request.url
    if(request.url!=='/favicon.ico'){//清除第二次访问
        for ( var key in conifg){
            if( url.indexOf(key) >-1 ){
                let info = conifg[key].target.split(':')
                let opt = {
                    protocol: info[0]+':',
                    host:    info[1].slice(2),
                    port:    info[2] || 80,
                    method:  request.method,//这里是发送的方法
                    path:    url,     //这里是访问的路径
                    json: true,
                    headers: request.headers
                }
                proxy( opt, response,request )//代理方法
                return;
            }

        }
        //正常的读取文件和其他资源加载
        fs.readFile(__dirname + ( url==='/' ? '/index.html':url ), function( err, data ){
            if( err ){
                console.log( 'file-err',err )
            }else{
                response.end( data )
            }
        });
    }
} ) 

//代理转发的方法
function proxy( opt,res ,req){
    var proxyRequest = http.request(opt, function(proxyResponse) { //代理请求获取的数据再返回给本地res
        proxyResponse.on('data', function(chunk) {
            res.write(chunk, 'binary');
        });
        //当代理请求不再收到新的数据，告知本地res数据写入完毕。
        proxyResponse.on('end', function() {
            res.end();
            console.log(chalk.yellow('接口转发到-----'+opt.protocol+opt.host+opt.path));
            
        });
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    }); 
    
    //data只有当请求体数据进来时才会触发
    //尽管没有请求体数据进来，data还是要写，否则不会触发end事件
    req.on('data', function(chunk) {
        proxyRequest.write(chunk, 'binary');
    });

    req.on('end', function() {
        //向proxy发送求情，这里end方法必须被调用才能发起代理请求
        //所有的客户端请求都需要通过end来发起
        proxyRequest.end();
    });
    
}


app.listen(8000)
console.log( chalk.green('server is run on http://localhost:8000/'))