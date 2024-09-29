import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('user_events')
export class UserEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'unique_id', unique: true })
    uniqueId: string;

    @Column({ name: 'ip_address', nullable: true })
    ipAddress: string;

    @Column({ name: 'user_agent', nullable: true })
    userAgent: string;

    @Column({ name: 'fbclid', nullable: true })
    fbclid: string;

    @Column({ name: 'fbp', nullable: true })
    fbp: string;

    @Column({ name: 'eventTime', nullable: true })
    eventTime: string;

    @Column({ name: 'city', nullable: true })
    city: string;

    @Column({ name: 'country_code', nullable: true })
    countryCode: string;

    @Column({ name: 'zip_code', nullable: true })
    zipCode: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'createdat',
    })
    createdAt: string;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
        name: 'updatedat',
    })
    public updatedAt: Date;
}
