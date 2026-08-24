const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    formData = { ...formData, ...JSON.parse(savedData) };
  } catch (error) {
    console.error('Пошкоджені дані у localStorage:', error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

formEl.elements.email.value = formData.email;
formEl.elements.message.value = formData.message;

formEl.addEventListener('input', event => {
  const { name, value } = event.target;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

formEl.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  formEl.reset();
});
