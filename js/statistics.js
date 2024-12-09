// Validate the patient's data
export function validatePatient(patient) {
    if (!validateName(patient.firstName, 2, 12)) return 'Invalid First Name.';
    if (!validateName(patient.lastName, 2, 20, true)) return 'Invalid Last Name.';
    if (!validateDateOfBirth(patient.dob)) return 'Invalid Date of Birth.';
    if (!validateRange(patient.height, 30, 200)) return 'Invalid Height.';
    if (!validateRange(patient.weight, 1, 200)) return 'Invalid Weight.';
    if (!validateMobile(patient.mobile)) return 'Invalid Mobile Number.';
    if (!validateEmail(patient.email)) return 'Invalid Email Address.';
    return null;
  }
  
  // Name Validation
  function validateName(name, minLength, maxLength, allowSpecial = false) {
    const nameRegex = allowSpecial
      ? /^[a-zA-Z]+(-?[a-zA-Z]+)?('|''[a-zA-Z]+)?$/
      : /^[a-zA-Z]+$/;
    return name && name.length >= minLength && name.length <= maxLength && nameRegex.test(name);
  }
  
  // Date of Birth Validation
  function validateDateOfBirth(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = calculateAge(dob);
    return age >= 0 && age <= 120 && birthDate <= today;
  }
  
  // Range Validation
  function validateRange(value, min, max) {
    return value >= min && value <= max;
  }
  
  // Mobile Number Validation
  function validateMobile(mobile) {
    const mobileRegex = /^07\d{9}$/;
    return mobileRegex.test(mobile);
  }
  
  // Email Validation
  function validateEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }
  
  // Calculate Age
  export function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
  }
  
  // Determine BMI Category
  export function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }