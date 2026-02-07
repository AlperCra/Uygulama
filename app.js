const calorieForm = document.querySelector("#calorie-form");
const calorieResult = document.querySelector("#calorie-result");
const bmiForm = document.querySelector("#bmi-form");
const bmiResult = document.querySelector("#bmi-result");

function calculateBmr({ gender, age, height, weight }) {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return "Zayıf";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Fazla kilolu";
  return "Obez";
}

calorieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const gender = document.querySelector("#gender").value;
  const age = Number(document.querySelector("#age").value);
  const height = Number(document.querySelector("#height").value);
  const weight = Number(document.querySelector("#weight").value);
  const activity = Number(document.querySelector("#activity").value);

  if (!age || !height || !weight || !activity) {
    calorieResult.textContent = "Lütfen tüm alanları doğru şekilde doldurun.";
    return;
  }

  const bmr = calculateBmr({ gender, age, height, weight });
  const maintenanceCalories = Math.round(bmr * activity);

  calorieResult.textContent = `Tahmini günlük kalori ihtiyacın: ${maintenanceCalories} kcal`;
});

bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const heightCm = Number(document.querySelector("#bmi-height").value);
  const weightKg = Number(document.querySelector("#bmi-weight").value);

  if (!heightCm || !weightKg) {
    bmiResult.textContent = "Lütfen boy ve kilo bilgilerini girin.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const rounded = bmi.toFixed(1);

  bmiResult.textContent = `BMI: ${rounded} (${bmiCategory(bmi)})`;
});
