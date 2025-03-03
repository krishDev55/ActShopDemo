
document.getElementById("productSection").style.display="block";
document.getElementById("login").style.display="none";
document.getElementById("register").style.display="none";

let hostUrl=`http://localhost:8084/v1`

   let loadImg=()=>{
    
    let load_img_url=`${hostUrl}/getAllProducts`;

        const responce= new Request(load_img_url,{
            method:"get",
            headers:{
                'Accept' : 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                Authorization : ``,
                "alg": "HS256",
                "typ": "JWT"
            }
        });

            let count=1;

                fetch(responce) 
                            .then((responce)=>{
                               let  j= responce.json();
                                j.then((data)=>{
                                  
                            
                                    for (const element of data.productList) {
                                      
                                        console.log("inner all data : "+element.prodName)
                                        // element.pId;
                                        // element.pDesc;
                                        // element.pRate;
    
                                        
                                    let mainDiv1=document.querySelector("main-box-div");
                                    let mainDiv= document.getElementById("main-box-div");

                                        let box= document.createElement("div");
                                       
                                            box.setAttribute("class","col-md-4");
                                            box.setAttribute("id","box1");

                                                    let imgBox=  document.createElement("div");
                                                                    imgBox.setAttribute("id","img-Box")
                                                                    imgBox.setAttribute("class","text-center")
                                                            
                                                                    let img=  document.createElement("img");  
                                                                    img.setAttribute("id","prod-img") ;
                                                                    img.setAttribute("src",element.image) ;
                                                                    imgBox.appendChild(img);
                                                    box.appendChild(imgBox);  

                                                    let prodName=  document.createElement("div");
                                                                    prodName.setAttribute("id","img-prod-Name")
                                                                    prodName.setAttribute("class","text-center")
                                                            
                                                                    let head=  document.createElement("h4");  
                                                                    let b1=  document.createElement("b");  
                                                                    b1.setAttribute("id","prod-descprod-descprod-desc") ;
                                                                    b1.innerHTML=element.name;
                                                                    head.appendChild(b1);
                                                                    prodName.appendChild(head);
                                                    box.appendChild(prodName);

                                                    let prodDsc=  document.createElement("div");
                                                                let prod_desc=  document.createElement("p"); 
                                                                prod_desc.setAttribute("id","prod-desc");
                                                                prod_desc.innerHTML=element.details;
                                                             prodDsc.appendChild(prod_desc);
                                                             let prod_rate_head3=document.createElement("h3");
                                                             prod_rate_head3.innerHTML="RS "
                                                                let prod_rate_b=document.createElement("b");
                                                                prod_rate_b.setAttribute("id","prod-rate")
                                                                prod_rate_b.innerHTML=element.price;
                                                                prod_rate_head3.appendChild(prod_rate_b);
                                                                
                                                                // prodDsc.insertBefore(prod_rate_head3,prodDsc.lastChild);
                                                                prodDsc.appendChild(prod_rate_head3);
                                                        box.appendChild(prodDsc) ;
                                                        
                                                        let btn_Cart_buy_main=document.createElement("div");
                                                                            btn_Cart_buy_main.setAttribute("id","btn-Cart-buy");
                                                                            btn_Cart_buy_main.setAttribute("class","text-center");
                                                                          let btn_info= document.createElement("button") ;
                                                                          btn_info.setAttribute("class","btn-info");
                                                                          btn_info.setAttribute("type","button");
                                                                          btn_info.setAttribute("onclick",`addCart(${element.id})`)
                                                                          btn_info.innerHTML="Add to Cart";
                                                                          btn_Cart_buy_main.appendChild(btn_info);

                                                                          let btn_primary= document.createElement("button") ;
                                                                          btn_primary.setAttribute("class","btn-primary");
                                                                          btn_primary.setAttribute("type","button");
                                                                          btn_primary.setAttribute("onclick",`buyNow(${element.id})`)
                                                                          btn_primary.innerHTML="Buy Now";
                                                                          btn_Cart_buy_main.appendChild(btn_primary);
                                                                   box.appendChild(btn_Cart_buy_main);   
                                                    
                                                                   if(count <=9){
                                                                       mainDiv.insertBefore(box,mainDiv.lastChild);
                                                                            count++;
                                                                   }
                                                                }
                                     
                                       

                                })

                            })
                            .catch((error)=>{
                                console.log("Error the Fatch record...")
                            })


}


let login=()=>{
    
        document.getElementById("login").style.display="block";
        document.getElementById("productSection").style.display="none";
        document.getElementById("register").style.display="none";
    }
    
    let register=()=>{
        document.getElementById("productSection").style.display="none";

    document.getElementById("register").style.display="block";
    document.getElementById("login").style.display="none";
    
}

let loginBtn =()=>{
         let username= document.getElementById("username").value;
         let password= document.getElementById("password").value;
        let loginUrl=`${hostUrl}/login`;
       
        const request =new Request(loginUrl,{
        method:"POST",
        body: JSON.stringify(
            { 
                "email":username ,
                "password": password
            }
          ),
        headers:{
            'Accept' : 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
            Authorization : ``,
            "alg": "HS256",
            "typ": "JWT"
        }
        })

        fetch(request)
                        .then((responce)=>{
                           let j= responce.json();
                           console.log("responce : "+j.entity)
                                    j.then((data)=>{
                                        if(data.roll=="vendor"){
                                            sessionStorage.setItem(data.entity.vender_id,data.token)
                                            sessionStorage.setItem("vendorId",data.entity.vender_id)
                                            location.href="vendor.html";
                                        }
                                        else{
                                            sessionStorage.setItem(data.entity.id,data.token)
                                            sessionStorage.setItem("empId",data.entity.id)
                                            location.href="dashBord.html";
                                        }
                                    })
                                    .catch((error)=>{
                                   
                                        alert("invalid Username And Password....")
                                    })
                        })

                        .catch((error)=>{
                                console.log("invalid Username And Password....")
                        })
}

let addCart=(id)=>{
    console.log("function checking..."+ id )

}     
let buyNow=(id)=>{
            console.log("function checking..." +id)
        }     
        

        let app=()=>{
            console.log("function checking..." )
        }
        
      
        loadImg();
        