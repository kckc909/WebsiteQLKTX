import model from '../models/auth.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

class Controller_Auth {

    login(req, res) {
        let user = req.body;

        model.login(user, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                if (result && result.length > 0) {
                    const userFound = result[0]

                    if (userFound.mat_khau === user.password) {
                        const token = jwt.sign(
                            {
                                id_tb_nguoi_dung: userFound.id_tb_nguoi_dung,
                                quyen: userFound.quyen
                            },
                            SECRET_KEY
                        );
                        res.send(
                            {
                                token: token,
                                info: jwt.verify(token, SECRET_KEY)
                            });
                        return
                    }

                    bcrypt.compare(user.password, userFound.mat_khau, (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        } else if (!result) {
                            res.status(401).send({ message: 'Invalid username or password', status: false });
                        } else {
                            const token = jwt.sign(
                                {
                                    id_tb_nguoi_dung: userFound.id_tb_nguoi_dung,
                                    quyen: userFound.quyen
                                },
                                SECRET_KEY
                            );
                            res.send(
                                {
                                    token: token,
                                    info: jwt.verify(token, SECRET_KEY)
                                });
                        }
                    })
                } else {
                    res.status(401).send({ message: 'Invalid username or password', status: false });
                }
            }
        });
    }
}

export default new Controller_Auth();