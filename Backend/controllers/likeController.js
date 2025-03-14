const pool = require('../config/db');

exports.like = async (req, res) => {
  try {
    const { userid, imageid } = req.body;
    // // Shu user tomonidan aynan shu photo uchun like bosilganmi?
    const likes = await pool.query(
      `SELECT * FROM likes WHERE userId = ${userid} and imageid = ${imageid}`
    );
    // // Agar like bosilgan bo'lsa, o'chirib tashlaymiz
    if(likes.rows.length > 0) {
      const deleteLike = await pool.query(
        `DELETE FROM likes WHERE userId = ${userid} and imageid = ${imageid}`
      );
      return res.status(200).json({message: "Like o'chirildi", liked: false})
    }
    // Agar like bosilmagan bo'lsa, like yaratamiz
    const result = await pool.query(
      `INSERT INTO likes VALUES (${userid}, ${imageid}) returning *;`
    );
    res.status(201).json({message: "Like qilindi", liked: true});
  } catch (error) {
    console.log(error);
    res.status(500).send("Girigitton kodida nomaqbul hatolik mavjud");
  }
}

