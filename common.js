


var otpFlag;
let count=1;
  let host="https://test-whjl.onrender.com"

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
              console.log("login button check")
              document.getElementById("signUp").style.display="none";
              document.getElementById("login").style.display="block";
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
                                        }  
                                  });            
                        fetch(request)
                                .then((response)=>{ 
                                 
                                    let j=response.json();
                                      j.then((data)=>{
                                    
                                      if(data.mobile==obj.mobile && data.password==obj.password){
                                            obj.mobile=data.mobile;
                                            obj.password=data.password;
                                            obj.bonus= data.bonus;
                                            obj.refer=data.refer;
                                            obj.totayEarn=data.totayEarn;
                                            obj.yesterdayEarn=data.yesterdayEarn;
                                            obj.orderCount=data.orderCount;
                                          
                                            sessionStorage.setItem("mobile",obj.mobile);
                                            sessionStorage.setItem("password",obj.password);
                                            sessionStorage.setItem("bonus",obj.bonus);
                                            sessionStorage.setItem("todayEarn",obj.totayEarn);
                                            sessionStorage.setItem("yesterDay",obj.yesterdayEarn);
                                            sessionStorage.setItem("orderCount",obj.orderCount);

                                            sessionStorage.setItem("refer",obj.refer);
                                           


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
                                })         
                }



          let signUp=()=>{
                    console.log("signUp button check")
                    document.getElementById("login").style.display="none";
                    document.getElementById("signUp").style.display="block";

                  
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
              
                
                
