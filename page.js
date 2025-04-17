//로컬스토리지 값이 있을때 실행
const seatForm = document.querySelector('#seat-form');
const userForm = document.querySelector('#user-form');

if (!localStorage.getItem('student-number')) {
  console.log('저장된 학번 없음');
  const student = document.querySelector('#student-number');

  student.value = localStorage.getItem('student-number');
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(123123);
    localStorage.setItem('student-number', student.value);
    userForm.classList.add('active');
    seatForm.classList.remove('active');
  });
} else {
  console.log('저장된 학번 존재');
  userForm.classList.add('active');
  seatForm.classList.remove('active');
}
