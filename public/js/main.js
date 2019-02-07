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

let timeOut;
 function  getTimeSchedule ({ time, number, text }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetchServer({ number, text })
        resolve();
    }, 3000);
  })
  // if(timeOut) clearTimeout(timeOut);
  // timeOut = setTimeout(() => {
  //  fetchServer({ number, text });
  // }, time * 60 * 1000);
};

async function fetchServer  ({ number, text })  {
  console.log('send');
  return fetch('/', {
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
//17608070119,14422579385,17608072025
async function send() {
  // const number = numberInput.value.replace(/\D/g, '');
   const text = textInput.value;
   const time = parseInt(scheduleSelect.value, 10);

  var phoneArray = getPhoneArray(numberInput.value);
  console.log("phone array " + phoneArray);
  for(i=0; i < phoneArray.length; i++) {
    number = phoneArray[i];
    //await  fetchServer({ number, text });
    await getTimeSchedule({ number, text, time });
  }
}

function getPhoneArray (phones) {
  if(!phones || !phones.trim().length) {
    return [];
  }
  var phoneArray = phones.split(",");
  for(i=0; i < phoneArray.length; i++) {
    const number = phoneArray[i].replace(/\D/g, '');
    phoneArray[i] = number;

  }
  return phoneArray;
}