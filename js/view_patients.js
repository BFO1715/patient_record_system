// Fetch patients from local storage
function getPatients() {
  return JSON.parse(localStorage.getItem('patients')) || [];
}

// Format Date of Birth to DD-MM-YYYY
function formatDOB(dob) {
  const date = new Date(dob);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Ensure Patient ID is properly formatted
function formatPatientID(id) {
  return id.startsWith('PAT-') ? id : `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Calculate BMI
function calculateBMI(weight, height) {
  return (weight / ((height / 100) ** 2)).toFixed(2);
}

// Get BMI Category
function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 24.9) return 'Normal weight';
  if (bmi < 29.9) return 'Overweight';
  return 'Obese';
}

// Display patients in the table
function displayPatients(filteredPatients = getPatients()) {
  const tableBody = document.getElementById('patientData');
  const patients = getPatients();

  tableBody.innerHTML = '';

  if (filteredPatients.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No records found</td></tr>';
    return;
  }

  filteredPatients.forEach((patient) => {
    // Ensure the Patient ID is static and properly formatted
    patient.id = patient.id || formatPatientID(`PAT-${Math.floor(1000 + Math.random() * 9000)}`);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="clickable" data-id="${patient.id}" style="color: #007bff; text-decoration: underline; cursor: pointer;">${patient.id}</td>
      <td>${patient.firstName}</td>
      <td>${patient.lastName}</td>
      <td>${formatDOB(patient.dob)}</td>
    `;

    // Add click event to display patient details
    row.querySelector('.clickable').addEventListener('click', () => showPatientDetails(patient));

    tableBody.appendChild(row);
  });

  // Save updated patient data with static IDs back to local storage
  localStorage.setItem('patients', JSON.stringify(patients));
}

// Show patient details in a popup
function showPatientDetails(patient) {
  const bmi = calculateBMI(patient.weight, patient.height);
  const bmiCategory = getBMICategory(bmi);
  const details = `
    Patient Details:
    ----------------
    - ID: ${patient.id}
    - Name: ${patient.firstName} ${patient.lastName}
    - Date of Birth: ${formatDOB(patient.dob)}
    - Height: ${patient.height} cm
    - Weight: ${patient.weight} kg
    - Sex: ${patient.sex}
    - Mobile: ${patient.mobile}
    - Email: ${patient.email}
    - Health Info: ${patient.healthInfo || 'None'}
    - BMI: ${bmi}
    - BMI Category: ${bmiCategory}
  `;
  alert(details);
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const patients = getPatients();

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.id.toLowerCase().includes(query) ||
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      formatDOB(patient.dob).includes(query)
    );
  });

  displayPatients(filteredPatients);
});

// Initialize the display of patients on page load
document.addEventListener('DOMContentLoaded', () => displayPatients());





