
let hostUrl=`http://localhost:8084/v1`


 let  openForm = (row, cartId)=> {


    document.getElementById("myForm").style.display = "block";
    document.getElementById("row").innerHTML=row;
    document.getElementById("cartId").innerHTML=cartId;

                    let empId=sessionStorage.getItem("empId")
                    let token=sessionStorage.getItem(empId);
                    let url=`${hostUrl}/v1/getAddressTempByEmpId/${empId}`;
                    const requst= new Request(url,{
                    method:"Get",

                    headers:{
                    'Accept' : 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                    Authorization : `Bearer ${token}`,
                    "alg": "HS256",
                    "typ": "JWT"
                    }
                    });
                    
                    fetch(requst)
                            .then((responce)=>{
                                let j=  responce.json();
                                j.then((data)=>{
                                    for (const element of data) {
                                        let selectList= document.getElementById("selectionList");
                                        let opt_main=  document.createElement("option");
                                        opt_main.setAttribute("id",element);
                                        opt_main.setAttribute("value",element.addId);
                                        opt_main.textContent=element.temp
                                  selectList.appendChild(opt_main);
                      
                                    }
                                })
                        })
                        .catch((error)=>{
            
                        })        
  }
  
  $(document).ready(function(){
   
    console.log("div click text")
         
    $('#text123').click(function(){
            console.log("div click text")
            alert('Div clicked!');
         });
    


  });




  let closeForm=()=> {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("myForm1").style.display = "none";
   
   
  }



  let src_product=()=>{

  
   let elements= document.getElementsByClassName("box1");
  console.log(elements.length)
        for (let i = elements.length-1; i >=0; i--) {
           elements[i].remove();
            
        }

    let empId=sessionStorage.getItem("empId");
    let token=sessionStorage.getItem(empId);

               let search= document.getElementById("inputText").value;

               let load_img_url=`${hostUrl}/v1/searchProduct/${search}`;


               document.getElementById("inputText").value.remove;    

               const responce= new Request(load_img_url,{
                   method:"get",
                   headers:{
                    'Accept' : 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                    Authorization : `Bearer ${token}`,
                    "alg": "HS256",
                    "typ": "JWT"
                }
               });

               let count=1; 

               fetch(responce) 
               .then((responce)=>{
                  let  j= responce.json();
                   j.then((data)=>{                
                                      
                    for (const element of data) {
                           
                        // document.getElementById("main-box-div").style.display="block";     

                        let mainDiv1=document.getElementById("container_fluid");

                    

                        let mainDiv= document.getElementById("main-box-div");

                            let box= document.createElement("div");
                           
                                box.setAttribute("class","col-md-4 box1");
                              
                                box.setAttribute("id","box1");

                                        let imgBox=  document.createElement("div");
                                                        imgBox.setAttribute("id","img-Box")
                                                        imgBox.setAttribute("class","text-center")
                                                
                                                        let img=  document.createElement("img");  
                                                        img.setAttribute("id","prod-img") ;
                                                        img.setAttribute("src",element.prodImage) ;
                                                        imgBox.appendChild(img);
                                        box.appendChild(imgBox);  

                                        let prodName=  document.createElement("div");
                                                        prodName.setAttribute("id","img-prod-Name")
                                                        prodName.setAttribute("class","text-center")
                                                
                                                        let head=  document.createElement("h4");  
                                                        let b1=  document.createElement("b");  
                                                        b1.setAttribute("id","prod-descprod-descprod-desc") ;
                                                        b1.innerHTML=element.prodName;
                                                        head.appendChild(b1);
                                                        prodName.appendChild(head);
                                        box.appendChild(prodName);

                                        let prodDsc=  document.createElement("div");
                                                    let prod_desc=  document.createElement("p"); 
                                                    prod_desc.setAttribute("id","prod-desc");
                                                    prod_desc.innerHTML=element.prodInfo;
                                                 prodDsc.appendChild(prod_desc);
                                                 let prod_rate_head3=document.createElement("h3");
                                                 prod_rate_head3.innerHTML="RS "
                                                    let prod_rate_b=document.createElement("b");
                                                    prod_rate_b.setAttribute("id","prod-rate")
                                                    prod_rate_b.innerHTML=element.prodPrice;
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
                                                              btn_info.setAttribute("onclick",`addCart(${element.prodId})`)
                                                              btn_info.innerHTML="Add to Cart";
                                                              btn_Cart_buy_main.appendChild(btn_info);

                                                              let btn_primary= document.createElement("button") ;
                                                              btn_primary.setAttribute("class","btn-primary");
                                                              btn_primary.setAttribute("type","button");
                                                              btn_primary.setAttribute("onclick",`buyNow(${element.prodId})`)
                                                              btn_primary.innerHTML="Buy Now";
                                                              btn_Cart_buy_main.appendChild(btn_primary);
                                                       box.appendChild(btn_Cart_buy_main);   
                                        
                                                       if(count <=9){
                                                           mainDiv.insertBefore(box,mainDiv.lastChild);
                                                                count++;
                                                       }

                                                    }
                                                         

                   });
                })
                    .catch((error)=>{

                });

                
  }


let logOut =()=>{
    console.log("log Out is Function")

    let logOut_Url= " ";
    location.href="index.html";
}




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
                                     const product={
                                        id: element.id,
                                        name: element.name,
                                        price: element.price,
                                        details: element.details,
                                        image: element.image,
                                        stock: element.stock,
                                        categary: element.categary,
                                        vendor: element.vendor,
                                        ratings: []
                                     };
                                        
                                    let mainDiv1=document.querySelector("main-box-div");
                                    let mainDiv= document.getElementById("main-box-div");

                                        let box= document.createElement("div");
                                       
                                            box.setAttribute("class",`action-btn col-md-4 box1`);
                                            // box.setAttribute("class","box1");
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
                                                                        //   let btn_info= document.createElement("button") ;
                                                                        //   btn_info.setAttribute("class","btn-info");
                                                                        //   btn_info.setAttribute("type","button");
                                                                        //   btn_info.setAttribute("onclick",`addCart(${element.id})`)
                                                                        //   btn_info.innerHTML="Add to Cart";
                                                                        //   btn_Cart_buy_main.appendChild(btn_info);

                                                                          let btn_primary= document.createElement("button") ;
                                                                          btn_primary.setAttribute("class","getImFo");
                                                                          btn_primary.setAttribute("id","getImFo");
                                                                          btn_primary.setAttribute("type","button");
                                                                          btn_primary.setAttribute("onclick",`getImFo(${element.id})`)
                                                                          btn_primary.innerHTML="Imfo";
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

let getImFo=(id)=>{
     console.log("id is : "+id)
     $("#main-box-div").hide();     
     $("#sample12").show();
     location.href="products1/singleProduct.html";
}



        let cart =()=>{

                        document.getElementById("cart_itoms_main").style.display="block";
                        document.getElementById("productSection").style.display="none";
                        document.getElementById("order_itoms_main").style.display="none";
                        document.getElementById("prof_main").style.display="none";

                    let cartHeader= document.getElementById("cart-itom-head");

                            let userId=sessionStorage.getItem("empId")
                            let token=sessionStorage.getItem(userId);
                           let UserId1= Number.parseInt(userId);
                           console.log(userId+"  ------  "+ UserId1+"  -- ")
                    let getCartByEmpId=`${hostUrl}/user/getCardByUserId/${UserId1}`;
                    const requst= new Request(getCartByEmpId,{
                        method:"Get",
                    
                        headers:{
                            'Accept' : 'application/json',
                            'Content-type': 'application/json; charset=UTF-8',
                            'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                            Authorization : `Bearer ${token}`,
                            "alg": "HS256",
                            "typ": "JWT"
                        }
                    });
                    let row=1;
                        fetch(requst)
                                    .then((responce)=>{
                                        let j=  responce.json();
                                        j.then((data)=>{
                                            console.log("tedxt "+data.prod_name)
                                            for (const element of data) {
                                                console.log("tedxt "+element)
                                            

                                let cart_itom_list_center=document.createElement("div");
                                cart_itom_list_center.setAttribute("id",`cart_itom_list_row${row}`)
                                cart_itom_list_center.setAttribute("class","container text-center col-md-12 cart_itom_list")

                                        let cart_Img=document.createElement("div");
                                            cart_Img.setAttribute("class","text-center col-md-3");
                                            let cart_img_head_4=document.createElement("img");
                                                    cart_img_head_4.setAttribute("id","cart_img_head_4");
                                                    cart_img_head_4.setAttribute("class","text-center");
                                                    cart_img_head_4.setAttribute("src",`${element.prod_image}`) ;  
                                                cart_Img.appendChild(cart_img_head_4); 
                                        cart_itom_list_center.appendChild(cart_Img);      

                                        let cart_productName=document.createElement("div");
                                            cart_productName.setAttribute("class","text-center col-md-2")
                                                let cart_product_name=document.createElement("h4") 
                                                        cart_product_name.setAttribute("id","cart_product_name");
                                                        cart_product_name.setAttribute("class","text-center")
                                                        cart_product_name.innerHTML=`${element.prod_name}`
                                                cart_productName.appendChild(cart_product_name);
                                        cart_itom_list_center.appendChild(cart_productName); 
                                        

                                        let cart_productPrice=document.createElement("div");
                                        cart_productPrice.setAttribute("class","text-center col-md-2")
                                                let cart_product_price=document.createElement("h4") 
                                                        cart_product_price.setAttribute("id",`cart_product_price${row}`);
                                                        cart_product_price.setAttribute("class","text-center")
                                                        let pr_Price=`${element.prod_price}`;
                                                        cart_product_price.innerHTML= pr_Price;
                                                cart_productPrice.appendChild(cart_product_price);
                                        cart_itom_list_center.appendChild(cart_productPrice);  
                                        
                                        
                                        let cart_productQunt=document.createElement("div");
                                            cart_productQunt.setAttribute("class","text-center col-md-1")
                                                let cart_product_qunt=document.createElement("h4") 
                                                        cart_product_qunt.setAttribute("id",`cart_product_qunt${row}`);
                                                        cart_product_qunt.setAttribute("class","text-center")
                                                        let pr_Qunt=`${element.prod_quantity}`;
                                                        cart_product_qunt.innerHTML= pr_Qunt;
                                                cart_productQunt.appendChild(cart_product_qunt);
                                        cart_itom_list_center.appendChild(cart_productQunt);  


                                        let cart_productadd=document.createElement("div");
                                            cart_productadd.setAttribute("class","text-center col-md-1")
                                                let cart_product_add=document.createElement("button") 
                                                        cart_product_add.setAttribute("id","cart_product_add");
                                                        cart_product_add.setAttribute("class","text-center btn btn-primary")
                                                        cart_product_add.setAttribute("type","button");
                                                        cart_product_add.setAttribute("onclick",`incQuent(${row})`);
                                                        cart_product_add.innerHTML="Add" 
                                                cart_productadd.appendChild(cart_product_add);
                                        cart_itom_list_center.appendChild(cart_productadd);  

                                        let cart_productremo=document.createElement("div");
                                            cart_productremo.setAttribute("class","text-center col-md-1")
                                                let cart_product_remo=document.createElement("button") 
                                                        cart_product_remo.setAttribute("id","cart_product_remo");
                                                        cart_product_remo.setAttribute("class","text-center btn btn-default")
                                                        cart_product_remo.setAttribute("type","button");
                                                        cart_product_remo.setAttribute("onclick",`decQuent(${row},${element.cart_id})`)
                                                        cart_product_remo.innerHTML="remove" 
                                                cart_productremo.appendChild(cart_product_remo);
                                        cart_itom_list_center.appendChild(cart_productremo);  


                                        let cart_productToPrice=document.createElement("div");
                                        cart_productToPrice.setAttribute("class","text-right col-md-2")
                                                let cart_product_tPrice=document.createElement("h4") 
                                                        cart_product_tPrice.setAttribute("id",`cart_product_tPrice${row}`);
                                                        cart_product_tPrice.setAttribute("class","text-center col-md-8")
                                                        cart_product_tPrice.innerHTML=pr_Price * pr_Qunt

                                                let buyButon=document.createElement("button") ;     
                                                        buyButon.setAttribute("id",`buyButton${row}`);
                                                        buyButon.setAttribute("class","btn btn-primary col-md-4 buyBtnCls" )
                                                        buyButon.setAttribute("type","button");
                                                        buyButon.setAttribute("onclick",`openForm(${row},${element.cart_id})`);
                                                        buyButon.innerHTML="BUY";

                                                cart_productToPrice.appendChild(cart_product_tPrice);
                                                cart_productToPrice.appendChild(buyButon)
                                        cart_itom_list_center.appendChild(cart_productToPrice);  

                            cartHeader.insertBefore(cart_itom_list_center,cartHeader.lastChild);   
                            row++;
                        }
                    })
            })
            .catch((error)=>{

            })

        }





        product=()=>{

        

            let elements= document.getElementsByClassName("box1");
            console.log(elements.length)
                  for (let i = elements.length-1; i >=0; i--) {
                     elements[i].remove();
                      
                  }

                        document.getElementById("productSection").style.display="block";
                        document.getElementById("cart_itoms_main").style.display="none";
                        document.getElementById("order_itoms_main").style.display="none";
                        document.getElementById("prof_main").style.display="none";

            loadImg();

        }




        orders=()=>{
            document.getElementById("cart_itoms_main").style.display="none";
            document.getElementById("productSection").style.display="none";
            document.getElementById("order_itoms_main").style.display="block";
            document.getElementById("prof_main").style.display="none";

                        let orderHeader= document.getElementById("order-itom-head");    
                        let empId=sessionStorage.getItem("empId")
                        let token=sessionStorage.getItem(empId);

                            let url=`${hostUrl}/user/getOrderByUserId/${empId}`;

                        const requst= new Request(url,{
                            method:"GET",
                            
                            headers:{
                                'Accept' : 'application/json',
                                'Content-type': 'application/json; charset=UTF-8',
                                'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                                Authorization : `Bearer ${token}`,
                                "alg": "HS256",
                                "typ": "JWT"
                            }
                        });
                                let row=1;
                            fetch(requst)
                                        .then((responce)=>{
                                            console.log("-------"+responce.status)
                                            let j=responce.json();
                                            console.log("************ "+j);
                                           
                                            j.then((data)=>{

                                                console.log("-------"+data.productName)
                                                for (const element of data) {
                                                    
                                
                                                

                                let order_itom_list_center=document.createElement("div");
                                order_itom_list_center.setAttribute("class",`container text-center col-md-12 orderRow`)
                                order_itom_list_center.setAttribute("id",`order_itom_list_head1${row}`)

                                        let order_Img=document.createElement("div");
                                            order_Img.setAttribute("class","text-center col-md-3");
                                            let order_img_head_4=document.createElement("img");
                                                    order_img_head_4.setAttribute("id","order_img_head_4");
                                                    order_img_head_4.setAttribute("class","text-center");
                                                    order_img_head_4.setAttribute("src",`${element.productImg}`) ;  
                                            order_Img.appendChild(order_img_head_4); 
                                        order_itom_list_center.appendChild(order_Img);      

                                        let order_productName=document.createElement("div");
                                            order_productName.setAttribute("class","text-center col-md-2")
                                                let order_product_name=document.createElement("h4") 
                                                        order_product_name.setAttribute("id","order_product_name");
                                                        order_product_name.setAttribute("class","text-center")
                                                        order_product_name.innerHTML=`${element.productName}` 
                                                order_productName.appendChild(order_product_name);
                                        order_itom_list_center.appendChild(order_productName); 
                                        

                                        let order_id=document.createElement("div");
                                        order_id.setAttribute("class","text-center col-md-2")
                                            let order_proId=document.createElement("h4") 
                                                    order_proId.setAttribute("id","orderId");
                                                    order_proId.setAttribute("class","text-center")
                                                    order_proId.innerHTML=`${element.orderId}`;
                                            order_id.appendChild(order_proId);
                                    order_itom_list_center.appendChild(order_id); 


                                        let order_prod_qunt=document.createElement("div");
                                            order_prod_qunt.setAttribute("class","text-center col-md-1")
                                                let order_product_qunt=document.createElement("h4") 
                                                        order_product_qunt.setAttribute("id","order_product_qunt");
                                                        order_product_qunt.setAttribute("class","text-center")
                                                        order_product_qunt.innerHTML=`${element.quentity}` 
                                                order_prod_qunt.appendChild(order_product_qunt);
                                        order_itom_list_center.appendChild(order_prod_qunt);  


                                        
                                        
                                        let order_productPrice=document.createElement("div");
                                        order_productPrice.setAttribute("class","text-center col-md-1")
                                            let order_product_price=document.createElement("h4") 
                                                    order_product_price.setAttribute("id","order_product_price");
                                                    order_product_price.setAttribute("class","text-center")
                                                    order_product_price.innerHTML=`${element.price}`;
                                                order_productPrice.appendChild(order_product_price);
                                        order_itom_list_center.appendChild(order_productPrice);  

                                        let order_prod_time=document.createElement("div");
                                        order_prod_time.setAttribute("class","text-center col-md-1")
                                                let order_time=document.createElement("h4") 
                                                            order_time.setAttribute("id","order_time");
                                                            order_time.setAttribute("class","text-center")
                                                            order_time.innerHTML=`${element.time}`; 
                                                order_prod_time.appendChild(order_time);
                                        order_itom_list_center.appendChild(order_prod_time);  


                                        let order_status=document.createElement("div");
                                        order_status.setAttribute("class","text-center col-md-2")
                                                let orderStatus=document.createElement("h4") 
                                                        orderStatus.setAttribute("id","orderStatus");
                                                        orderStatus.setAttribute("class","col-md-6 text-right")
                                                        orderStatus.innerHTML=`${element.status}`;

                                                        let order_cancelbtn=document.createElement("button") 
                                                        order_cancelbtn.setAttribute("id","order_cancelbtn");
                                                        order_cancelbtn.setAttribute("class","col-md-5 text-center btn btn-primary")
                                                        order_cancelbtn.setAttribute("type","button");
                                                        order_cancelbtn.setAttribute("onclick",`ord_cancleBtn("${element.orderId}",${row})`);
                                                        order_cancelbtn.innerHTML="cancel"
                                                order_status.appendChild(orderStatus);
                                                order_status.appendChild(order_cancelbtn);

                                        order_itom_list_center.appendChild(order_status);  

                                //  orderHeader.insertBefore(order_itom_list_center,orderHeader.lastChild); 
                                orderHeader.appendChild(order_itom_list_center); 
                            row++;
                            }
                                            
                        })
                    })
                    .catch((error)=>{

                    })



        }




        let addCart =(id)=>{
                    let empId=sessionStorage.getItem("empId");
                    let token=sessionStorage.getItem(empId);
                    let produUrl=`${hostUrl}/getProductById/${id}`

                    const requst= new Request(produUrl,{
                        method:"get",
                        headers:{
                            'Accept' : 'application/json',
                            'Content-type': 'application/json; charset=UTF-8',
                            'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                            Authorization : `Bearer ${token}`,
                            "alg": "HS256",
                            "typ": "JWT"
                        }
                    });
                        fetch(requst)
                                    .then((responce)=>{
                                       
                                        let j=  responce.json();
                                        console.log(" - text1- "+responce.id)
                                        console.log(empId+" json is  "+j.then(data=>{
                                            data.product
                                        }))
                                       
                                        j.then((data)=>{
                                            console.log("text1 "+data.product)
                                            console.log("text "+data.name)
                                            
                                            saveCartDetails(data.image,
                                                data.name,
                                                data.price,
                                                data.id 
                                            );
                                        })
                                    })
                                    .catch((error)=>{

                                    })

        }





        saveCartDetails=(prodImage,prodName,prodPrice,prodId)=>{
                    let empId=sessionStorage.getItem("empId");
                    let token=sessionStorage.getItem(empId);
                
                        let saveCart=`${hostUrl}/user/saveCart`;
                        const requst= new Request(saveCart,{
                            method:"Post",
                            body: JSON.stringify(
                                { 
                                "prod_name":prodName ,
                                "prod_image": prodImage,
                                "prod_price":prodPrice,
                                "prod_quantity":1,
                                "prod_id":Number.parseInt(prodId),
                                "user_id":empId
                                }
                            ),
                            headers:{
                                'Accept' : 'application/json',
                                'Content-type': 'application/json; charset=UTF-8',
                                'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                                Authorization : `Bearer ${token}`,
                                "alg": "HS256",
                                "typ": "JWT"
                            }
                        });

                        fetch(requst)
                                    .then((responce)=>{
                                        let j=responce.json();
                                            j.then((data)=>{
                                                console.log("text4 "+data.id)
                                                console.log("text5 "+data.name)
                                                alert("Item Added Successfully To Cart");
                                            })
                                    })
                                    .catch((error)=>{

                                    })
        }




        let incQuent=(row)=>{

                let price= document.getElementById(`cart_product_price${row}`).innerText;
                let price1 =Number.parseInt(price);

                    let qunt= document.getElementById(`cart_product_qunt${row}`);
                    let num =Number.parseInt(qunt.innerText);
                
                let tPrice= document.getElementById(`cart_product_tPrice${row}`);
                //    let t_price =Number.parseInt(tPrice.innerText);

                qunt.innerHTML=num+1;
                tPrice.innerHTML=(num+1)*price1;



        }



        let decQuent=(row,cartId)=>{
            let price= document.getElementById(`cart_product_price${row}`).innerText;
            let price1 =Number.parseInt(price);

                let qunt= document.getElementById(`cart_product_qunt${row}`);
                let num =Number.parseInt(qunt.innerText);
            let tPrice= document.getElementById(`cart_product_tPrice${row}`);
            let t_price =Number.parseInt(tPrice.innerText);
            
            qunt.innerHTML=num-1;
            tPrice.innerHTML=t_price-price1;

            if(num <=1){
                deleteCartByCartId(cartId,row);
                //    document.getElementById(`cart_itom_list_row${row}`).style.display="none";

            }


        }



        let deleteCartByCartId=(cartId,row)=>{
                    let  delete_cart_Url=`${hostUrl}/user/deleteCartById/${cartId}` ;
                    
                    let empId=sessionStorage.getItem("empId");
                    let token=sessionStorage.getItem(empId);

                    const requst= new Request(delete_cart_Url,{
                        method:"Delete",
                        
                        headers:{
                            'Accept' : 'application/json',
                            'Content-type': 'application/json; charset=UTF-8',
                            'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                            Authorization : `Bearer ${token}`,
                            "alg": "HS256",
                            "typ": "JWT"
                        }
                    });
                        fetch(requst)
                                    .then((responce)=>{
                                        let j= responce.text();
                                                j.then((data)=>{
                                                    if(data=="Cart Delete"){
                                                        document.getElementById(`cart_itom_list_row${row}`).style.display="none";
                                                    }
                                                })
                                    })
                                    .catch((error)=>{
                                        
                                    })
        }
       
        
        
        let buyBtn=(row, cartId)=>{

            // openForm();

            let empId=sessionStorage.getItem("empId")
            let token=sessionStorage.getItem(empId);
            console.log("cartId : "+cartId);
            let url=`${hostUrl}/user/getCardByCartId/${cartId}`; 
            const requst= new Request(url,{
                method:"Get",
            
                headers:{
                    'Accept' : 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                    Authorization : `Bearer ${token}`,
                    "alg": "HS256",
                    "typ": "JWT"
                }
            });
        
                fetch(requst)
                            .then((responce)=>{
                            let j= responce.json();
                            j.then((data)=>{
                                    console.log("cartId: "+data.cart_id);
                                genrateOrder(data.prod_image,data.prod_name,data.prod_price,data.cart_id, data.prod_id,row);
                                
                                
                            })  
                            })
                                .catch((error)=>{

                                })
            

        }





        let genrateOrder=(img,name,price,cartId,prodId,row)=>{

            let qunty=document.getElementById(`cart_product_qunt${row}`).innerText;
            let tPrice=document.getElementById(`cart_product_tPrice${row}`).innerText;
        
            console.log("ProductId Is :"+prodId)

            let empId=sessionStorage.getItem("empId")
            let token=sessionStorage.getItem(empId);
            let url=`${hostUrl}/user/saveOrder`; 
            const requst= new Request(url,{
                method:"Post",
                body: JSON.stringify(
                    { 
                    "productImg":img ,
                    "productName": name,
                    "orderId":" ",
                    "quentity": Number.parseInt(qunty),
                    "price" :Number.parseInt(tPrice),
                    "time":"",
                    "status":"",
                    "prodId":Number.parseInt(prodId),
                    "userId": empId

                    }
                ),
                headers:{
                    'Accept' : 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                    Authorization : `Bearer ${token}`,
                    "alg": "HS256",
                    "typ": "JWT"
                }
            });

                fetch(requst)
                            .then((responce)=>{
                                let j=responce.json();
                                j.then((data)=>{
                                   
                                        console.log( "status is : "+data.status);
                                        console.log("status is : "+data.status)
                                        if(data.status=="Prossing"){
                                            alert("Order is Genrate... Okk;")
                                            closeForm();
                                            deleteCartByCartId(cartId,row);
                                        }
                                        else{
                                            alert(`${ Number.parseInt(qunty)} Products are Not Availeble `)
                                        }
                                })
                                .catch((error)=>{
                                    console.log("is : "+error)
                                })
                            })
                            .catch((error)=>{

                            })

        }





        let ord_cancleBtn=(orderId,row)=>{
                
                let empId=sessionStorage.getItem("empId")
                let token=sessionStorage.getItem(empId);
            
                let valu=window.confirm("Are you Sure to delete Order ");
                if(valu){ 
                let url =`${hostUrl}/user/deleteOrderById/${orderId}`;
                let d=document.getElementById(`order_itom_list_head1${row}`);

                        const requst= new Request(url,{
                            method:"delete",   
                            headers:{
                                'Accept' : 'application/json',
                                'Content-type': 'application/json; charset=UTF-8',
                                'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                                Authorization : `Bearer ${token}`,
                                "alg": "HS256",
                                "typ": "JWT"
                            }
                        });
                            fetch(requst)
                                        .then((responce)=>{
                                            let j=responce.text();
                                            j.then((data)=>{
                                            if(data=="order delete"){
                                                d.style.display="none"; 
                                            }
                                            })
                                        })
                                        .catch((error)=>{
                                        })  
                                    }
                                    else{
                                    }            
        }




        let setAddressInput=()=>{

            let empId=sessionStorage.getItem("empId");
            let token=sessionStorage.getItem(empId);

              let id=  document.getElementById("selectionList").value;
              
              console.log("select Value is : "+id)
              if(id!=null){
                 document.getElementById("realForm1").style.display="none"
                            document.getElementById("realForm").style.display="block"

                           let street= document.getElementById("street").value;
                           let  state= document.getElementById("state").value;
                           let country= document.getElementById("country").value;
                          let   city= document.getElementById("city").value;
                          let  postalCode= document.getElementById("postalCode").value;
                    let url=`${hostUrl}/v1/getAddressById/${id}`


                    const requst= new Request(url,{
                        method:"Get",
                       
                        headers:{
                            'Accept' : 'application/json',
                            'Content-type': 'application/json; charset=UTF-8',
                            'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                            Authorization : `Bearer ${token}`,
                            "alg": "HS256",
                            "typ": "JWT"
                        }
                    });
            
                        fetch(requst)
                                    .then((responce)=>{
                                        let j=responce.json();
                                    
                                        j.then((data)=>{
                                            document.getElementById("street").setAttribute("value",data.street)
                                            document.getElementById("state").setAttribute("value",data.state)
                                            document.getElementById("country").setAttribute("value",data.country)
                                            document.getElementById("city").setAttribute("value",data.city)
                                            document.getElementById("postalCode").setAttribute("value",data.postalCode)

                                            
                                        });
                                    })   

  
            }
            else{
                
                console.log("null ")
              }
        }


let canBtnOrD=()=>{
    document.getElementById("realForm").style.display="none"
    document.getElementById("realForm1").style.display="none"
}





let addNewAddress=()=>{
      document.getElementById("realForm").style.display="none"
      document.getElementById("realForm1").style.display="block"
}



     let addresField=()=>{
           let rel= document.getElementById("realForm").style.display;
         
           let row = document.getElementById("row").innerText;
           let cartId= document.getElementById("cartId").innerText;

           let empId=sessionStorage.getItem("empId");
           let token=sessionStorage.getItem(empId);

           let street;
           let state;
           let country;
           let city;
           let postalCode;
           let topen1=null;
           let topen2Value=null;
           

       
            if(rel=="block"){
                 street= document.getElementById("street").value;
                 state= document.getElementById("state").value;
                 country= document.getElementById("country").value;
                 city= document.getElementById("city").value;
                 postalCode= document.getElementById("postalCode").value;
                
                 topen1=  document.getElementById("selectionList").value;
                 topen2Value=  document.getElementById("selectionList").innerText;
                
             
                console.log("state: ",state ," ---street--  ",street  , "  ", row ," : " ,cartId," topen2Value ",topen2Value)
                console.log("country: ",country ," ---city--  ",city  , " --postalCode--- ", postalCode ," topen1 ", topen1)
            }
            else{

             street= document.getElementById("street1").value;
             state= document.getElementById("state1").value;
             country= document.getElementById("country1").value;
             city= document.getElementById("city1").value;
             postalCode= document.getElementById("postalCode1").value;
             topen1= document.getElementById("topen1").value;
            
           
            
            console.log("state: ",state ," ---street--  ",street  , "  ", row ," : " ,cartId)
            console.log("country: ",country ," ---city--  ",city  , " --postalCode--- ", postalCode)

        }
        

            let url =`${hostUrl}/v1/updatEmpAddress/${empId}`

            
        const requst= new Request(url,{
            method:"Put",
            body: JSON.stringify(
                { 
                "addId":topen1=!null ? topen1 : " ",
                "street":street,
                "city":city ,
                "state": state,
                "country": country,
                "postalCode":Number.parseInt(postalCode),
                "temp":topen2Value,
                }
            ),
            headers:{
                'Accept' : 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                Authorization : `Bearer ${token}`,
                "alg": "HS256",
                "typ": "JWT"
            }
        });

            fetch(requst)
                        .then((responce)=>{
                            let j=responce.json();
                        
                            j.then((data)=>{
                           
                                console.log("save Address" +data.status);
                                if(data.status=="500"){
                                    console.log("if " +data.error);
                                }
                                else{
                                    console.log("else" +data.error);
                                    buyBtn(row ,cartId)
                                    
                                }

                            
                            })
                        })
                        .catch((error)=>{
            
                        })  

        }



    let updAddField=()=>{

        let empId=sessionStorage.getItem("empId");
        let token=sessionStorage.getItem(empId);
            

            let fullName= document.getElementById("fullName").value;
            let mobileNo= document.getElementById("mobileNo").value;
            let address= document.getElementById("ads").value;
            let pincode= document.getElementById("picode").value;
          alert("data add sucessfull")
            document.getElementById("myForm1").style.display="none";
            product();

            let url =`${hostUrl}/user/userUpdate`;

            
        const requst= new Request(url,{
            method:"Put",
            body: JSON.stringify(
                { 
                "id":empId,

                "fullName":fullName ,
                "address": address,
                
                "mobileNo": Number.parseInt(mobileNo) ,
                "pincode":Number.parseInt(pincode)
                }
            ),
            headers:{
                'Accept' : 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                Authorization : `Bearer ${token}`,
                "alg": "HS256",
                "typ": "JWT"
            }
        });

            fetch(requst)
                        .then((responce)=>{
                            let j=responce.json();
                        
                            j.then((data)=>{
                            
                                console.log("save data");
                            
                            })
                        })
                        .catch((error)=>{
            
                        })  
                    



    }



        let profile =()=>{
                document.getElementById("cart_itoms_main").style.display="none";
                document.getElementById("productSection").style.display="none";
                document.getElementById("order_itoms_main").style.display="none";
                document.getElementById("prof_main").style.display="block";

                

                let empId=sessionStorage.getItem("empId")
                let token=sessionStorage.getItem(empId);

            let url=`${hostUrl}/user/getUserById/${empId}`;


            const requst= new Request(url,{
                method:"GET",
                
                headers:{
                    'Accept' : 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                    Authorization : `Bearer ${token}`,
                    "alg": "HS256",
                    "typ": "JWT"
                }
            });

                fetch(requst)
                            .then((responce)=>{
                                let j=responce.json();
                            
                                j.then((data)=>{
                                
                                        document.getElementById("emp_full_Name").innerHTML=data.fullName !=null ? data.fullName : "-" ;
                                        document.getElementById("emp_email").innerHTML=data.username!=null ? data.username : "-" ;
                                        document.getElementById("emp_phone").innerHTML=data.mobileNo!=null ? data.mobileNo : "-";
                                        document.getElementById("emp_add").innerHTML=data.address!=null ? data.address : "-" ;
                                        document.getElementById("emp_pincode").innerHTML=data.pincode!=null ? data.pincode : "-" ;

                                            document.getElementById("emp_id_value").innerHTML=`Emp Id : ${data.id}` ;
                                            document.getElementById("my_profile_text1").innerHTML=data.fullName !=null ? data.fullName : "-" ;
                                
                                })
                            })
                            .catch((error)=>{
                
                            })  
                        
                        
            


        }



        let upBtn  =()=>{
            document.getElementById("myForm1").style.display="block";

            
            let empId=sessionStorage.getItem("empId")
            let token=sessionStorage.getItem(empId);

        let url=`${hostUrl}/user/getUserById/${empId}`;


        const requst= new Request(url,{
            method:"GET",
            
            headers:{
                'Accept' : 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin':"http://127.0.0.1:5500",
                Authorization : `Bearer ${token}`,
                "alg": "HS256",
                "typ": "JWT"
            }
        });

            fetch(requst)
                        .then((responce)=>{
                            let j=responce.json();
                        
                            j.then((data)=>{
                            
                                    document.getElementById("fullName") .setAttribute("value",data.fullName !=null ? data.fullName : "-" );
                                    document.getElementById("email").setAttribute("value",data.username!=null ? data.username : "-") ;
                                    document.getElementById("mobileNo").setAttribute("value",data.mobileNo!=null ? data.mobileNo : "-");
                                    document.getElementById("ads").setAttribute("value",data.address!=null ? data.address : "-" );
                                    document.getElementById("picode").setAttribute("value",data.pincode!=null ? data.pincode : "-") ;

                                    
                            
                            })
                        })
                        .catch((error)=>{
            
                        })  
                    
                    
            

        }





    loadImg();