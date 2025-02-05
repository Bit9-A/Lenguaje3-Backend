import { PaymentModel } from '../models/payments.model.js';
import ExcelJS from 'exceljs';

// Controladores para payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.findAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentModel.findPaymentById(id);

    if (!payment) {
      return res.status(404).json({
        msg: 'Payment not found'
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createPayment = async (req, res) => {
  try {
    const { amount, payment_date, project_id, payment_type_id, description, service_id, material_id } = req.body;

    if (!amount || !payment_date || !project_id || !payment_type_id) {
      return res.status(400).json({
        msg: 'Amount, payment date, project ID, and payment type ID are required'
      });
    }

    const newPayment = await PaymentModel.createPayment({
      amount,
      payment_date,
      project_id,
      payment_type_id,
      description,
      service_id,
      material_id
    });

    res.status(201).json({
      msg: 'Payment created successfully',
      payment: newPayment
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, payment_date, project_id, payment_type_id, description, service_id, material_id } = req.body;

    const updatedPayment = await PaymentModel.updatePayment(id, {
      amount,
      payment_date,
      project_id,
      payment_type_id,
      description,
      service_id,
      material_id
    });

    if (!updatedPayment) {
      return res.status(404).json({
        msg: 'Payment not found'
      });
    }

    res.status(200).json({
      msg: 'Payment updated successfully',
      payment: updatedPayment
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await PaymentModel.findPaymentById(id);
    if (!payment) {
      return res.status(404).json({
        msg: 'Payment not found'
      });
    }

    await PaymentModel.removePayment(id);

    res.status(200).json({
      msg: 'Payment deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para payment_types
const getAllPaymentTypes = async (req, res) => {
  try {
    const paymentTypes = await PaymentModel.findAllPaymentTypes();
    res.status(200).json(paymentTypes);
  } catch (error) {
    console.error("Error fetching payment types:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getPaymentTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentType = await PaymentModel.findPaymentTypeById(id);

    if (!paymentType) {
      return res.status(404).json({
        msg: 'Payment type not found'
      });
    }

    res.status(200).json(paymentType);
  } catch (error) {
    console.error("Error fetching payment type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createPaymentType = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        msg: 'Name is required'
      });
    }

    const newPaymentType = await PaymentModel.createPaymentType({ name, description });

    res.status(201).json({
      msg: 'Payment type created successfully',
      paymentType: newPaymentType
    });
  } catch (error) {
    console.error("Error creating payment type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updatePaymentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedPaymentType = await PaymentModel.updatePaymentType(id, { name, description });

    if (!updatedPaymentType) {
      return res.status(404).json({
        msg: 'Payment type not found'
      });
    }

    res.status(200).json({
      msg: 'Payment type updated successfully',
      paymentType: updatedPaymentType
    });
  } catch (error) {
    console.error("Error updating payment type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deletePaymentType = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentType = await PaymentModel.findPaymentTypeById(id);
    if (!paymentType) {
      return res.status(404).json({
        msg: 'Payment type not found'
      });
    }

    await PaymentModel.removePaymentType(id);

    res.status(200).json({
      msg: 'Payment type deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting payment type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para servicios y materiales pagados y no pagados por proyecto
const getUnpaidServicesByProject = async (req, res) => {
  try {
    const { project_id } = req.params;
    const services = await PaymentModel.findUnpaidServicesByProject(project_id);
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching unpaid services:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getPaidServicesByProject = async (req, res) => {
  try {
    const { project_id } = req.params;
    const services = await PaymentModel.findPaidServicesByProject(project_id);
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching paid services:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getUnpaidMaterialsByProject = async (req, res) => {
  try {
    const { project_id } = req.params;
    const materials = await PaymentModel.findUnpaidMaterialsByProject(project_id);
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching unpaid materials:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getPaidMaterialsByProject = async (req, res) => {
  try {
    const { project_id } = req.params;
    const materials = await PaymentModel.findPaidMaterialsByProject(project_id);
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching paid materials:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getTotalCostByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const totalCost = await PaymentModel.calculateTotalCostByProjectId(project_id);
    res.status(200).json(totalCost);
  } catch (error) {
    console.error("Error calculating total cost:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};
const updateServicePaymentStatus = async (req, res) => {
  try {
    const { project_id, service_id, is_paid } = req.body;

    if (typeof is_paid !== 'boolean') {
      return res.status(400).json({
        msg: 'is_paid must be a boolean'
      });
    }

    const updatedService = await PaymentModel.updateServicePaymentStatus(project_id, service_id, is_paid);

    if (!updatedService) {
      return res.status(404).json({
        msg: 'Service not found'
      });
    }

    res.status(200).json({
      msg: 'Service payment status updated successfully',
      service: updatedService
    });
  } catch (error) {
    console.error("Error updating service payment status:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateMaterialPaymentStatus = async (req, res) => {
  try {
    const { project_id, material_id, is_paid } = req.body;

    if (typeof is_paid !== 'boolean') {
      return res.status(400).json({
        msg: 'is_paid must be a boolean'
      });
    }

    const updatedMaterial = await PaymentModel.updateMaterialPaymentStatus(project_id, material_id, is_paid);

    if (!updatedMaterial) {
      return res.status(404).json({
        msg: 'Material not found'
      });
    }

    res.status(200).json({
      msg: 'Material payment status updated successfully',
      material: updatedMaterial
    });
  } catch (error) {
    console.error("Error updating material payment status:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const generateIncomeStatisticsExcel = async (req, res) => {
  try {
    const payments = await PaymentModel.findAllPayments();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Estadísticas de Ingresos');

    worksheet.columns = [
      { header: 'ID del Pago', key: 'id', width: 15 },
      { header: 'Monto', key: 'amount', width: 15 },
      { header: 'Fecha de Pago', key: 'payment_date', width: 20 },
      { header: 'ID del Proyecto', key: 'project_id', width: 15 },
      { header: 'ID del Tipo de Pago', key: 'payment_type_id', width: 20 },
      { header: 'Descripción', key: 'description', width: 30 },
    ];

    payments.forEach(payment => {
      worksheet.addRow(payment);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=estadisticas_ingresos.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating Excel file:', error);
    res.status(500).json({ message: 'Error generating Excel file' });
  }
};
export const PaymentController = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getAllPaymentTypes,
  getPaymentTypeById,
  createPaymentType,
  updatePaymentType,
  deletePaymentType,
  getUnpaidServicesByProject,
  getPaidServicesByProject,
  getUnpaidMaterialsByProject,
  getPaidMaterialsByProject,
  getTotalCostByProjectId,
  updateServicePaymentStatus,
  updateMaterialPaymentStatus,
  generateIncomeStatisticsExcel,
};