import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import user_view from '../views/user_view';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

require("dotenv");

import User from '../models/User';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default {
    // Functions to get,create,softdelete
    async index(_req: Request, res: Response) {
        const userRepository = getRepository(User);

        const users = await userRepository.find();

        // Commented renderMany because this returned the user admin and password
        // Implemented safeRender
        // return res.json(user_view.renderMany(users));
        return res.json(user_view.safeRenderMany(users));
        // return res.send({ userId: req.userId });
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const userRepository = getRepository(User);

        const user = await userRepository.findOneOrFail(id);

        // Commented render because this returned the user admin and password
        // Implemented safeRender
        // Maybe the delete function can resolve this
        // return res.json(user_view.render(user));
        return res.json(user_view.safeRender(user));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            password,
        } = req.body;

        // Setting the default user profile to admin false
        const is_admin = false;

        // Verify if user email is already in database

        const userRepository = getRepository(User);
        let userExists = await userRepository.findOne({ where: { email: email } });

        if (userExists) {
            return res.status(409).json("Email is already used");
        }

        const data = {
            name,
            email,
            password,
            is_admin: is_admin,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
            is_admin: Yup.boolean().required(),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const user = userRepository.create(data);

        await userRepository.save(user);

        return res.status(201).json(user);
    },

    async update(req: Request, res: Response) {
        const { authorization } = req.headers;
        const { name } = req.body;

        if (!authorization) {
            return res.status(401);
        }

        try {     
            const userRepository = getRepository(User);
            let userExists = await userRepository.findOne({ where: { id: req.userId } });

            if (!userExists) {
                return res.status(404).json("User not found");
            }

            const data = {
                name
            }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            userExists.name = name;
            await userRepository.save(userExists);

            const newName = userExists.name;

            return res.status(201).json(newName);

        } catch {
            return res.status(401);
        }
    }
}