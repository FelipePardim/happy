import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import Orphanage from './Orphanage';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    @Column()
    is_admin: boolean;

    @OneToMany(() => Orphanage, orphanage => orphanage.user, {
        cascade: ['insert', 'update' ]
    })
    @JoinColumn({ name: 'creator_id'})
    orphanages: Orphanage[];

    // User profile picture
    // @OneToMany(() => Image, image => image.orphanage, {
    //     cascade: ['insert', 'update' ]
    // })
}