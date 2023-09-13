const sortArticles=(sort)=>{
    let  SortArgs={sortBy:"_id",order:"asc",limit:5,skip:0}
    for(key in sort){
        if(sort[key]){
            SortArgs[key]=sort[key]
        }
    }
    return SortArgs
    
}


module.exports={sortArticles}