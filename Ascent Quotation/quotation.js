
let btn=()=>{
        console.log("btn Test");

      let vendorName=  document.getElementById("vendorName").value;
      let liquidShoapRate=  document.getElementById("liquidShoapRate").value;
      let toiletCleanRate=  document.getElementById("toiletCleanRate").value;
      let handwasRate=  document.getElementById("handwasRate").value;
      let acidRate=  document.getElementById("acidRate").value;
      let email=  document.getElementById("email").value;

      


      console.log("vendorName: "+vendorName)
      console.log("liquidShoapRate: "+liquidShoapRate)
      console.log("toiletCleanRate: "+toiletCleanRate)
      console.log("handwasRate: "+handwasRate)
      console.log("acidRate: "+acidRate)

      let loginUrl="http://localhost:8084/saveQuetation";
       
      const request =new Request(loginUrl,{
      method:"POST",
      body: JSON.stringify(
          { 
              "industryName":vendorName ,
              "liquidRate": liquidShoapRate,
              "harpicRate":toiletCleanRate ,
              "handwasRate": handwasRate,
              "acidRate":acidRate ,
              "email":email
              
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
                    console.log(" responce: "+responce, "")
                    responce.then((data)=>{
                                console.log(data)
                        })
                    })
                    .catch((error)=>{

                    });
                   

}