const mongoose = require("mongoose");

// mongoose
//   .connect(`mongodb://localhost:27017/omegly`)
//   .then(() => console.log("Mongodb conencted"))
//   .catch((err) => console.log(err));

mongoose
  .connect(
    `mongodb+srv://test:admin@omegly-c1.e7zdj.mongodb.net/?retryWrites=true&w=majority&appName=Omegly-C1/omegly`
  )
  .then(() => console.log("Mongodb conencted"))
  .catch((err) => console.log(err));
