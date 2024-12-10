export function validatePatient(patient) {
  if (!patient.firstName || !patient.lastName) return 'Name is required.';
  if (!patient.dob) return 'Date of Birth is required.';
  if (isNaN(patient.height) || patient.height <= 0) return 'Invalid height.';
  if (isNaN(patient.weight) || patient.weight <= 0) return 'Invalid weight.';
  if (!patient.mobile) return 'Mobile number is required.';
  if (!patient.email.includes('@')) return 'Invalid email.';
  return null;
}
