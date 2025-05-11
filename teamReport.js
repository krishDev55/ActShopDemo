
// let host="http://localhost:8081"
// const ACAO="http://127.0.0.1:5500";   


let host="https://test-fc0m.onrender.com"
  const ACAO="https://actshopmoney.netlify.app";

  let userAgent=!navigator.userAgent.includes("Windows");
// let userAgent=true;

const urlParams = new URLSearchParams(window.location.search);
const mobile = urlParams.get('mobile');


let token= window.localStorage.getItem("token");

let getCart=()=>{
       let cartId= document.getElementById("cartId");
    
     


       let getAllReferList=`${host}/v1/user/getCartRefer/${mobile}`;
    // let getAllReferList=`${host}/v1/user/getCartRefer/9765475504`;
                 let request= new Request(getAllReferList,{
                               method: "Get",
                               headers: {
                                'Accept' : 'application/json',
                                'Content-type': 'application/json; charset=UTF-8',
                                'Access-Control-Allow-Origin':ACAO
                               
                                     }  
                               }); 

                               fetch(request)
                               .then(response=>{
                                        let j =response.json();   
                                     async = j.then(data=>{
                                          document.getElementById("aMember").innerHTML=Array.from(data).length;
                                          document.getElementById("tMember").innerHTML=0;
                                          document.getElementById("yTear").innerHTML=Array.from(data).length*30;
                                        
                                          for (const element of data) {

                                            let newDiv= document.createElement("div");
                                            newDiv.setAttribute("class","myNewDiv");
                                            newDiv.setAttribute("id","newCart1");
                                           await = getUserByMobile(element)
                                                    .then(d=>{
                                                       
                                                        newDiv.innerHTML=`
                                                         <div class="cart-top-navigation">
                                                                    <li>
                                                                        <i class="fa-solid fa-arrow-left"></i>
                                                                    </li>
                                                                    <ul>
                                                                        <i id="heart" class="fa-regular fa-heart"></i>
                                                                        <i class="fa-solid fa-bars"></i>
                                                                    </ul>
                                                                </div>
                                                                <div class="user-image">
                                                                    <!-- Replace "/user.png" with the image of your which you want to show on your profile card-->
                                                                    <img src="/user.png" alt="">
                                                                </div>

                                                                <h2 class="user-name">${d.firstName}  ${d.lastName} </h2>
                                                                <p class="about-user"> ${d.email}</p>
                                                                <button class="hire-me">Hire Me</button>
                                                                  <h2 class="user-name"> All refer :  ${d.refer==null?0:Array.from(d.refer).length} </h2>

                                                                <div class="social-container">
                                                                    <div class="social-item">
                                                                        <li class="instagram">
                                                                            <i class="fa-brands fa-instagram"></i>
                                                                        </li>
                                                                        <span class="followers">${Number.parseInt(d.totayEarn)}</span>
                                                                        <span class="followers">Today</span>
                                                                    </div>
                                                                    <div class="social-item">
                                                                        <li class="youtube">
                                                                            <i class="fa-brands fa-youtube"></i>
                                                                        </li>
                                                                        <span class="subscribers">${Number.parseInt(d.yesterdayEarn)}</span>
                                                                        <span class="subscribers">Yester</span>
                                                                    </div>
                                                                    <div class="social-item">
                                                                        <li class="twitter">
                                                                            <i class="fa-brands fa-twitter"></i>
                                                                        </li>
                                                                        <span class="followers">${Number.parseInt(d.bonus)}</span>
                                                                        <span class="followers">Total</span>
                                                                    </div>
                                                                </div>
                                                        `
                                                        
                                                      })
                                                      cartId.appendChild(newDiv);    
                                          }
                                        }).catch(error=>{

                                        })
                               })


    }

          let getUserByMobile=(mobile)=>{
                let url= `${host}/v1/user/getCombineData/${mobile}`;

                const request = new Request(url, {
                method: "Get",  
                headers: {
                  'Accept' : 'application/json',
                  'Content-type': 'application/json; charset=UTF-8',
                  'Access-Control-Allow-Origin':ACAO,
                  Authorization : `Bearer ${token}`,
                  "alg": "HS256",
                  "typ": "JWT"
                      }  
                }); 

              return fetch(request)
                .then(response => {
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
              })
              .catch(error => {
                  console.error("Error fetching data:", error);
              });
              }


              let logOut=()=>{

                let logOutApi=`${host}/v1/app/logOut/${mobile}`;
                const request = new Request(logOutApi, {
                    method: "GET",
                    
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
                                        let j= responce.json();
                                        j.then((data)=>{
                                            localStorage.removeItem("mobile");
                                            location.replace("index.html");
                                        })
                                        .catch((error)=>{
                                            console.error(error);
                                        })
                                    })
                        }

getCart();