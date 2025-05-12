
  let host=AppConfig.host;
let ACAO=AppConfig.ACAO;

  // let userAgent=!navigator.userAgent.includes("Windows");
// let userAgent=true;

const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
let token= window.localStorage.getItem("token");
let mobile= localStorage.getItem("mobile");

getBankTranctionByEmail=()=>{
        let bankTranctionApi=`${host}/v1/rozorPay/getPaymentsByEmail/${email}`
        const request = new Request(bankTranctionApi, {
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
            let table=document.getElementById("mTbl");
             fetch(request)
                    .then(response=>{
                           let j= response.json();
                           j.then(data=>{
                           let data1=  Array.from(data);
                               for (const element of data1) {
                                   let m= element;
                                 
                                   // Convert seconds to milliseconds
                                    const date = new Date(m.created_at * 1000);
                                    // Format the date (optional)
                                    // const formattedDate = // Local date and time
                                let tr=document.createElement("tr");

                                tr.innerHTML=`
                                <td>${m.id}</td>
                                <td>${m.amount/100}</td>
                                <td>${ date.toLocaleString()}</td>
                                `
                                table.appendChild(tr);
                             }

                           })
                         })
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
                                location.replace(`${ACAO}/index.html`);
                            })
                            .catch((error)=>{
                                console.error(error);
                            })
                        })
            }
getBankTranctionByEmail();

