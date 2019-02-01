const numberInput = document.getElementById('number'),
      textInput = document.getElementById('msg'),
      scheduleSelect = document.getElementById('schedule'),
      button = document.getElementById('button'),
      response = document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
socket.on('smsStatus', function(data){
  if(data.error){
    response.innerHTML = '<h5>Text message sent to ' + data.error + '</h5>';
  }else{
    response.innerHTML = '<h5>Text message sent to ' + data.number + '</h5>';
  }
});

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


function send() {
  const number = numberInput.value.replace(/\D/g, '');
  const text = textInput.value;
  getTimeSchedule({ number, text });
}

const getTimeSchedule = getTime();

const newLocal = ({ number, text }) => {
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
const fetchServer = newLocal;





