const {Sequelize} = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const DBUSERNAME = process.env.DBUSERNAME;
const DBPASSWORD = process.env.DBPASSWORD;
const DBPORT = process.env.DBPORT;
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

const sequelize = new Sequelize(`postgres://${DBUSERNAME}:${DBPASSWORD}@${DBHOST}:${DBPORT}/${DBNAME}`);

(async() => {try{
    await db_connect.sequelize.authenticate();
}catch(error){
    console.log(`Unable to authenticate: ${error}`);
}
})

module.exports = {
    sequelize
}