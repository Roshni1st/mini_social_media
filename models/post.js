const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const postSchema = mongoose.Schema({
    
    title :{
        type : String,
        require:true
    },
    description :{
        type : String,
        require:true
    },
    comments      : [{ type: objectId, ref:'comment', default: null }],
    user :{
        type: objectId,
        ref : 'user',
        default : null

    },
    is_deleted:{
        type : Boolean,
        default: false
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('post',postSchema)