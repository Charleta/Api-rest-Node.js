const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menusSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

const Menus = mongoose.model('menus', menusSchema);
module.exports = Menus;