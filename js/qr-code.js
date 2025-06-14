// qr-code.js
// Requires QRCode from CDN

function generateCarQRCode(container, carData) {
  container.innerHTML = '';
  QRCode.toCanvas(container, JSON.stringify(carData), {
    width: 160,
    margin: 1,
    color: {
      dark: '#004d40',
      light: '#e0f2f1'
    }
  }, (error) => {
    if (error) console.error('QR code generation error:', error);
  });
}