document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('car-form');
  const successMsg = document.getElementById('success-msg');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      id: 'car_' + Date.now(),
      make: form.make.value.trim(),
      model: form.model.value.trim(),
      year: form.year.value.trim(),
      color: form.color.value.trim(),
      damage: form.damage.value,
      parts: Array.from(form.querySelectorAll('input[name="parts"]:checked')).map(cb => cb.value)
    };
    let cars = JSON.parse(localStorage.getItem('scrapmate_cars') || '[]');
    cars.push(data);
    localStorage.setItem('scrapmate_cars', JSON.stringify(cars));
    successMsg.hidden = false;
    setTimeout(() => successMsg.hidden = true, 3000);
    form.reset();
  });
});