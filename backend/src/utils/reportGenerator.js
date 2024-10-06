// utils/reportGenerator.js
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const Order = require('../models/Order');
const logger = require('./logger');

const generateReport = async (req, res) => {
  try {
    const { type, startDate, endDate, caterer } = req.query;

    const filter = {
      orderDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    // Add caterer filter if provided
    if (caterer) {
      filter.caterer = caterer;
    }

    const orders = await Order.find(filter).populate('user', 'email');

    let reportBuffer;
    if (type === 'pdf') {
      reportBuffer = await generatePDF(orders);
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', 'attachment; filename=monthly_report.pdf');
    } else if (type === 'xlsx') {
      reportBuffer = await generateExcel(orders);
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.set('Content-Disposition', 'attachment; filename=monthly_report.xlsx');
    } else {
      return res.status(400).json({ message: 'Invalid report type' });
    }

    res.send(reportBuffer);
  } catch (error) {
    logger.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
};

const generatePDF = async (orders) => {
  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(18).text(`Monthly Report`, { align: 'center' });
  doc.moveDown();

  orders.forEach(order => {
    doc.fontSize(14).text(`Username: ${order.user.email}`);
    doc.fontSize(12).text(`Caterer: ${order.caterer}`);
    doc.text(`Date: ${order.orderDate.toDateString()}`);
    doc.text(`Ordered Food: ${order.entree}, ${order.starch || ''}, ${order.side || ''}, ${order.dessert || ''}`.replace(/, ,/g, ', ').replace(/, $/, ''));
    doc.moveDown();
  });

  doc.end();
  return Buffer.concat(buffers);
};

const generateExcel = async (orders) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Monthly Report');

  worksheet.columns = [
    { header: 'Username', key: 'username', width: 30 },
    { header: 'Ordered Food', key: 'orderedFood', width: 50 },
    { header: 'Caterer', key: 'caterer', width: 30 },
    { header: 'Date', key: 'date', width: 15 }
  ];

  orders.forEach(order => {
    worksheet.addRow({
      username: order.user.email,
      orderedFood: [
        order.entree,
        order.starch,
        order.side,
        order.dessert
      ].filter(Boolean).join(', '),
      caterer: order.caterer,
      date: order.orderDate.toDateString(),
    });
  });

  return await workbook.xlsx.writeBuffer();
};

module.exports = {
  generateReport,
  generatePDF,
  generateExcel
};