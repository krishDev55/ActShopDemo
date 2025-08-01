
let hostApi="http://192.168.1.108:8086"
// let hostApi="http://localhost:8086"
// let hostApi="http://192.168.1.108:8086:8086"


// Example JavaScript to smooth-scroll to the products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
  
  // You can add more interactivity here as needed
  

  
    $(document).ready(function(){
                               $("#gen_bill").hide();
                              $("#info_bill").hide();
                              $("#gen_Queite").hide();

        $("#adminPannel").click(()=>{

                    Swal.fire({
                        title: 'Enter Code ',
                        input: 'text',                 // this makes it an input
                        inputPlaceholder: 'Code....',
                        showCancelButton: true,
                        confirmButtonText: 'Submit'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          const userInput = result.value;
                           if(result.value == 1234){
                              $("#gen_bill").show();
                              $("#info_bill").show();
                              $("#gen_Queite").show();
                           }

                        }
                        else{
                              $("#gen_bill").hide();
                              $("#info_bill").hide();
                              $("#gen_Queite").hide();
                        }
                      });
        })
                  


  $("#billImfo").click(function(){
              $(".hero").hide();
              $(".intro").hide();
              $(".products").hide();


            $("#billimfoIfreme").show();
              let tempREmove =document.getElementById("to");
                  let innerDivs=  tempREmove.querySelectorAll('select');
                    innerDivs.forEach(div => div.remove());
                    

                  //   let tempREmove1 =document.getElementById("chackBillImfo");
                  // let innerDivs1=  tempREmove1.querySelectorAll('div');
                  //   innerDivs1.forEach(div => div.remove());

            let allCustomer=()=>{
             let to=document.getElementById("to");
             let selectCo= document.createElement("select");
             selectCo.setAttribute("name","CostomerList");
             selectCo.setAttribute("id","costomer");
              selectCo.setAttribute("class","classCustomer");

          fetch('./imfo.json')
          .then(response => response.json())
          .then(data => {
            // Use the data
          for (const element of Object.keys(data)) {
            let option= document.createElement("option");
                  option.setAttribute("value",`${element}`)
                  option.innerHTML=`${element}`
                  selectCo.appendChild(option);
              }
              to.prepend(selectCo)           
          })
    }

      allCustomer();
               
          })


          // --------------------get imfo btn logic---------------------------

  $("#getImfoBtn").click(()=>{
            let value= $("#costomer").val();
            $("#chackBillImfo").show();
          
           let url=`${hostApi}/api/getBillsByCostomerName/${value}`
            const request = new Request(url, {
          method: "Get",
          headers:{
              'Accept' : 'application/json',
              'Content-type': 'application/json; charset=UTF-8',
              // 'Access-Control-Allow-Origin':ACAO,
              // Authorization : `Bearer ${token}`,
              // "alg": "HS256",
              // "typ": "JWT"
          } 
        })
            fetch(request)
                    .then((data)=>{
                      let j= data.json();
                      console.log("value is1 : "+j)
                       j.then(v=>{
                      let t = document.getElementById("chackBillImfo");
                      t.style.display="block";
                      // const innerDivs = t.querySelectorAll('div');
                      //         // Remove each one
                      //       innerDivs.forEach(div => div.remove());
                                                  
                      let count=1;
                    
                      for (const element of v) {
                            let t1= document.createElement("div");
                              t1.setAttribute("id",`t${count}`)
                              t1.innerHTML=`
                              <h4 id="billNoH"> bill no : <a id ="biilNo${count}"> 340 </a> </h4>
                                  <h4 id="dateBil"> date  : <a id ="date${count}"> 13/06/2025 </a> </h4>
                                    <table>
                                       <thead>
                                         <tr>
                                             <th> Name </th>
                                             <th> Qty </th>
                                             <th> Rate </th>
                                              <th> Total </th>
                                         </tr>
                                       </thead>
                                      <tbody id="tBody${count}">

                                      </tbody>
                                    </table>

                                    <h4 id="g_totalH"> Grand Total : <a id ="G_total${count}"> 3400 </a> </h4>
                              `
                              ;


                               t.append(t1);


                            let G_total=0; 
                            let dCount=0;
                            let tbody= document.getElementById(`tBody${count}`);
                            console.log( "tBody element is : "+tbody.innerHTML)
                           let keys =Object.keys(element);
                           console.log("keys is "+keys)
                           for (const key of keys) {
                                      let tr = document.createElement("tr");
                                      if(`${key}`==`date`){
                                        document.getElementById(`date${count}`).innerHTML=`${element[key]}`;

                                      }

                                       else if (`${key}`=="?bill"){
                                          document.getElementById(`biilNo${count}`).innerHTML=`${element[key]}`;

                                      }
                                      else if(`${key}`=="to"){
                                          
                                      }
                                      else{
                                        let qnt=Number(String(element[key]).split("*")[0]);
                                        let prc= Number(String(element[key]).split("*")[1]);

                                         let td = document.createElement("td");
                                         td.innerHTML=`${key}`;

                                          let td1 = document.createElement("td");
                                         td1.innerHTML=`${qnt}`;

                                           let td2 = document.createElement("td");
                                            td2.innerHTML=`${prc}`;

                                           let td3 = document.createElement("td");
                                            td3.innerHTML=`${prc * qnt}`;
                                          
                                          tr.append(td);
                                           tr.append(td1);
                                            tr.append(td2);
                                             tr.append(td3);

                                          G_total=G_total+(qnt*prc);
                                          dCount++;
                                      }
                                      
                                      tbody.append(tr);
                                    }
                                    
                                    document.getElementById(`G_total${count}`).innerHTML=G_total;
                                    if(dCount==1){
                                      document.getElementById(`t${count}`).style.height=dCount*240+"px"
                                    }
                                    else{
                                       document.getElementById(`t${count}`).style.height=dCount*25+240+"px"
                                    }
                                  
                                  count++;      
                         }
                          // document.querySelectorAll('#t > div').forEach(d => d.style.height = ` 300 * ${count}+"px"`);

                         
                          document.getElementById("to").style.height=count*240+"px";
                       })
                    }).catch(error=>{

                })
            
          })




          // Show product Dynamically when you start the application from Product.json file

   let showProduct=()=>{
               let product_list= document.getElementById("product_list");
               
               fetch('./product.json').then(response => response.json())
               .then(data => {
                 // document.getElementById(`price_${id}`).setAttribute("value",Number(data[c_ref].rate[m])
                 for (const key of Object.keys(data)) {
                             let product_item=  document.createElement("div");
                              product_item.setAttribute("class","product-item")
                              product_item.setAttribute("id","product_item");
                                // console.log("data is :"+key)
                                //  console.log("data is1 :"+data[key].rate)
                                product_item.innerHTML=
                                `
                                      <img src="${data[key].img['img1']}" alt="Product 1" />
                                      <h3 id ="name">${data[key].name}</h3> 
                                        <a id="extraAddPack"> ( ${data[key].extraAddPack} )</a> 
                                            <p> ${data[key].Description}</p>
                                      <h2 id="rate"> ${data[key].rate} </h2>
                                    
                                `
                                product_list.append(product_item)


                           }
                        });

                        }


                $("#img-id").click(()=>{
                  $("#billimfoIfreme").hide();
                })

                 $(".btn-cancel").click(()=>{
                    $("#billimfoIfreme").hide();
                })
                
                



showProduct();
    })

