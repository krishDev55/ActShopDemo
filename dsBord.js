
// import { sentOTP } from './common.js'; // Import the function from utils.js

// let host="https://test-whjl.onrender.com"
let host="http://localhost:8080"


var firstLastName;
var userData;
let userBankDetails;

var mobile =window.sessionStorage.getItem("mobile");
var password=window.sessionStorage.getItem("password");
var bonus=Number(Number(window.sessionStorage.getItem("bonus")).toFixed(2));
var todayEarn=Number(Number(window.sessionStorage.getItem("todayEarn")).toFixed(2));
var yesterDay=Number(window.sessionStorage.getItem("yesterDay"));
var orderCount=Number(window.sessionStorage.getItem("orderCount"));


var refer=window.sessionStorage.getItem("refer");

let token= window.localStorage.getItem("token");

    // console.log("Object print is : "+mobile)
    // console.log("Object print is : "+password)
    // console.log("Object print is : "+bonus)
    // console.log("Object print is : "+refer)

   

    let uname= document.getElementById("userName");
    // uname.innerHTML=mobile;
     
   
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



let logoutid= document.getElementById("logoutid");
let logOutApi=`${host}/v1/app/logOut/${mobile}`;

    
    
    let logOut=()=>{
        
        console.log(`Bearer ${token}`);

        const request = new Request(logOutApi, {
            method: "GET",
            
            headers: {
            'Accept' : 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
          Authorization : `Bearer ${token}`,
                     "alg": "HS256",
                     "typ": "JWT"
          
                }  
            }); 

        fetch(request)
                            .then((responce)=>{
                                let j= responce.json();
                                j.then((data)=>{

                                    console.log("logOutButtonWorkDone")
                                    console.log(data.msg)
                                    location.replace("index.html");
                                })
                                .catch((error)=>{
                                    console.error(error);
                                })
                            })
                }



    let FindByMobile= `${host}/v1/user/getUserByMobile/${mobile}`;
                
                var firstName="";
                let getUserFindByMobile=()=>{
                          fetch(FindByMobile,{
                            method: "GET",
            
                            headers: {
                            'Accept'      : 'application/json',
                            'Content-type': 'application/json; charset=UTF-8',
                            Authorization : `Bearer ${token}`,
                                     "alg": "HS256",
                                     "typ": "JWT"
                          
                                }  

                          })
                                    .then((responce)=>{
                                        userData=responce.json();
                                        userData.then((data)=>{
                                            firstName=data.firstName;                                        
                                            let usname=document.getElementById("usName");
                                            firstLastName=firstName + " " +data.lastName;
                                            usname.innerHTML=firstLastName;

                                        })
                                        .catch((error)=>{
                                            
                                        })
                                    })
                                    .catch((error)=>{
                                        console.log(error)
                                    })
                }



                
     function openNav() {
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
              }
              
      function closeNav() {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("main").style.marginLeft= "0";
            }

      
            
            getUserFindByMobile();

            let bnkDetails= document.getElementById("bankDetails");
            let leftDiv= document.getElementById("leftdiv");
            let rightDiv= document.getElementById("rightdiv");
            let img= document.getElementById("img");
            let bnkForm= document.getElementById("upd_Bnkform");
            let upduser_Form= document.getElementById("upd_userform");



            let place_order=document.getElementById("place-order");
            let placeOrder1=document.getElementById("placeOrder");

            let products=document.getElementById("products");
            let products1=document.getElementById("products1");

            let divOrder=document.getElementById("divOrder");
            let divOrder2=document.getElementById("divOrder2");
          




    funtionGetByBankDetails=()=>{
       
        let bankApi=`${host}/v1/app/getbankDByMobile/${mobile}`;

                
        fetch(bankApi,{
                headers:{
               
                    'Accept'      : 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization : `Bearer ${token}`,
                             "alg": "HS256",
                             "typ": "JWT"
                  
                        
            }
        })
                 .then((responce)=>{
                        if(responce.ok){
                     userBankDetails= responce.json();
            }
        })

    } ;



    funtionGetByBankDetails();


            
            let bankAccount=()=>{
                
                let bankApi=`${host}/v1/app/getbankDByMobile/${mobile}`;
                
                fetch(bankApi)
                .then((responce)=>{
                    
                    if(responce.ok){
                        
                         userBankDetails= responce.json();

                        leftDiv.style.display="none";
                        rightDiv.style.display="none";
                        img.style.display="none";
                        bnkForm.style.display="none";
                        upduser_Form.style.display="none";
                        bnkDetails.style.display="block";

                        placeOrder1.style.display="none";
                        place_order.style.display="none";
            
                        products.style.display="none";
                        products1.style.display="none";
            
                        divOrder.style.display="none";
                        divOrder2.style.display="none";

                                     userBankDetails.then((data)=>{

                                               let Acno= data.accountNumber;
                                               let AcName= data.accountHolderName;
                                               let bname= data.bankName;
                                               let bbcn= data.bankBranch; 
                                               let ifsc= data.ifscCode;
                                               let acType= data.accountType;
                                               
                                                console.log("error is : "+data.error);

                                                document.getElementById("acNo").innerHTML=": "+Acno;
                                             document.getElementById("acNane").innerHTML=": "+AcName;
                                             document.getElementById("bbn").innerHTML=": "+bname;

                                             document.getElementById("bbcn").innerHTML=": "+bbcn;
                                             document.getElementById("ifsc").innerHTML=": "+ifsc;
                                             document.getElementById("type").innerHTML=": "+acType;
                                             document.getElementById("bal").innerHTML=": "+5003;


                                            })
                                            .catch((error)=>{
                                                console.log(error.error);
                                            })
                                }
                                else{
                                    alert("please Add the Bank details");
                                    console.log(responce.statusText)
                                    console.log(responce.status)
                                    home();
                                }
                            })
                                    .catch((error)=>{
                                        console.error(error)
                                    })



                         }


            let home=()=>{
                updateBonusApi1(mobile);

                leftDiv.style.display="none";
                rightDiv.style.display="none";
                img.style.display="block";
                bnkDetails.style.display="none";
                bnkForm.style.display="none";
                upduser_Form.style.display="none";

                placeOrder1.style.display="block";
                place_order.style.display="block";
    
                products.style.display="none";
                products1.style.display="none";
    
                divOrder.style.display="none";
                divOrder2.style.display="none";
                
                
                     }


            let persanalDetails=()=>{
            
            leftDiv.style.display="none";
            rightDiv.style.display="block";
            img.style.display="block";
            bnkDetails.style.display="none";
            bnkForm.style.display="none";
            upduser_Form.style.display="none";

            placeOrder1.style.display="none";
            place_order.style.display="none";

            products.style.display="none";
            products1.style.display="none";

            divOrder.style.display="none";
            divOrder2.style.display="none";

            

            
                        
                }
        


        let uptbank=()=>{
            
            

            leftDiv.style.display="none";
            rightDiv.style.display="none";
            img.style.display="none";
            bnkDetails.style.display="none";
            upduser_Form.style.display="none";

            placeOrder1.style.display="none";
            place_order.style.display="none";

            products.style.display="none";
            products1.style.display="none";

            divOrder.style.display="none";
            divOrder2.style.display="none";

            bnkForm.style.display="block";

            userBankDetails.then((data)=>{

                
                let mobileNumber= document.getElementById("mobNum");
                                mobileNumber.setAttribute("value",data.mobile)
                                
                                let acName= document.getElementById("acName");
                                acName.setAttribute("value",data.accountHolderName);
                                
                                let acNum= document.getElementById("acNum");
                                acNum.setAttribute("value",data.accountNumber);
                    
                                let bName= document.getElementById("bName");
                                bName.setAttribute("value",data.bankName);
                                
                                let b_branch= document.getElementById("b_branch");
                                b_branch.setAttribute("value",data.bankBranch);
                                
                                let ifsc= document.getElementById("ifsc1");
                                ifsc.setAttribute("value",data.ifscCode);
                                
                                let acType= document.getElementById("acType");
                                acType.setAttribute("value",data.accountType);
            })


                      


        }
       
        


       let btnSubmit=()=>{
      const saveBankDetails=`${host}/v1/app/addBankDetails`;
       
        let acName= document.getElementById("acName").value;
        let acNum= document.getElementById("acNum").value;
        let bName= document.getElementById("bName").value;
        let b_branch= document.getElementById("b_branch").value;
        let ifsc1= document.getElementById("ifsc1").value;
        let acType= document.getElementById("acType").value;


             const request = new Request(saveBankDetails, {
                                method: "Post",
                                
                                body: JSON.stringify(
                             { 
                                    "accountNumber": acNum ,
                                    "accountHolderName":acName,
                                    "bankName": bName ,
                                    "bankBranch":b_branch,
                                    "ifscCode": ifsc1,
                                    "accountType": acType,
                                    "mobile": mobile                                    
                                }
                                ),
                                headers: {
                                'Accept' : 'application/json',
                                'Content-type': 'application/json; charset=UTF-8',
                                    }  
                                });            

                        fetch(request)
                                    .then((responce)=>{
                                        console.log(responce.status);
                                         let j= responce.json();
                                         if(responce.ok){
                                                alert(" Bank Details Add Succcessfully");
                                                home();
                                         }
                                         else{
                                            alert("please inter valid input");
                                         }
                                    })
                                    .catch((error)=>{
                                        console.error(error)
                                    })
       }

       
       let uptUser =()=>{

        leftDiv.style.display="none";
        rightDiv.style.display="none";
        img.style.display="none";
        bnkDetails.style.display="none";
        bnkForm.style.display="none";

        placeOrder1.style.display="none";
        place_order.style.display="none";

        products.style.display="none";
        products1.style.display="none";

        divOrder.style.display="none";
        divOrder2.style.display="none";
        
        upduser_Form.style.display="block";
        


        let mobNum= document.getElementById("mobNum1");
        let fname= document.getElementById("firstName1");
        let lname= document.getElementById("lastName1");
        let email1= document.getElementById("email1");

        userData.then((data)=>{
            fname.setAttribute("value",data.firstName);
            lname.setAttribute("value",data.lastName);
            email1.setAttribute("value",data.email);
            mobNum.setAttribute("value",data.mobile);
           
            
        })

       } 


       let usersSubmit=()=>{
                const updataUserApi=`${host}/v1/user/updateUser`;
                console.log("inside userSubit button");
                    alert("inside method ")
                    let mobNum= document.getElementById("mobNum1").value;
                    let fname= document.getElementById("firstName1").value;
                    let lname= document.getElementById("lastName1").value;
                    let email1= document.getElementById("email1").value;
             

                   let otp= window.sentOTP(email1);
                    console.log("text Otp: "+otp)

                    userData.then((data)=>{
                    const request =  new Request(updataUserApi,{
                      method:"PUT",
                      
                      headers: {
                        'Accept' : 'application/json',
                        'Content-type': 'application/json; charset=UTF-8',
                            },  
                            body: JSON.stringify(
                                { 
                                       "id": data.id,
                                       "firstName":fname,
                                       "lastName": lname ,
                                       "mobile":data.mobile,
                                       "email": email1
                                                                     
                                   }),
                    })
                    console.log("before request method")
                   
                    fetch(request)
                            .then((responce)=>{
                       let j= responce.json();
                       j.then((data)=>{
                            console.log("data update Succesfully")
                            alert("data kkkkk")
                       })
                    })
                    .catch((error)=>{
                            console.log(error)
                    })
                
                });
       }



       let OrderMenu=()=>{
        let amnt=0;
           placeOrder1.style.display="none"
           place_order.style.display="none"
           img.style.display="none"    
           products1.style.display="none"
           divOrder.style.display="block"    
           divOrder2.style.display="block"

           document.getElementById("amnt").innerHTML=(`Amount : ${amnt}`)
          document.getElementById("bonus").innerHTML=Number(bonus.toFixed(2));                     
          document.getElementById("complOrder").innerHTML=(orderCount +"/20")

          document.getElementById("todayIncome").innerHTML=Number(todayEarn.toFixed(2));
          document.getElementById("yesterDayEarn").innerHTML=yesterDay;



       }
       let product1;
       let placeOrder=()=>{
                            if(orderCount < 20){
                                
                                divOrder.style.display="none"
                                divOrder2.style.display="none"
                                products1.style.display="none"
                                products.style.display="block"

                               let prodImg= document.getElementById("prodImg");
                               let prodDesc= document.getElementById("proDesc");
                               let imgPrice= document.getElementById("imgPrice");
                               let earnPrice= document.getElementById("earnPrice");


                                let api= `${host}/v1/app/getProduct`;
                                fetch(api)
                                            .then((responce)=>{
                                                if(responce.ok){
                                                       let j= responce.json();
                                                       j.then((data)=>{
                                                            product1=data.products;
                                                         
                                                            prodImg.setAttribute("src",product1.imgfileName);
                                                            prodDesc.innerHTML=product1.imgDescription;

                                                            imgPrice.innerHTML=product1.imgPrice;
                                                            earnPrice.innerHTML=product1.earnPrice;


                                                       })
                                                }
                                            })
                                
                            }
                            else{
                                alert("order is complate...")
                            }

       }

       let BackBtn=()=>{
        // updateBonusApi1(mobile);
        // location.replace("dashBord.html");
        home();

       }


      let subBtn=()=>{
        products.style.display="none"
        document.getElementById("load").style.display="block";

        setTimeout(()=>{          
            document.getElementById("load").style.display="none";  
            products1.style.display="block"
             let m =document.getElementById("complOrder1").innerHTML=(orderCount +"/20");
           
              document.getElementById("imgPrice1").innerHTML=(product1.imgPrice);
              document.getElementById("earnPrice1").innerHTML=product1.earnPrice;
 
              let percent=(product1.earnPrice/100)*10;
             let v= Number(percent.valueOf().toFixed(2));
             
             console.log(product1.earnPrice , " valueof  ", v , "  percent: "+ percent )
              document.getElementById("myEarn").innerHTML=v;
        },3000)

       }

 
       
        
      let confBtn=()=>{
          let myEarn=Number(document.getElementById("myEarn").innerText);
         
          Number(bonus.toFixed(2));
          bonus=bonus+myEarn;        
          todayEarn=todayEarn+myEarn;

        
          orderCount++;
          updateBonusApi1(mobile);
          OrderMenu();

      }


      
      let updateBonusApi1=(mobile)=>{

          let updateBonusApi=`${host}/v1/app/updateBonus/${mobile}/${Number(bonus.toFixed(2))}/${Number(todayEarn.toFixed(2))}/${orderCount}`
          console.log("funtion method : ", bonus);

        const request = new Request(updateBonusApi, {
            method: "put"
                })
            ;

                        fetch(request)
                                        .then((responce)=>{
                                                console.log(responce)
                                        })
                                        .catch((error)=>{
                                            console.log(error);
                                        })

      }


      let recharge=()=>{
        location.replace("recharge.html");
      }

      let withdrowal=()=>{
        location.replace("Withdrowal.html");
      }
