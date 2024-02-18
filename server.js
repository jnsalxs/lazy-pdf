import express from 'express';
import PDFDocument from 'pdfkit';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/generate-pdf', (req, res) => {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=justificatif_medical.pdf');

  doc.pipe(res);

  const today = new Date().toLocaleDateString();
  const { gender, name, firstname, reason, startDate, endDate } = req.body;

  // Contenu du PDF
  doc.fontSize(12).text('Dr. Didier Raoult', { align: 'right' })
    .text('Médecin de profession', { align: 'right' })
    .text('8 chemin du Vélodrome, 13000 Marseille', { align: 'right' })
    .text('06 88 88 88 88', { align: 'right' })
    .moveDown(4);

  doc.fontSize(12).text('ARRÊT DE TRAVAIL', { align: 'center' })
    .moveDown(4);
  
  doc.fontSize(12).text(`Le ${today}`)
    .moveDown(1);
    doc.text(`Je soussigné Docteur Didier Raoult, avoir examiné ${gender} ${firstname} ${name} ce jour. Mes examens m'ont permis d'établir le diagnostic suivant :`)
    .moveDown(1);
    doc.text(`- ${gender} ${firstname} ${name} souffre d'${reason}.`)
    .moveDown(1);
    doc.text(`Il est donc nécessaire pour ${gender} ${firstname} ${name} de ne surtout pas aller travailler sous aucun prétexte à compter de ce jour, le ${startDate}, jusqu'au ${endDate} inclus.`)
    .moveDown(4);
    doc.text(`Certificat remis en mains propres le ${today}.`, { align: 'left'})

  doc.end();
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}✨`);
});
