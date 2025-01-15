import * as MaterialModel from '../models/materials.model.js';

// Controladores para materials
const getAllMaterials = async (req, res) => {
  try {
    const materials = await MaterialModel.findAllMaterials();
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await MaterialModel.findMaterialById(id);

    if (!material) {
      return res.status(404).json({
        msg: 'Material not found'
      });
    }

    res.status(200).json(material);
  } catch (error) {
    console.error("Error fetching material:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createMaterial = async (req, res) => {
  try {
    const { name, price, material_type_id } = req.body;

    if (!name || !price || !material_type_id) {
      return res.status(400).json({
        msg: 'Name, price, and material type ID are required'
      });
    }

    const newMaterial = await MaterialModel.createMaterial({
      name,
      price,
      material_type_id
    });

    res.status(201).json({
      msg: 'Material created successfully',
      material: newMaterial
    });
  } catch (error) {
    console.error("Error creating material:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, material_type_id } = req.body;

    const updatedMaterial = await MaterialModel.updateMaterial(id, {
      name,
      price,
      material_type_id
    });

    if (!updatedMaterial) {
      return res.status(404).json({
        msg: 'Material not found'
      });
    }

    res.status(200).json({
      msg: 'Material updated successfully',
      material: updatedMaterial
    });
  } catch (error) {
    console.error("Error updating material:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await MaterialModel.findMaterialById(id);
    if (!material) {
      return res.status(404).json({
        msg: 'Material not found'
      });
    }

    await MaterialModel.removeMaterial(id);

    res.status(200).json({
      msg: 'Material deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting material:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para material_types
const getAllMaterialTypes = async (req, res) => {
  try {
    const materialTypes = await MaterialModel.findAllMaterialTypes();
    res.status(200).json(materialTypes);
  } catch (error) {
    console.error("Error fetching material types:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getMaterialTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const materialType = await MaterialModel.findMaterialTypeById(id);

    if (!materialType) {
      return res.status(404).json({
        msg: 'Material type not found'
      });
    }

    res.status(200).json(materialType);
  } catch (error) {
    console.error("Error fetching material type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createMaterialType = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        msg: 'Name is required'
      });
    }

    const newMaterialType = await MaterialModel.createMaterialType({ name });

    res.status(201).json({
      msg: 'Material type created successfully',
      materialType: newMaterialType
    });
  } catch (error) {
    console.error("Error creating material type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateMaterialType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedMaterialType = await MaterialModel.updateMaterialType(id, { name });

    if (!updatedMaterialType) {
      return res.status(404).json({
        msg: 'Material type not found'
      });
    }

    res.status(200).json({
      msg: 'Material type updated successfully',
      materialType: updatedMaterialType
    });
  } catch (error) {
    console.error("Error updating material type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteMaterialType = async (req, res) => {
  try {
    const { id } = req.params;

    const materialType = await MaterialModel.findMaterialTypeById(id);
    if (!materialType) {
      return res.status(404).json({
        msg: 'Material type not found'
      });
    }

    await MaterialModel.removeMaterialType(id);

    res.status(200).json({
      msg: 'Material type deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting material type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

export const MaterialController = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getAllMaterialTypes,
  getMaterialTypeById,
  createMaterialType,
  updateMaterialType,
  deleteMaterialType
};