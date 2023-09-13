const mongoose=require("mongoose")
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const msg_s=mongoose.Schema({
    photo:{
type:String
    },
    firstname:{
        type:String
    }
    ,
    lastname:{
        String
    },
    email:{
        type:String
    }
    ,message:{
        type:String
    }
}, { timestamps: true})

msg_s.plugin(aggregatePaginate);
const Comments=mongoose.model("comment",msg_s)

module.exports={Comments}