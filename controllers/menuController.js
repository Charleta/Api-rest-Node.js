const MenusModel = require('../models/menusModel.js');



exports.addmenu = async (req, res) => {
    try{
        const { name, description } = req.body;

        if (!name || name.trim().length === 0 ) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        if (!description || description.trim().length === 0 ) {
            return res.status(400).json({ message: 'Descripcion no valida' });
        };

        const menu = new MenusModel({
            name,
            description
        });

        await menu.save();

        res.status(201).json({ message: 'Menu creado con éxito', menu });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

//traer todos los menus

exports.getAllMenus = async (req, res) => {
    try{
        const menu = await MenusModel.find();
        res.status(200).json({menu});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};

// por el id

exports.getMenusById = async (req, res) => {

    try{
        const id = req.params.menuId;
        const menu = await MenusModel.findById(id);
        
        if(!menu){
            return res.status(404).json({message: 'No se encontró ningún menu con ese id'});
        }

        res.status(200).json({menu});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }

    
};




exports.updateMenu = async (req, res) => {
    try{
        const id = req.params.menuId;
        const { name, description } = req.body;

        if (!name || name.trim().length === 0 ) {
            return res.status(400).json({ message: 'Nombre no válido' });
        };

        if (!description || description.trim().length === 0 ) {
            return res.status(400).json({ message: 'Dirección no válida' });
        };

        const filter = { _id: id };
        const update = { name, description, updatedAt: Date.now() };

        const result = await MenusModel.findByIdAndUpdate(filter, update);

        if (!result) {
            return res.status(404).json({ message: 'No se encontró ningún menu con ese id' });
        }

        res.status(200).json({ message: 'Menu actualizado con éxito', result });


    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};



exports.deleteMenu= async (req, res) => {
    try{
        const id = req.params.menuId;
        const result = await MenusModel.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'No se encontró ningún menu con ese id'});
        }

        res.status(200).json({message: 'Eliminado con exito', result});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
    }
};