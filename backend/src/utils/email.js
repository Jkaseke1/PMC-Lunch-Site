const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('./logger');

const transporter = nodemailer.createTransport(config.emailConfig);

exports.sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: config.emailConfig.from,
      to,
      subject,
      text,
      html
    });
    logger.info('Email sent: ' + info.messageId);
    return info;
  } catch (error) {
    logger.error('Error sending email:', error);
    throw error;
  }
};
