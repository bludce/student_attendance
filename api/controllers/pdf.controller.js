import pdfTemplate from '../documents/pdf'
import pdf from 'html-pdf'

const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/result.pdf`, (err) => {
    if(err) {
        res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
}

const getPdf = (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
}

export default {
  createPdf,
  getPdf
}