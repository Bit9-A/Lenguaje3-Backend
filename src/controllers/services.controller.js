import { ServiceModel } from "../models/services.model.js";

const getAllServices = async (req, res) => {
  try {
    const services = await ServiceModel.findAll();
    res.json(services);
  } catch (error) {
    console.error("Error getting services:", error);
    res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const service = await ServiceModel.findById(serviceId);

    if (!service) {
      return res.status(404).json({ msg: "Servicio no encontrado" });
    }

    res.json(service);
  } catch (error) {
    console.error("Error getting service:", error);
    res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ msg: "Nombre y precio son requeridos" });
    }

    const newService = await ServiceModel.create({ name, description, price });

    res.status(201).json(newService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const { name, description, price } = req.body;

    const updatedService = await ServiceModel.update(serviceId, { name, description, price });

    if (!updatedService) {
      return res.status(404).json({ msg: "Servicio no encontrado" });
    }

    res.json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);

    const service = await ServiceModel.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: "Servicio no encontrado" });
    }

    await ServiceModel.remove(serviceId);

    res.json({ msg: "Servicio eliminado" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

export const ServiceController = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};