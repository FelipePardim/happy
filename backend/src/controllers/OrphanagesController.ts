import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';

export default {
    async index(req: Request, res: Response) {
        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({
            relations: ['images']
        });

        return res.json(orphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;

        const orphanageRepository = getRepository(Orphanage);

        const reqImages = req.files as Express.Multer.File[];
        const images = reqImages.map(image => {
            return { path: image.filename }
        });

        const creator_id: any = req.userId;

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            user: creator_id,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            user: Yup.number().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            // abortEarly can be turned False
            abortEarly: false
        });

        const orphanage = orphanageRepository.create(data);

        await orphanageRepository.save(orphanage);

        return res.status(201).json(orphanage);
    },

    async update(req: Request, res: Response) {
        const { authorization } = req.headers;
        const {
            orphanage_id,
            name,
            about,
            latitude,
            longitude,
            instructions,
            opening_hours,
            open_on_weekends
            // images
        } = req.body;

        if (!authorization) {
            return res.status(401);
        }

        try {
            const orphanageRepository = getRepository(Orphanage);
            let orphanageExists = await orphanageRepository.findOne({ where: { id: orphanage_id } });

            if (!orphanageExists) {
                return res.status(404).json("Orphanage not found.");
            }

            if (req.userId != orphanageExists.user) {
                return res.status(403).json("You dont have permission.");
            }

            const data = {
                name,
                about,
                latitude,
                longitude,
                instructions,
                opening_hours,
                open_on_weekends
            }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                about: Yup.string().required().max(300),
                latitude: Yup.number().required(),
                longitude: Yup.number().required(),
                instructions: Yup.string().required(),
                opening_hours: Yup.string().required(),
                open_on_weekends: Yup.boolean().required()
            });

            await schema.validate(data, {
                abortEarly: false
            });

            //Updating orphanage
            orphanageExists.name = name;
            orphanageExists.about = about;
            orphanageExists.latitude = latitude;
            orphanageExists.longitude = longitude;
            orphanageExists.instructions = instructions;
            orphanageExists.opening_hours = opening_hours;
            orphanageExists.open_on_weekends = open_on_weekends;

            await orphanageRepository.save(orphanageExists);

            return res.status(200).json(orphanageExists);

        } catch {
            return res.status(400);
        }
    },

    async adminUpdate(req: Request, res: Response ) {

    }
}