$(document).ready(function (){
   $("form").submit(function (event){
       event.preventDefault();
       $.ajax({
           type:"POST",
           url:"/api/register",
           data:new FormData(this),
           contentType:false,
           processData:false,
           beforeSend:function (){},
           success:function (data){
               console.log(data)
           },
           error:function (error){
               console.error(error)
           }
       })
   });
})