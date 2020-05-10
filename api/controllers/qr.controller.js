import QRCode from 'qrcode'
 
const createQR = (req, res) => {
  const data = req.body.text;
 // With promises
  QRCode.toDataURL(data)
  .then(url => {
    return res.status(200).json(url)
  })
  .catch(err => {
    console.error(err)
  })
}
export default {
  createQR,
}