function getPatients() {
  return JSON.parse(localStorage.getItem('patients')) || [];
}

function displayPatients() {
  const tableBody = document.getElementById('patientData');
  const patients = getPatients();

  tableBody.innerHTML = '';

  if (patients.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No records found</td></tr>';
    return;
  }

  patients.forEach((patient) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${patient.id}</td>
      <td>${patient.firstName}</td>
      <td>${patient.lastName}</td>
      <td>${patient.dob}</td>
    `;
    tableBody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', displayPatients);

