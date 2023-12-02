const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },

    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status:{
        type: String,
        enum: ['En armado', 'Atrasado', 'Terminado'],
        default: 'En armado'
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

const Course = mongoose.model('course', courseSchema);
module.exports = Course;