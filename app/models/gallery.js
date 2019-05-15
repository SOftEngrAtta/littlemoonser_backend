const mongoose = require("mongoose");
const {
    String,
    Number,
    Boolean,
    Date,
    Mixed,
    ObjectId
} = mongoose.Schema.Types;


const gallerySchema = new mongoose.Schema({
    status: {type: Number, enum :[0, 1]},/* 0 - disabled, 1 - enabled*/
    created_at: {
        type: Date,
        default: Date.now
    },
    galleryType : {type: String, enum :['EVENTS_GALLERY','MISC_IMAGES_GALLERY']},
    created_by: String,
    created_by_id: ObjectId,
    eventName : String,
    eventDate : Date,
    images : [{}],
    imagesCount : {type: Number, default : 0}
});

module.exports = mongoose.model("imageGallery", gallerySchema);