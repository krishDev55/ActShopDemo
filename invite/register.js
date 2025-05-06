// let host="http://localhost:8081"
// const ACAO="http://127.0.0.1:5500";   


let host="https://test-fc0m.onrender.com"
  const ACAO="https://actshopmoney.netlify.app";

  // let userAgent=!navigator.userAgent.includes("Windows");

const urlParams = new URLSearchParams(window.location.search);
const inviteCode = urlParams.get('massage');
console.log("Code is : ",inviteCode);

let userAgent=!navigator.userAgent.includes("Windows");
// let userAgent=true;

if(userAgent){
   
  }
  else{
    swal({
      title: "error!",
      text: "This App Open in Mobile ONly",
      imageUrl: "images/thumbs-up.jpg"
  });      

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

                 let signUpApi=`${host}/v1/app/registerRef`;

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
                                'Access-Control-Allow-Origin':ACAO,
                                "email":email,
                                "refCode":inviteCode
                                     }  
                               }); 

                        await fetch(request)
                                     .then((response)=>{
                                          console.log("responce status code: "+response.status);
                                          console.log(response.statusText);
                                         let j=response.json();
                                         j.then((data)=>{
                                       
                                          if(data.error=="this mobileNo Are present"){
                                                alert("this mobileNo Are present");
                                          }
                                          else  {
                                            alert(" User save Successfully");
                                            location.replace(ACAO)
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