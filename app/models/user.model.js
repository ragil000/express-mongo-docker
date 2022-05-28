const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    gender: {
        type: String,
        enum: ['m', 'f']
    },
    softDelete: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
});

schema.plugin(mongoosePaginate);

const schemaModel = mongoose.model('User', schema);
schemaModel.paginate().then({});
module.exports = schemaModel;