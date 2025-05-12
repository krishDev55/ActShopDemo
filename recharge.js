
let host=AppConfig.host;
let ACAO=AppConfig.ACAO;


var mobile =window.localStorage.getItem("mobile");
var password=window.localStorage.getItem("password");
var bonus=Number(Number(window.localStorage.getItem("bonus")).toFixed(2));
var todayEarn=Number(Number(window.localStorage.getItem("todayEarn")).toFixed(2));
var yesterDay=Number(window.localStorage.getItem("yesterDay"));
var orderCount=Number(window.localStorage.getItem("orderCount"));


let token= window.localStorage.getItem("token");

let email=null;
let firstLastName=null;

let payBtn=()=>{

// let amount=document.getElementById("amount").value;
let amount =$("#amount_text").val();

console.log("amount is1 : "+amount)
        if(amount==""|| amount==null){
               
                swal("Oops", "Amount is Required  !!!! ", "error")

                return;
        }

        // we use ajax to sent request to server  create Order 

        let url=`${host}/v1/app/create_order`;
        const request = new Request(url, {
            method: "Post",
            
            body: JSON.stringify(
              { 
                "amount": amount   
              }
            ),
            headers: {
              'Accept' : 'application/json',
              'Content-type': 'application/json; charset=UTF-8',
               Authorization : `Bearer ${token}`,
               'Access-Control-Allow-Origin':ACAO,
              "alg": "HS256",
              "typ": "JWT"
                  }  
            }); 

                fetch(request)
                        .then((response)=>{
                            let j=response.json();
                            j.then((data)=>{
                                console.log(data)
                                if(data.status=='created'){

                                    var options = {
                                        "key": "rzp_test_HKhIE2kfoLbD8L", // Enter the Key ID generated from the Dashboard
                                        "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                                        "currency": "INR",
                                        "name": "Smart Contact Manager",
                                        "description": "Donation",
                                        "image": "https://example.com/your_logo",
                                        "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                                       
                                        "handler": function (data){
                                            console.log("Actully Trans Id : "+data.razorpay_payment_id);
                                            console.log(data.razorpay_order_id);
                                            console.log(data.razorpay_signature)
                                            console.log("payment successful");

                                            bonus=bonus+Number.parseInt(amount);
                                            console.log(bonus+"===="+amount)
                                            window.localStorage.setItem("bonus",bonus);
                                            updateBonusApi1(mobile);

                                           let wa= swal("Good job!", "Peyment successful..!", "success")
                                                console.log("okk buton :"+wa)
                                           
                                           setTimeout(()=>{
                                                //  location.replace("dashBord.html");

                                            },8000)

                                            },

                                            "prefill": {
                                                "name": firstLastName,
                                                "email": email,
                                                "contact": mobile,
                                            },
                                            "notes": {
                                                "address": "ActShop.com"
                                            },
                                            "theme": {
                                                    "color": "#3399cc"
                                                }
                                };
                                var rzp = new Razorpay(options);
                                rzp.on('payment.failed', function (data){
                                    console.log(data.error.description);
                                    console.log(data.error.code);
                                    console.log(data.error.source);
                                    console.log(data.error.step);
                                    console.log(data.error.reason);
                                    console.log(data.error.metadata.order_id);
                                    console.log(data.error.metadata.payment_id);
                                   
                                    swal("Oops", "Oops payment field....", "error")
                                    

                            });
                            rzp.open();
                            }  
                         })
                })
                    .catch((error)=>{
                        console.log("Error massage is : "+error)
                    })


}


let amtBtn=(amt=Number.parseInt(amt))=>{
            document.getElementById("amount_text").setAttribute("value", amt);
         }


let updateBonusApi1=(mobile)=>{

                    let updateBonusApi=`${host}/v1/app/updateBonus/${mobile}/${Number(bonus.toFixed(2))}/${Number(todayEarn.toFixed(2))}/${orderCount}`
                    console.log("funtion method : ", bonus);
          
                  const request = new Request(updateBonusApi, {
                      method: "put",
                      headers: {
                        'Accept' : 'application/json',
                        'Content-type': 'application/json; charset=UTF-8',
                         Authorization : `Bearer ${token}`,
                         'Access-Control-Allow-Origin':ACAO,
                        "alg": "HS256",
                        "typ": "JWT"
                            }  
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

        let BackBtn=()=>{
            
            location.replace("dashBord.html")
            }            

    let getUserByMobile=(mobile)=>{

        let getUserFindByMobile=`${host}/v1/user/getUserByMobile/${mobile}`;
        // console.log("funtion method : ", bonus);

      const request = new Request(getUserFindByMobile, {
          method: "Get",
          headers: {
            'Accept' : 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
             Authorization : `Bearer ${token}`,
             'Access-Control-Allow-Origin':ACAO,
            "alg": "HS256",
            "typ": "JWT"
                }  
              });
          

                      fetch(request)
                                      .then((responce)=>{
                                       let j= responce.json()
                                        j.then(data=>{
                                           firstLastName=data.firstName +" "+data.lastName;
                                           email=data.email;
                                          })
                                      })
                                      .catch((error)=>{
                                          console.log(error);
                                      })

                            
    }        

    getUserByMobile(mobile);