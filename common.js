


var otpFlag;
let count=1;
  let host="https://test-whjl.onrender.com"
  // let host="http://localhost:8081"
  // const ACAO="http://127.0.0.1:5500";
  const ACAO="https://actshopmoney.netlify.app";

  // let userAgent=!navigator.userAgent.includes("Windows");
   let userAgent=true;


   
let autoref=()=>{
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
                if(h==22 && m==5 && s==0 ){
                      let url=`${host}/v1/app/RefreshIncome`;

                        const request= new Request(url, {
                          method: "put"
                        });
                          fetch(request)
                                    .then((response)=>{
                                    
                                      let j=response.body;
                                          // console.log(j)
                                          j.then((data)=>{
                                            // console.log(data)
                                          })
                                    })
                                    .catch((error)=>{
                                    })
                }
                else{     

                }
  }

  setInterval(()=>{
    autoref();
  }, 1000);


    let login=()=>{
              if(userAgent){
                document.getElementById("login").style.display="block";
                document.getElementById("signUp").style.display="none";
              }
              else{
                swal({
                  title: "error!",
                  text: "This App Open in Mobile ONly",
                  imageUrl: "images/thumbs-up.jpg"
              });      

              }
          }



  

        var obj={
                  mobile: 0,
                  password: "",
                  bonus: 0,
                  totayEarn:0.0,
                  yesterdayEarn:0.0,
                  orderCount:0,
                  refer: [
                    
                  ]
              }

     let loginBtn=()=>{
                  let form1=document.getElementById("form-1");
                    let mobile=document.getElementById("mobile").value;
                  let password=document.getElementById("password").value;

                  let loginbtnId=document.getElementById("loginbtn");
                  
                  // console.log(mobile);
                  // console.log(password);

                  obj.mobile=mobile;
                  obj.password=password;

                  // console.log("Obj print is : "+obj)
                  let url=`${host}/v1/app/login`;

                  const request = new Request(url, {
                                  method: "Post",
                                  
                                  body: JSON.stringify(
                                    { 
                                      "mobile": obj.mobile ,
                                      "password": obj.password
                                    }
                                  ),
                                  headers: {
                                    'Accept' : 'application/json',
                                    'Content-type': 'application/json; charset=UTF-8',
                                    'Access-Control-Allow-Origin':ACAO,
                                        }  
                                  });            
                        fetch(request)
                                .then((response)=>{ 
                                 
                                    let j=response.json();
                                      j.then((data)=>{
                                    
                                        console.log(data.token);
                                        console.log(data);
                                        console.log(data.user);
                                        let data1= data.user;

                                      if(data.varify){
                                            obj.mobile=data1.mobile;
                                            obj.password=data1.password;
                                            obj.bonus= data1.bonus;
                                            obj.refer=data1.refer;
                                            obj.totayEarn=data1.totayEarn;
                                            obj.yesterdayEarn=data1.yesterdayEarn;
                                            obj.orderCount=data1.orderCount;
                                          
                                            localStorage.setItem("mobile",obj.mobile);
                                            localStorage.setItem("password",obj.password);
                                            localStorage.setItem("bonus",obj.bonus);
                                            localStorage.setItem("todayEarn",obj.totayEarn);
                                            localStorage.setItem("yesterDay",obj.yesterdayEarn);
                                            localStorage.setItem("orderCount",obj.orderCount);

                                            localStorage.setItem("token",data.token);

                                            localStorage.setItem("refer",obj.refer);
                                           


                                          location.replace("dashBord.html")
                                      }
                                        else if (data.error=="User currently  logIn in Another Window"){        
                                                  alert("User currently  logIn in Another Window");
                                      }
                                      else  alert("Wrong Mobile Or  Password");
                                      })
                                      .catch((error)=>{
                                        console.log("magage for dataError : "+error)
                                      })
                                })
                                .catch((error)=>{
                                  // console.log(error)
                                  alert("Server is Not REady pleass Try again same time....")
                                  location.replace("dashBord.html");
                                })         
                }



          let signUp=()=>{
                 if(userAgent){
                   
                    document.getElementById("login").style.display="none";
                    document.getElementById("signUp").style.display="block";
                  }
                    else{
                      swal({
                        title: "error!",
                        text: "This App Open in Mobile ONly",
                        imageUrl: "images/thumbs-up.jpg"
                    });      
      
                    }
                  
                }

          let userSave= async ()=>{
            var flag=true;

                      let mobile1= document.getElementById("mobile1").value;
                      let pwd1= document.getElementById("pwd1").value;

                     let email= document.getElementById("email").value;
                    //  let sentOTP=`${host}/v1/app/SendOtp/`+email;

                     let t =await sentOTP(email);
                      let count=1;
                    while(flag){

                      let msg= prompt("Enter Otp "+ "         "+ "trying to Only 3 time... "+"    "+"attempt "+count);
                      

                            console.log("otp is : "+msg)
                              console.log("massage of otp is : ", msg  , "    ",t)
                     if(msg==null){
                              flag=false;
                         }     
                     
                      else if (t==msg) {

                         let signUpApi=`${host}/v1/app/register`;
   
                         let request= new Request(signUpApi,{
                                       method: "Post",
                                     
                                       body: JSON.stringify(
                                         { 
                                          "mobile" :mobile1,
                                           "password":pwd1
                                         }
                                       ),
                                       headers: {
                                         'Accept' : 'application/json',
                                         'Content-type': 'application/json; charset=UTF-8',
                                             }  
                                       }); 

                                await fetch(request)
                                             .then((response)=>{
                                                  console.log("responce status code: "+response.status);
                                                  console.log(response.statusText);
                                                 let j=response.json();
                                                 j.then((data)=>{
                                                  console.log("error Massage is : "+data.error)
                                                  if(data.error=="this mobileNo Are present"){
                                                        alert("this mobileNo Are present");
                                                  }
                                                  else  {
                                                    alert(" User save Successfully");
                                                    document.getElementById("login").style.display="none";
                                                    document.getElementById("signUp").style.display="none";
                                                  }
                                                 })
                                                 .catch((error)=>{
                                                   alert(" User Not Save");
                                                 })
                                             })        
                                             .catch((error)=>{
                                                 console.log(error)
                                                 alert(" Api error");
                                             });
                                    flag=false;
                      } 
                      else if(count==3){
                          flag=false;
                      }
                      else {
                          alert("please enter valid Otp..");
                          count++;
                     }

                    }
                  }

                let app=()=>{
                  
                    document.getElementById("login").style.display="none";
                    document.getElementById("signUp").style.display="none";
                }

                
            window.sentOTP=async (email)=>{
                    let Otp;
                  // let email= document.getElementById("email").value;
                  let sentOTp=`${host}/v1/app/SendOtp/`+email;

                 await fetch(sentOTp)
                        .then((response)=>{
                              let j=  response.json();
                                   
                        Otp=  j.then((data)=>{
                                  Otp =  data.otp;
                                      console.log("Otp is : "+Otp);
                                      return Otp;
                                    }
                                  )
                                  return Otp;
                              })
                              .catch((error)=>{
                                console.log(error.error);
                               
                              })
                            return Otp; 
                }
              
                
                
