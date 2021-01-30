import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

require("dotenv");

import User from '../models/User';

export default {
    async authenticate(req: Request, res: Response ) {
        const userRepository = getRepository(User);
        const { email, password } = req.body;

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json("User not found");
        }

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        });

        await schema.validate(user, {
            abortEarly: false
        });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json("Incorrect password");
        }

        const jwtSecret = process.env.JWT_SECRET;
        
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1d' });

        delete user.password;

        return res.json({
            user,
            token
        })
    }
}