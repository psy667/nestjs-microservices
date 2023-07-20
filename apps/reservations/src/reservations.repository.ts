import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationDocument } from './models/reservation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name)
    private readonly reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
