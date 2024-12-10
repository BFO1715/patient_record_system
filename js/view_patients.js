// Fetch patients from local storage
function getPatients() {
  return JSON.parse(localStorage.getItem('patients')) || [];
}

// Save patients to local storage
function savePatients(patients) {
  localStorage.setItem('patients', JSON.stringify(patients));
}

// Format Date of Birth to DD-MM-YYYY
function formatDOB(dob) {
  const date = new Date(dob);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Close modal utility
function closeModal(modal) {
  if (modal) {
    document.body.removeChild(modal);
  }
}

// Show a modal with action buttons for a patient
function showPatientActions(patient) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.padding = '20px';
  modal.style.backgroundColor = '#fff';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  modal.style.zIndex = '1000';
  modal.style.textAlign = 'center';
  modal.style.borderRadius = '10px';

  modal.innerHTML = `
    <h3>Actions for ${patient.firstName} ${patient.lastName}</h3>
    <button id="viewButton" style="margin: 5px; padding: 10px;">View</button>
    <button id="modifyButton" style="margin: 5px; padding: 10px;">Modify</button>
    <button id="deleteButton" style="margin: 5px; padding: 10px; background-color: red; color: white;">Delete</button>
    <button id="closeButton" style="margin: 5px; padding: 10px;">Close</button>
  `;

  document.body.appendChild(modal);

  document.getElementById('viewButton').addEventListener('click', () => {
    showPatientDetails(patient);
    closeModal(modal);
  });

  document.getElementById('modifyButton').addEventListener('click', () => {
    modifyPatient(patient);
    closeModal(modal);
  });

  document.getElementById('deleteButton').addEventListener('click', () => {
    deletePatient(patient);
    closeModal(modal);
  });

  document.getElementById('closeButton').addEventListener('click', () => {
    closeModal(modal);
  });
}

// Show patient details
function showPatientDetails(patient) {
  alert(`
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
  `);
}

// Modify patient record
function modifyPatient(patient) {
  const form = document.createElement('form');
  form.style.overflowY = 'auto';
  form.style.maxHeight = '80vh';
  form.style.padding = '10px';

  form.innerHTML = `
    <div>
      <label>First Name:</label>
      <input type="text" id="firstName" value="${patient.firstName}" required>
    </div>
    <div>
      <label>Last Name:</label>
      <input type="text" id="lastName" value="${patient.lastName}" required>
    </div>
    <div>
      <label>Date of Birth:</label>
      <input type="date" id="dob" value="${patient.dob}" required>
    </div>
    <div>
      <label>Height (cm):</label>
      <input type="number" id="height" value="${patient.height}" required>
    </div>
    <div>
      <label>Weight (kg):</label>
      <input type="number" id="weight" value="${patient.weight}" required>
    </div>
    <div>
      <label>Sex:</label>
      <select id="sex" required>
        <option value="male" ${patient.sex === 'male' ? 'selected' : ''}>Male</option>
        <option value="female" ${patient.sex === 'female' ? 'selected' : ''}>Female</option>
      </select>
    </div>
    <div>
      <label>Mobile:</label>
      <input type="text" id="mobile" value="${patient.mobile}" required>
    </div>
    <div>
      <label>Email:</label>
      <input type="email" id="email" value="${patient.email}" required>
    </div>
    <div>
      <label>Health Info:</label>
      <textarea id="healthInfo">${patient.healthInfo || ''}</textarea>
    </div>
    <div>
      <button type="button" id="saveChanges" style="margin: 5px; padding: 10px;">Save Changes</button>
      <button type="button" id="cancelChanges" style="margin: 5px; padding: 10px;">Cancel</button>
    </div>
  `;

  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.padding = '20px';
  modal.style.backgroundColor = '#fff';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  modal.style.borderRadius = '10px';
  modal.style.width = '400px';
  modal.appendChild(form);

  document.body.appendChild(modal);

  // Handle save changes
  form.querySelector('#saveChanges').addEventListener('click', () => {
    patient.firstName = document.getElementById('firstName').value;
    patient.lastName = document.getElementById('lastName').value;
    patient.dob = document.getElementById('dob').value;
    patient.height = parseInt(document.getElementById('height').value, 10);
    patient.weight = parseInt(document.getElementById('weight').value, 10);
    patient.sex = document.getElementById('sex').value;
    patient.mobile = document.getElementById('mobile').value;
    patient.email = document.getElementById('email').value;
    patient.healthInfo = document.getElementById('healthInfo').value;

    const patients = getPatients();
    const index = patients.findIndex(p => p.id === patient.id);
    if (index !== -1) {
      patients[index] = patient;
      savePatients(patients);
      displayPatients(); // Refresh the table
    }

    closeModal(modal); // Close the popup
  });

  // Handle cancel changes
  form.querySelector('#cancelChanges').addEventListener('click', () => {
    closeModal(modal);
  });
}

// Delete patient record
function deletePatient(patient) {
  const confirmation = confirm(`Are you sure you want to delete patient ${patient.firstName} ${patient.lastName}?`);
  if (confirmation) {
    const patients = getPatients();
    const updatedPatients = patients.filter(p => p.id !== patient.id);
    savePatients(updatedPatients);
    displayPatients(); // Refresh the table
  }
}

// Display patients in the table
function displayPatients(filteredPatients = getPatients()) {
  const tableBody = document.getElementById('patientData');
  tableBody.innerHTML = '';

  if (filteredPatients.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No records found</td></tr>';
    return;
  }

  filteredPatients.forEach(patient => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="clickable" style="color: #007bff; text-decoration: underline; cursor: pointer;">${patient.id}</td>
      <td>${patient.firstName}</td>
      <td>${patient.lastName}</td>
      <td>${formatDOB(patient.dob)}</td>
    `;

    row.querySelector('.clickable').addEventListener('click', () => showPatientActions(patient));
    tableBody.appendChild(row);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => displayPatients());











