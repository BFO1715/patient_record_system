function calculateStatistics() {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  let maleBMI = 0, femaleBMI = 0;
  let maleCount = 0, femaleCount = 0;
  let underweight = 0, normal = 0, overweight = 0, obese = 0;
  let female50Plus = 0;

  patients.forEach((patient) => {
    const bmi = patient.weight / ((patient.height / 100) ** 2);

    if (bmi < 18.5) underweight++;
    else if (bmi < 24.9) normal++;
    else if (bmi < 29.9) overweight++;
    else obese++;

    if (patient.sex === 'male') {
      maleBMI += bmi;
      maleCount++;
    } else {
      femaleBMI += bmi;
      femaleCount++;
      const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();
      if (age >= 50) female50Plus++;
    }
  });

  document.getElementById('avgBmiMale').textContent = (maleBMI / maleCount || 0).toFixed(2);
  document.getElementById('avgBmiFemale').textContent = (femaleBMI / femaleCount || 0).toFixed(2);
  document.getElementById('underweightCount').textContent = underweight;
  document.getElementById('normalCount').textContent = normal;
  document.getElementById('overweightCount').textContent = overweight;
  document.getElementById('obeseCount').textContent = obese;
  document.getElementById('totalPatients').textContent = patients.length;
  document.getElementById('female50Plus').textContent = female50Plus;
}

document.addEventListener('DOMContentLoaded', calculateStatistics);

