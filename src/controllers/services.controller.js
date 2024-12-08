import { data } from "../data/data.js";

const getAllServices = (req, res) => {
  try {
    res.json({ ok: true, services: data.services });
  } catch (error) {
    console.error("Error getting services:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};


const getServiceById = (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const service = data.services.find(s => s.id === serviceId);
    
    if (!service) {
      return res.status(404).json({ ok: false, message: "Servicio no encontrado" });
    }
    
    res.json({ ok: true, service });
  } catch (error) {
    console.error("Error getting service:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};


 const createService = (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ ok: false, message: "Nombre y precio son requeridos" });
    }
    
    const newService = {
      id: data.services.length + 1,
      name,
      description,
      price: parseFloat(price)
    };
    
    data.services.push(newService);
    res.status(201).json({ ok: true, service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};


const updateService = (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const { name, description, price } = req.body;
    
    const serviceIndex = data.services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({ ok: false, message: "Servicio no encontrado" });
    }
    
    data.services[serviceIndex] = {
      ...data.services[serviceIndex],
      name: name || data.services[serviceIndex].name,
      description: description || data.services[serviceIndex].description,
      price: price ? parseFloat(price) : data.services[serviceIndex].price
    };
    
    res.json({ ok: true, service: data.services[serviceIndex] });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};


const deleteService = (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const serviceIndex = data.services.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === -1) {
      return res.status(404).json({ ok: false, message: "Servicio no encontrado" });
    }
    
    const deletedService = data.services.splice(serviceIndex, 1)[0];
    res.json({ ok: true, message: "Servicio eliminado", service: deletedService });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

export const serviceController ={
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
}