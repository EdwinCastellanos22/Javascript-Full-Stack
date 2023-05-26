const { Router } = require("express");
const { db, pool, bcrypt }= require("../database/db")

const storage = require("../utils/storage");
const multer = require("multer");

const router = Router();
const upload = multer({storage});

router.get("/api", async (req, res) => {
  try {
    const users = await db.any("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error al obtener usuarios" });
  }
});

router.post("/api", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const values = [username, email, passwordHash];
    const query =
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3)";
    await pool.query(query, values);
    res.status(201).json({ message: "usuario creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.get("/user", async (req, res) => {
    const { username, password }= req.body

    try{
        const query = "SELECT password FROM users WHERE username=$1"
        const result = await pool.query(query, [username])

        if (result.rows.length === 0){
            res.status(404).json({"messaje":"usuario no encontrado"})
            return
        }

        
        const hashPassword= result.rows[0].password;
        console.log(hashPassword, password);
        const passwordMatch= await bcrypt.compare(password, hashPassword);

        if (passwordMatch){
            res.status(200).json({"message":"inicio de sesion exitoso"})
        }
        else{
            res.status(401).json({"message":"credenciales invalidas"})
        }
    }
    catch (error){
        console.log("error",error);
        res.status(500).json({"message":"error al iniciar sesion"});
    }
})

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({"Message":"Image Upload!!"});
})

module.exports = router;
