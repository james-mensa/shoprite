export const Checkhover=(element,subcats)=>
{

const mainlayout=document.getElementById("maincatloyout")
const maincat=document.getElementById("maincat")
const catbtn=document.getElementById("catbtnid")
const layouthover=document.querySelectorAll(".presshover")
if(catbtn){
    catbtn.addEventListener("mouseover",()=>{
        element(true)   
    })
}
layouthover.forEach((item)=>{
    item.addEventListener("mouseover",()=>{ 
            element(false)
            subcats(false)  
        })
})
if(maincat){
    maincat.addEventListener("mouseout",()=>{
        subcats(true)
    }) 
}
}

export const CheckProfile=(subaction)=>
{
const mainprofilelayout=document.querySelectorAll(".profile_out")
const avabtn=document.querySelectorAll(".userAvatar")
const layouthover=document.querySelectorAll(".presshover_p")
avabtn.forEach((btn)=>{
    if(btn){
        btn.addEventListener("mouseover",()=>{
            subaction(true)        
        })
    }
})
layouthover.forEach((item)=>{
    item.addEventListener("mouseover",()=>{
        item.classList.add("text_derco") 
        })
    item.addEventListener("mouseout",()=>{
        item.classList.remove("text_derco")
    });
    
})

mainprofilelayout.forEach(div=>{
    div.addEventListener("mouseover",()=>{
        subaction(false)
    })  

})
     window.onscroll=function(){
        subaction(false)
     }

}