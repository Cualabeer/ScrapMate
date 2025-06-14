// car-data.js
window.carDataStorage = (function () {
  const STORAGE_KEY = 'scrapmate-cars';

  function _getAllCars() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  function _saveAllCars(cars) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  }

  function addCar(car) {
    const cars = _getAllCars();
    // Assign unique ID
    car.id = Date.now().toString();
    cars.push(car);
    _saveAllCars(cars);
  }

  function getAllCars() {
    return _getAllCars();
  }

  function removeCar(id) {
    const cars = _getAllCars();
    const index = cars.findIndex(c => c.id === id);
    if (index !== -1) {
      cars.splice(index, 1);
      _saveAllCars(cars);
      return true;
    }
    return false;
  }

  function updateCar(updatedCar) {
    const cars = _getAllCars();
    const index = cars.findIndex(c => c.id === updatedCar.id);
    if (index !== -1) {
      cars[index] = updatedCar;
      _saveAllCars(cars);
      return true;
    }
    return false;
  }

  return {
    addCar,
    getAllCars,
    removeCar,
    updateCar
  };
})();