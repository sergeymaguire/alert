const numberInput = document.getElementById('number'),
      textInput = document.getElementById('msg'),
      scheduleSelect = document.getElementById('schedule'),
      button = document.getElementById('button'),
      response = document.querySelector('.response');

button.addEventListener('click', send, false);

function send() {
  const number = numberInput.value.replace(/\D/g, '');
  const text = textInput.value;
  const time = parseInt(scheduleSelect.value, 10);
  getTimeSchedule({ number, text, time });
}


const socket = io();

const getTimeSchedule = getTime();

const fetchServer = ({ number, text }) => {
  console.log('send');
  fetch('/', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ number, text })
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};

function getTime() {
  let timeOut;
  const getTimeSchedule = ({ time, number, text }) => {
    if (timeOut)
      clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      fetchServer({ number, text });
    }, time * 60 * 1000);
  };
  return getTimeSchedule;
}


