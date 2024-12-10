import { calculateAge, getBMICategory } from './validation.js';

const patients = JSON.parse(localStorage.getItem('patients')) || [];

function calculateStatistics() {
  let maleBMI = 0, femaleBMI = 0;
  let maleCount = 0, femaleCount = 0;
  let bmiCategories = { underweight: 0, normal: 0, overweight: 0, obese: 0 };
  let female50Plus = 0;

  patients.forEach(patient => {
    const bmi = patient.weight / ((patient.height / 100) ** 2);
    const category = getBMICategory(bmi);
    bmiCategories[category.toLowerCase()]++;

    if (patient.sex === 'male') {
      maleBMI += bmi;
      maleCount++;
    } else if (patient.sex === 'female') {
      femaleBMI += bmi;
      femaleCount++;
      if (calculateAge(patient.dob) >= 50) {
        female50Plus++;
      }
    }
  });

  document.getElementById('avgBmiMale').textContent = (maleBMI / maleCount || 0).toFixed(2);
  document.getElementById('avgBmiFemale').textContent = (femaleBMI / femaleCount || 0).toFixed(2);
  document.getElementById('underweightCount').textContent = bmiCategories.underweight;
  document.getElementById('normalCount').textContent = bmiCategories.normal;
  document.getElementById('overweightCount').textContent = bmiCategories.overweight;
  document.getElementById('obeseCount').textContent = bmiCategories.obese;
  document.getElementById('totalPatients').textContent = patients.length;
  document.getElementById('female50Plus').textContent = female50Plus;
}

document.addEventListener('DOMContentLoaded', calculateStatistics);
