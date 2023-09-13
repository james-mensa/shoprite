export const showascen = () => {
    const container = document.querySelectorAll(".layoutspac");

    const addShowClass = (element) => {
        element.classList.add("showspac");
     
    };

    const handleScroll = () => {
        container.forEach((child, index) => {
            const prevSibling = child.previousElementSibling;

            if (index === 0 && child.getBoundingClientRect().top < window.innerHeight) {
                addShowClass(child);
            }

            if (index > 0 && prevSibling && prevSibling.classList.contains("showspac")) {
                setTimeout(() => {
                    if (child.getBoundingClientRect().top < window.innerHeight) {
                        addShowClass(child);
                    }
                }, 500);
            }
        });
    };

    handleScroll(); // Call once on load

    window.addEventListener("scroll", handleScroll);
};






export const showcoursesm = () => {
  
    const containerv = document.querySelectorAll(".layoutspacv");

    containerv.forEach((child,index) => {
        const prevSibling = child.previousElementSibling;
    
        if (index>0 && prevSibling ){
    
    
    
            setInterval(()=>{
              if(prevSibling.classList.contains("showspac")) {
                    if (child.getBoundingClientRect().top < window.innerHeight) {
                        
                            if (!child.classList.contains("showspac")) {
                                child.classList.add("showspac");
                            }
                      
                    }   
                }
            },500
    
            )
        }
        else{
            if (child.getBoundingClientRect().top < window.innerHeight) {
           
                    if (!child.classList.contains("showspac")) {
                        child.classList.add("showspac");
                    }
            
            }
        }
       
    })

window.addEventListener("scroll", () => {


containerv.forEach((child,index) => {
    const prevSibling = child.previousElementSibling;

    if (index>0 && prevSibling ){



        setInterval(()=>{
          if(prevSibling.classList.contains("showspac")) {
                if (child.getBoundingClientRect().top < window.innerHeight) {
                    
                        if (!child.classList.contains("showspac")) {
                            child.classList.add("showspac");
                        }
                  
                }   
            }
        },500

        )
    }
    else{
        if (child.getBoundingClientRect().top < window.innerHeight) {
       
                if (!child.classList.contains("showspac")) {
                    child.classList.add("showspac");
                }
        
        }
    }
   
})
});
};
