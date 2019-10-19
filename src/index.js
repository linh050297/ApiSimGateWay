const db = require('./models');
const { app } = require('./server');
const Port = process.env.PORT || 8087;

db.sequelize.sync().then(function(){
    app.listen(Port, (err) => {
        if (!err)
            console.log(`Server started on PORT ${Port}.`);
        else console.log(err);
    });
});

// app.listen(Port, (err) => {
//     if (!err)
//         console.log(`Server started on PORT ${Port}.`);
//     else console.log(err);
// });
