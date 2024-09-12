const mongoose = require('mongoose');

const fontSchema = new mongoose.Schema({
    family: { type: String, required: true, unique: true },
    variants: [String],
    subsets: [String],
    version: String,
    lastModified: String,
    files: {
        regular: String,
        italic: String,
        "700": String,
        "700italic": String
    },
    category: String,
    kind: String,
    menu: String
});

const Font = mongoose.model('Font', fontSchema);

module.exports = Font;