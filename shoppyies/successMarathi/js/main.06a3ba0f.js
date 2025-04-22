


// this my try
// now i can try but this is not successfully

//  this is text for my jaob
// let hostUrl="http://localhost:8081";
let hostUrl="https://test-whjl.onrender.com";
// let Access_Control_Allow_Origin="http://127.0.0.1:5500";
let Access_Control_Allow_Origin="https://actshopmoney.netlify.app";



$(document).ready(function(){
 
            $(".boxbtn").click(()=>{      
                    $('.sideBar').show();
            });



     $(".btnlg").click(()=>{
              
                  let email= $("#email").val();
                  let password= $("#password").val();
      let temUrl=`${hostUrl}/v1/hac/login`;
      console.log("url is : ",temUrl)
      const requst= new Request(temUrl,{
        method:"POST",
        body:JSON.stringify({
                "email":email,
                "password":password
        }),
        headers:{
            'Accept' : 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': Access_Control_Allow_Origin,
            // Authorization : `Bearer ${token}`,
            // "alg": "HS256",
            // "typ": "JWT"
        }

    });
         fetch(requst).then(responce=>{
            let j=responce.json();
            console.log(email , "   ", password)
            j.then((data)=>{
                console.log("text4 "+data.message)
                console.log("text5 "+data.token)
                localStorage.setItem("email",email);
                localStorage.setItem(email,data.token);
               let e= localStorage.getItem("email");
               let t= localStorage.getItem(e);
               console.log(e +"   --  "+t)
                alert("LoginSeccessfully");
                location.href="homeLogin.html";
            }).catch(error=>{
                alert("something error please chack Username or Passwrod")
            })
         }).catch(error=>{

         })

        });



        


     //Geginer Pacage
     $("#Btn_BegPack").click(()=>{
        let id= $("#Btn_BegPack").val(); 
        getlectureByCourseId(id);       
    })


    //Elite Packege
    $("#Btn_elitPack").click(()=>{
        let id= $("#Btn_elitPack").val(); 
        getlectureByCourseId(id);       
    })


//Platinum Packege
$("#Btn_PlatPack").click(()=>{
    let id= $("#Btn_PlatPack").val(); 
    getlectureByCourseId(id);       
})



    //Selver Packege
    $("#Btn_SilPack").click(()=>{
        let id= $("#Btn_SilPack").val(); 
        getlectureByCourseId(id);       
    })

    //Gold Packege
    $("#Btn_goldPack").click(()=>{
        let id= $("#Btn_goldPack").val(); 
        getlectureByCourseId(id);       
    })

    //DiamentPackage
    $("#Btn_DiaPack").click(()=>{
        let id= $("#Btn_DiaPack").val(); 
        getlectureByCourseId(id);       
    })





    $("#closeMenu").click(()=>{
        $("#ifrime").hide();
        $("#courseSec").show();   
         location.reload();
    })


})






let getlectureByCourseId=(id)=>{
 
    let emailId=localStorage.getItem("email");
    let token =localStorage.getItem(emailId);
    let temUrl =`${hostUrl}/v1/hac/getlecturesByCourseId/`+`${id}`;
    const requst= new Request(temUrl,{
        method:"GET",
        headers:{
            'Accept' : 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': Access_Control_Allow_Origin,
            token : `${token}`,
            // "alg": "HS256",
            // "typ": "JWT"
        }
    });
    console.log("text123");  
   
    fetch(requst).then(responce=>{
        let count=0;
        let j=responce.json();
        console.log("jsone s : "+j);  
        j.then((data)=>{
            console.log("data is :",data);  
            let list =data.lectures;
            $("#ifrime").show();
            $("#courseSec").hide();
            console.log("tedde : "+data.message)
            if(data.message=="No lectures found for this course"){
                swal({
                            title: "error",
                            text: "No lectures found for this course",
                            imageUrl: "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/error-icon.png"
                          });     
            }
            else{
                  document.getElementById("closeMenu").style.display="flex";
                    const mainDiv = document.getElementById("ifrime");
                    $("#ifrime").remove("#ifr");
                        // mainDiv.removeChild( $("#ifr"));
                for  (const e of list) {
                    console.log("count is : "+ count +"   "+e.video)
                    // console.log(e)
                    count++;

                    let fr = document.createElement("iframe");
                    fr.setAttribute("id","ifr");
                    fr.setAttribute("width","560");
                    fr.setAttribute("height","315");
                    fr.setAttribute("src",`${e.video}`);
                    fr.setAttribute("frameborder","0");
                    mainDiv.appendChild(fr);
                }
                     
            }
        })
             
    
    }).catch(error=>{
        console.log("error happen");
    })
}


