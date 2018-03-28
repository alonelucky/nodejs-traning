const grpc = require("grpc")
const hello_proto = grpc.load("./hello.proto").helloworld

function main (){
    let client = new hello_proto.Greeter("127.0.0.1:3005",grpc.credentials.createInsecure())
    let user = new hello_proto.UserRoute("127.0.0.1:3005",grpc.credentials.createInsecure())

    client.sayHello({name:"nicai"},(e,res)=>{
        console.log(res)
    })

    client.mytest({url:"/abc?a=123"},(e,res)=>{
        console.log(res)
    })

    let obj = {
        name:"xaioli",
        passwd:"123456"
    }
    user.getData(obj,(e,res)=>{
        console.log(res)
    })
}

main()