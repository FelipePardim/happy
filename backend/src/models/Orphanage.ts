import { Entity, Column, PrimaryGeneratedColumn, 
    OneToMany, JoinColumn, BeforeInsert, ManyToOne } from 'typeorm';
import Image from './Image';
import User from './User';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @Column()
    approved: boolean;

    @Column("int")
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'creator_id' })
    user: User;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update' ]
    })
    
    @JoinColumn({ name: 'orphanage_id'})
    images: Image[];

    @BeforeInsert()
    setAprrovedFalse() {
        this.approved = false;
    }
}