require('dotenv').config();

const mongoose = require('mongoose');
const axios = require('axios');
const Client = require('../models/Client');
const Policy = require('../models/Policy');

const data = {
  clients: [],
  policies: [],
};

(async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    // console.log('TCL: connection', connection);
    // console.log(
    //   `Connected to Mongo! Database name: "${connection.connections[0].db.s.databaseName}"`,
    // );
    console.log(
      `Connected to Mongo! Database name: "${connection.connections[0].name}"`,
    );
    // connection.connections[0].db.dropDatabase();
    //  Fetch DATA CLIENTS
    (async () => {
      try {
        const response = await axios.get(
          'http://www.mocky.io/v2/5808862710000087232b75ac',
        );
        // console.log(response);
        data.clients = response.data.clients;
        // console.log('TCL: data', data);
        Client.create(data.clients)
          .then(client => {
            console.log('inserted clients ', client);
            mongoose.connection.close();
          })
          .catch(err => {
            console.log(err);
            mongoose.connection.close();
          });
      } catch (error) {
        console.error(error);
      }
    })();
    (async () => {
      try {
        const response = await axios.get(
          'http://www.mocky.io/v2/580891a4100000e8242b75c5',
        );
        // console.log(response);
        data.policies = response.data.policies;
        // console.log('TCL: data', data);
        Policy.create(data.policies)
          .then(policy => {
            console.log('inserted policies ', policy);
            mongoose.connection.close();
          })
          .catch(err => {
            console.log(err);
            mongoose.connection.close();
          });
      } catch (error) {
        console.error(error);
      }
    })();
  } catch (err) {
    console.log('Error connecting to Mongo database.', err);
  }
})();

//  Fetch DATA CLIENTS
// (async () => {
//   try {
//     const response = await axios.get(
//       'http://www.mocky.io/v2/5808862710000087232b75ac',
//     );
//     // console.log(response);
//     data.clients = response.data.clients;
//     // console.log('TCL: data', data);
//   } catch (error) {
//     console.error(error);
//   }
// })();

//  Fetch DATA POLICIES
// (async () => {
//   try {
//     const response = await axios.get(
//       'http://www.mocky.io/v2/580891a4100000e8242b75c5',
//     );
//     // console.log(response);
//     data.policies = response.data.policies;
//     console.log('TCL: data', data);
//   } catch (error) {
//     console.error(error);
//   }
// })();

// Client.create(data.clients)
//   .then(client => {
//     console.log('inserted event ', client);
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.log(err);
//     mongoose.connection.close();
//   });

// axios
//   .get('http://www.mocky.io/v2/5808862710000087232b75ac')
//   .then(clients => (data.clients = clients.data.clients))
//   .catch(err => console.log(err));
