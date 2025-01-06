import { PaymentModel } from '../models/payments.model.js';

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
  deletePaymentType
};