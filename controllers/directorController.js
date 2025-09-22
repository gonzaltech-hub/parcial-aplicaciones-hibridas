const Director = require('../models/Director');

exports.getAllDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los directores", error: error.message });
    }
};

exports.createDirector = async (req, res) => {
    const nuevoDirector = new Director(req.body);
    try {
        const directorGuardado = await nuevoDirector.save();
        res.status(201).json(directorGuardado);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el director", error: error.message });
    }
};