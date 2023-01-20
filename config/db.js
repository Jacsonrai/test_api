const mongoose=require('mongoose')

const db={
    connection(){
        mongoose.connect('mongodb+srv://admin:admin@cluster0.bb09zuv.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          
          // Handle connection events
          mongoose.connection.on('connected', () => {
            console.log('Mongoose connection opened');
          });
          
          mongoose.connection.on('error', err => {
            console.log(`Mongoose connection error: ${err}`);
          });
          
          mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection closed');
          });
    }
}
module.exports=db