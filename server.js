const axios = require('axios');

const apiUrl = 'http://20.244.56.144/train'; // Replace with your API base URL
const companyName = 'Train Central';
const ownerName = 'Ram';
const rollNo = '1';
const ownerEmail = 'ram@abc.edu';
const accessCode = 'FKDLjg';
const clientID = 'b46128a0-fbde-4c16-a4b1-6ae6ad718e27';
const clientSecret = 'XOyolORPayKBODAN';

async function registerCompany() {
  try {
    const response = await axios.post(`${apiUrl}/register`, {
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      accessCode,
    });

    console.log('Company Registration Response:', response.data);
  } catch (error) {
    console.error('Company Registration Error:', error.message);
  }
}

async function getAuthToken() {
  try {
    const response = await axios.post(`${apiUrl}/auth`, {
      companyName,
      clientID,
      ownerName,
      ownerEmail,
      rollNo,
      clientSecret,
    });

    const authToken = response.data.access_token;
    console.log('Authorization Token:', authToken);
    return authToken;
  } catch (error) {
    console.error('Authorization Error:', error.message);
  }
}

async function fetchTrainDetails(authToken) {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axios.get(`${apiUrl}/trains`, { headers });
    const trainData = response.data;
    console.log('Train Details:', trainData);
  } catch (error) {
    console.error('Fetch Train Details Error:', error.message);
  }
}

async function main() {
  await registerCompany(); // Register your company (only once)
  const authToken = await getAuthToken(); // Obtain an authorization token
  await fetchTrainDetails(authToken); // Fetch train details using the token
}

main();
const axios = require('axios');

// Define the request data
const requestData = {
  companyName: 'Train Central',
  ownerName: 'Ram',
  rollNo: '1',
  ownerEmail: 'ram@abc.edu',
  accessCode: 'FKDje',
};

// Make a POST request to register the company
axios.post('http://20.244.56.144/train/register', requestData)
  .then((response) => {
    if (response.status === 200) {
      const responseData = response.data;
      console.log('Registration successful. Here are your credentials:');
      console.log(`Company Name: ${responseData.companyName}`);
      console.log(`Client ID: ${responseData.clientID}`);
      console.log(`Client Secret: ${responseData.clientSecret}`);
    } else {
      console.error('Registration failed with status code:', response.status);
    }
  })
  .catch((error) => {
    console.error('Error occurred during registration:', error.message);
  });
