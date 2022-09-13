const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    contentarea: {
        type: String
        
    },
    comments: {
        type: String
    },
    history: {
        type: String
        
    }
});
const postModal = mongoose.model("userpost", postSchema);
module.exports = postModal;