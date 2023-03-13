module.exports ={
    resolve:{
        fallback:{ 
            zlib: require.resolve("browserify-zlib"),
            url: require.resolve("url/"),
            path: require.resolve("path-browserify") ,
            util: require.resolve("util/"),
            stream: require.resolve("stream-browserify"),
            path: require.resolve("path-browserify"),
            crypto: require.resolve("crypto-browserify")
            }
    }
}