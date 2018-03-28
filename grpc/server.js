const grpc = require("grpc")

const hello_proto = grpc.load("./hello.proto").helloworld

const server = new grpc.Server()

function sayHello(call,cb){
    console.log(call)
    cb(null,{message:"hello "+call.request.name})
}

function mytest(call,cb){
    cb(null,{html:"你请求的内容来了"})
}

function getData(call,cb){
    cb(null,{
        name:"xaioli",
        passwd:"123456",
        email:"57544544545"
    })
}

function main(){
    server.addService(hello_proto.Greeter.service,{sayHello,mytest})
    server.addService(hello_proto.UserRoute.service,{getData})
    server.bind("127.0.0.1:3005",grpc.ServerCredentials.createInsecure())
    server.start()
}

main()
