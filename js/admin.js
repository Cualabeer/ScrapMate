// admin.js
document.addEventListener('DOMContentLoaded', () => {
  const carListContainer = document.getElementById('car-list');

  function renderCarList() {
    const cars = window.carDataStorage.getAllCars();
    carListContainer.innerHTML = '';
    if (cars.length === 0) {
      carListContainer.textContent = 'No cars in the system.';
      return;
    }

    cars.forEach(car => {
      const card = document.createElement('article');
      card.className = 'car-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Car: ${car.make} ${car.model}, Year ${car.year}`);

      // Car info display
      const info = document.createElement('pre');
      info.className = 'car-info';
      info.textContent = JSON.stringify(car, null, 2);

      // QR code container
      const qrContainer = document.createElement('div');
      qrContainer.className = 'qr-container';

      generateCarQRCode(qrContainer, car);

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.className = 'btn-secondary';
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => {
        if (!confirm('Editing this car will overwrite existing data. Continue?')) return;

        // Simple prompts for each field
        const make = prompt('Make:', car.make);
        if (make === null) return;
        const model = prompt('Model:', car.model);
        if (model === null) return;
        const yearStr = prompt('Year:', car.year);
        if (yearStr === null) return;
        const year = parseInt(yearStr, 10);
        const color = prompt('Color:', car.color);
        if (color === null) return;
        const damage = prompt('Damage Description:', car.damage || '');
        if (damage === null) return;
        const partsRaw = prompt('Parts Available (comma separated):', (car.partsAvailable || []).join(', '));
        if (partsRaw === null) return;
        const partsAvailable = partsRaw.split(',').map(p => p.trim()).filter(p => p.length > 0);

        const updatedCar = {
          id: car.id,
          make: make.trim(),
          model: model.trim(),
          year,
          color: color.trim(),
          damage: damage.trim(),
          partsAvailable
        };

        if (window.carDataStorage.updateCar(updatedCar)) {
          alert('Car updated successfully!');
          renderCarList();
        } else {
          alert('Error updating car.');
        }
      });

      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn-danger';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        if (!confirm(`Are you sure you want to REMOVE this car?\n\n${car.make} ${car.model} (${car.year})`)) return;
        if (window.carDataStorage.removeCar(car.id)) {
          alert('Car removed.');
          renderCarList();
        } else {
          alert('Error removing car.');
        }
      });

      const btnContainer = document.createElement('div');
      btnContainer.className = 'btn-container';
      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(removeBtn);

      card.appendChild(info);
      card.appendChild(qrContainer);
      card.appendChild(btnContainer);

      carListContainer.appendChild(card);
    });
  }

  renderCarList();
});