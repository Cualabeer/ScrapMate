document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('car-data-display');
  const qrContainer = document.getElementById('qrcode');
  const editBtn = document.getElementById('edit-car-btn');
  const printBtn = document.getElementById('print-qr-btn');

  function render(car) {
    display.textContent = JSON.stringify(car, null, 2);
    qrContainer.innerHTML = '';
    QRCode.toCanvas(qrContainer, JSON.stringify(car), {
      width: 200,
      margin: 2,
      color: { dark: '#004d40', light: '#e0f2f1' }
    }, err => err && console.error(err));
  }

  editBtn.addEventListener('click', () => {
    const car = window.currentCarForQr ||
      JSON.parse(localStorage.getItem('scrapmate_cars') || '[]')[0] ||
      null;
    if (!car) return alert('No car data available.');
    render(car);
  });

  printBtn.addEventListener('click', () => {
    const canvas = qrContainer.querySelector('canvas');
    if (!canvas) return alert('Generate QR code first.');
    const dataUrl = canvas.toDataURL();
    const w = window.open('', '_blank');
    w.document.write(`
      <html><head><title>Print QR</title></head>
      <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;">
        <img src="${dataUrl}" />
        <script>window.onload=()=>window.print();</script>
      </body></html>`);
    w.document.close();
  });

  // Initial render if first car exists
  const cars = JSON.parse(localStorage.getItem('scrapmate_cars') || '[]');
  if (cars.length) {
    window.currentCarForQr = cars[0];
    render(cars[0]);
  }
});