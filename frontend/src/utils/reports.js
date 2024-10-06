// utils/reports.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const generatePDF = (data) => {
  const doc = new jsPDF();
  doc.text('Restaurant Management Report', 14, 15);
  
  const tableColumn = ["Username", "Ordered Food", "Caterer", "Date"];
  const tableRows = [];

  data.forEach(item => {
    const reportRow = [
      item.username,
      item.orderedFood,
      item.caterer,
      new Date(item.orderDate).toLocaleDateString(), // Format date as needed
    ];
    tableRows.push(reportRow);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save("restaurant_report.pdf");
};

export const generateExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  
  // Generate buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Save to file
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'restaurant_report.xlsx';
  link.click();
  URL.revokeObjectURL(url);
};