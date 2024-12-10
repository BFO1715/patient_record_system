export function validatePatient(patient) {
  // Validate First Name
  const firstNameRegex = /^[A-Za-z]{2,12}$/;
  if (!firstNameRegex.test(patient.firstName)) {
    return 'First name must be 2-12 letters long, with no digits or special characters.';
  }

  // Validate Last Name
  const lastNameRegex = /^[A-Za-z](?!.*'{2})(?!.*--)[A-Za-z'-]{1,18}[A-Za-z]$/;
  const singleQuoteCount = (patient.lastName.match(/'/g) || []).length;
  const hyphenCount = (patient.lastName.match(/-/g) || []).length;
  if (!lastNameRegex.test(patient.lastName) || singleQuoteCount > 2 || hyphenCount > 1) {
    return "Last name must be 2-20 characters long, contain no digits, and may include at most one hyphen and/or two single quotes, neither as the first nor last character.";
  }

  // Validate Date of Birth
  const dob = new Date(patient.dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dob.getFullYear();
  const monthDifference = currentDate.getMonth() - dob.getMonth();
  const dayDifference = currentDate.getDate() - dob.getDate();
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  if (isNaN(dob.getTime()) || age < 0 || age > 120) {
    return 'Date of birth must result in a valid age between 0 and 120 years.';
  }

  // Validate Height
  if (isNaN(patient.height) || patient.height < 30 || patient.height > 200) {
    return 'Height must be between 30 cm and 200 cm.';
  }

  // Validate Weight
  if (isNaN(patient.weight) || patient.weight < 1 || patient.weight > 200) {
    return 'Weight must be between 1 kg and 200 kg.';
  }

  // Validate Mobile Number
  const mobileRegex = /^07\d{9}$/;
  if (!mobileRegex.test(patient.mobile)) {
    return 'Mobile number must contain 11 digits and begin with 07.';
  }

  // Validate Email Address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(patient.email)) {
    return 'Invalid email address.';
  }

  // All validations passed
  return null;
}

