import mysql from "mysql";
const connected = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_document"
});

connected.connect((err) => {
    if (err) console.log(`Faild Connect Database`, err);
    console.log(`Connected Database`);
})
export default connected;