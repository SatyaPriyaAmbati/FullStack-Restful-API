function fetchWilliamData() {
    alert('Button clicked'); // Add alert message
    console.log('Fetching William\'s data...');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          console.log('Received data:', data);
          displayWilliamData(data);
        } else {
          console.error('Error:', xhr.statusText);
        }
      }
    };
    xhr.open('GET', '/customers?name=William', true);
    xhr.send();
  }
  
  function displayWilliamData(data) {
    console.log('Displaying William\'s data:', data);
    var customerData = document.getElementById('customerData');
    customerData.innerHTML = ''; // Clear previous data
    if (data) {
      var details = document.createElement('div');
      details.textContent = 'ID: ' + data.id + ', Address: ' + data.address;
      customerData.appendChild(details);
    } else {
      customerData.textContent = 'Customer not found';
    }
  }
  