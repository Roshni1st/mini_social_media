const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const commentSchema = mongoose.Schema({
    
    message :{
        type : String,
        require:true
    },
    post :{
        type: objectId,
        ref : 'post',
        default:null
    },
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

module.exports = mongoose.model('comment',commentSchema)