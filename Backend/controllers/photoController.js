const pool = require('../config/db');

exports.getPhotos = async (req, res) => {
  try {
    const userId = req.query.id
    const result = await pool.query(`select images.id, images.filepath, users.firstname, count(imageid) as likeCount, 
      exists (select * from likes where userId = $1 and imageid = images.id) as isLiked from images
      left join likes on likes.imageid = images.id
      inner join users on images.userid = users.id
      group by images.id, users.id
      `, [userId]);
      
      const photos = result.rows.map(photo => {
        return {...photo, imageurl: `http://localhost:3030/${photo.filepath}`}
      })
      
      res.json(photos);
  } catch (error) {
    console.log(error);
  }
}

exports.myPhoto = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(`select firstname, filepath, images.id from users
                inner join images on users.id = images.userId
                where userId = ${id}`);
    
    const photos = result.rows.map(photo => {
      return {...photo, imageurl: `http://localhost:3030/${photo.filepath}`}
    })
    res.json(photos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Serverda xatolik')
  }
}

exports.addPhoto = async (req,res) => {
  try {
    // const id = req.params.id
    const {userId} = req.body
    
    const filepath = req.file.path
    await pool.query('insert into images (filepath, userid) values ($1,$2)', [filepath, userId])
    res.status(201).send({message: "Rasm muaffaqiyatli qo'shildi"})
  } catch (error) {
    console.log(error);
    res.status.send('Serverda xatolik')
  }
}

exports.deletPhoto = async (req, res) => {
  try {
    const id = req.params.id
    await pool.query(`DELETE FROM images WHERE images.id = $1`, [id])
    res.status(200).json({ message: "Rasm muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    if(error.name == "JsonWebTokenError"){
      return res.status(401).json({message: 'Token xato'})
    }
    console.log(error);
    res.status(500).send({message: "Serverda xatolik"})  
  }
}