

let hostUrl=`http://localhost:8084/v1`


let closeForm=()=> {
    // document.getElementById("myForm").style.display = "none";
    document.getElementById("myForm1").style.display = "none";
   
   
  }


  
let logOut =()=>{
    console.log("log Out is Function")

    location.href="index.html";
}




let loadImg=()=>{
    let vendorId=sessionStorage.getItem("vendorId");
    let token=sessionStorage.getItem(vendorId);
    console.log("Get Vendor id Is : "+vendorId );
    console.log("Get Vendor token Is : "+token );
    
    let load_img_url=`${hostUrl}/prod/getProductByVendorId/${vendorId}`;

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
                                  
                                      
                                    for (const element of data.productList) {
                                      
                                        
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
                                     
                                       

                                })

                            })
                            .catch((error)=>{
                                console.log("Error the Fatch record...")
                            })


}


product=()=>{
    document.getElementById("productSection").style.display="block";
    // document.getElementById("cart_itoms_main").style.display="none";
    document.getElementById("order_itoms_main").style.display="none";
    document.getElementById("prof_main").style.display="none";

// loadImg();

}

$(document).ready(function(){
        
        $("#cat_SelectBtn_1").click(function(){
            let v= $("#selectedValue");
            if(v.val()=="Select"){
                console.log(" please select categary ");
            }
            else{
                $("#cat_Select").hide();
                $("#imgSection").show();
              $("#cat_Id").text(v.val());
            }
        });

        $("#addProd").click(function(){
            addProd();
        });

        $("#closeForm").click(function(){
            $("#myForm1").hide();
            $("#cat_Select").show();
            $("#imgSection").hide();
        })
});


let addProduct = ()=>{
document.getElementById("myForm1").style.display="block";

}


let addProd=()=>{
             let vendorId=sessionStorage.getItem("vendorId");
             let token=sessionStorage.getItem(vendorId);
             
                    let url=`${hostUrl}/prod/saveProduct`

                    const requst= new Request(url,{
                        method:"Post",
                        body: JSON.stringify(
                            { 
                            "name":$("#prodName").val() ,
                            "details":$("#prodInfo").val(),
                            "price":$("#prodPrice").val(),
                            "stock":$("#prodQuantity").val(),
                            "image":$("#img").val(),
                            "vendorId":vendorId,
                            "vendor":{
                                    // "venderId":vendorId,
                                    "venderId":"v-24800"
                            },
                            "categary":{
                                "catId":$("#cat_Id").text()
                            }

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
                                            alert(" product save ....");
                                            console.log("Get Vendor id Is : "+vendorId );
                                        })
                                        .catch((error)=>{
                                       console.log("error is: "+error)
                                            
                                        })
                                })
                                .catch((error)=>{
                                    alert("unauthorized errors...");
                                })



}



orders=()=>{
        


    // document.getElementById("cart_itoms_main").style.display="none";
    $("#productSection").hide();
    $("#order_itoms_main").show();
    $("#prof_main").hide();


                let orderHeader= document.getElementById("order_itom_head");
            
                let vendorId=sessionStorage.getItem("vendorId")
                let token=sessionStorage.getItem(vendorId);
                    let url=`${hostUrl}/ven/getOrderByVendorId/${vendorId}`;
    

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
                                    let j=responce.json();
                                    j.then((data)=>{
                                        for (const element of data) {
                                            
                        
                                        

                        let order_itom_list_center=document.createElement("div");
                        order_itom_list_center.setAttribute("class",`container text-center col-md-12 orderRow`)
                        order_itom_list_center.setAttribute("id",`order_itom_list_head1${row}`)

                                let order_Img=document.createElement("div");
                                    order_Img.setAttribute("class","text-center col-md-2");
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
                                order_status.setAttribute("class","text-center col-md-3")
                                        let orderStatus=document.createElement("h4") 
                                                orderStatus.setAttribute("id",`orderStatus${row}`);
                                                orderStatus.setAttribute("class","col-md-3 text-right")
                                                orderStatus.innerHTML=`${element.status}`;

                                                let order_cancelbtn=document.createElement("button") 
                                                order_cancelbtn.setAttribute("id","order_cancelbtn");
                                                order_cancelbtn.setAttribute("class","col-md-3 text-center btn btn-primary")
                                                order_cancelbtn.setAttribute("type","button");
                                                order_cancelbtn.setAttribute("onclick",`ord_cancleBtn("${element.orderId}",${row})`);
                                                order_cancelbtn.innerHTML="cancel"

                                                let order_shiflbtn=document.createElement("button") 
                                                order_shiflbtn.setAttribute("id",`order_shiflbtn${row}`);
                                                order_shiflbtn.setAttribute("class","col-md-3 text-center order_shiflbtn")
                                                order_shiflbtn.setAttribute("type","button")
                                                if(`${element.status}`=="Prossing" || `${element.status}`!="Acsept" ){
                                                    order_shiflbtn.setAttribute("disabled","disabled");
                                                }
                                                else{

                                                    order_shiflbtn.setAttribute("onclick",`ord_shifBtn("${element.orderId}",${row})`);
                                                }
                                                order_shiflbtn.innerHTML="sifted"

                                                let order_acpbtn=document.createElement("button") 
                                                order_acpbtn.setAttribute("id",`order_acpbtn${row}`);
                                                order_acpbtn.setAttribute("class","col-md-3 text-center order_acpbtn ")
                                                order_acpbtn.setAttribute("type","button")
                                               
                                                if(`${element.status}`=="Prossing" ){
                                                    order_acpbtn.setAttribute("onclick",`ord_acptBtn("${element.orderId}",${row})`);
                                                }
                                                else{
                                                    order_acpbtn.setAttribute("disabled","disabled");
                                                }
                                                order_acpbtn.innerHTML="accsept"


                                        order_status.appendChild(orderStatus);
                                        order_status.appendChild(order_acpbtn);
                                        order_status.appendChild(order_shiflbtn);
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







let profile =()=>{
    // document.getElementById("cart_itoms_main").style.display="none";
    document.getElementById("productSection").style.display="none";
    document.getElementById("order_itoms_main").style.display="none";
    document.getElementById("prof_main").style.display="block";

    

    let vendorId=sessionStorage.getItem("vendorId")
    let token=sessionStorage.getItem(vendorId);

let url=`${hostUrl}/v1/emp/${vendorId}`;


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




let ord_acptBtn =(orderId ,row)=>{

    let status="Acsept";
    
    let vendorId=sessionStorage.getItem("vendorId")
    let token=sessionStorage.getItem(vendorId);
    
    
    
    
    let url =`${hostUrl}/v1/updateOrderStatusByOrderId/${orderId}/${status}`


        const requst= new Request(url,{
            method:"PUT",
            
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
              document.getElementById(`orderStatus${row}`).innerHTML=status;

              document.getElementById(`order_acpbtn${row}`).setAttribute("disabled","disabled");

                document.getElementById(`order_shiflbtn${row}`).setAttribute("onclick",`ord_shifBtn("${orderId}",${row})`);
                document.getElementById(`order_shiflbtn${row}`).removeAttribute("disabled");
              alert("Orders is Acsepted...!!!")
            })
        })
        .catch((error)=>{

        })

}

let ord_shifBtn=(orderId,row)=>{
    let status="Shift";
    
    let vendorId=sessionStorage.getItem("vendorId")
    let token=sessionStorage.getItem(vendorId);
    
    
    
    
    let url =`${hostUrl}/v1/updateOrderStatusByOrderId/${orderId}/${status}`


        const requst= new Request(url,{
            method:"PUT",
            
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
              document.getElementById(`orderStatus${row}`).innerHTML=status;

              document.getElementById(`order_acpbtn${row}`).setAttribute("disabled","disabled");
                document.getElementById(`order_shiflbtn${row}`).setAttribute("disabled",`disabled`);
              alert("Orders is shipted...!!!")
            })
        })
        .catch((error)=>{

        })
}

loadImg();