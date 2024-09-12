const Font = require('../models/fontModels'); 
const { google } = require('googleapis');

// Get a list of available fonts from Google Fonts API
exports.getFonts = async (req, res) => {
    try {
        const webfonts = google.webfonts({ version: 'v1', auth: process.env.GOOGLE_API_KEY });
        const response = await webfonts.webfonts.list();
        res.status(200).json(response.data.items);
    } catch (error) {
        console.error('Error fetching fonts:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get a single font by family name
exports.getFontByFamily = async (req, res) => {
    const fontFamily = req.params.family; 

    try {
        const font = await Font.findOne({ family: fontFamily });
        if (font) {
            res.status(200).json(font); 
        } else {
            res.status(404).json({ message: 'Font not found' });
        }
    } catch (error) {
        console.error('Error fetching font:', error);
        res.status(500).json({ error: error.message });
    }
};

// Create a new font entry
exports.createFont = async (req, res) => {
    const newFont = new Font(req.body); 
    try {
        const savedFont = await newFont.save(); // Save the new font to the database
        res.status(201).json({ message: 'Font created', data: savedFont });
    } catch (error) {
        console.error('Error creating font:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update an existing font entry 
exports.updateFont = async (req, res) => {
    const fontFamily = req.params.family; 
    const updatedData = req.body; 
    
    try {
        const updatedFont = await Font.findOneAndUpdate({ family: fontFamily }, updatedData, { new: true });
        if (updatedFont) {
            res.status(200).json({ message: 'Font updated', family: fontFamily, data: updatedFont });
        } else {
            res.status(404).json({ message: 'Font not found' });
        }
    } catch (error) {
        console.error('Error updating font:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a font entry 
exports.deleteFont = async (req, res) => {
    const fontFamily = req.params.family; 
    
    try {
        const deletedFont = await Font.findOneAndDelete({ family: fontFamily }); // Delete the font by family name
        if (deletedFont) {
            res.status(200).json({ message: 'Font deleted', family: fontFamily });
        } else {
            res.status(404).json({ message: 'Font not found' });
        }
    } catch (error) {
        console.error('Error deleting font:', error);
        res.status(500).json({ error: error.message });
    }
};