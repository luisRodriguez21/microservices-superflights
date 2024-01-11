import { HttpStatus, Injectable } from '@nestjs/common';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassengerDTO } from './dto/passenger.dto';
import { PASSENGER } from 'src/common/models/models';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async createPassenger(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newUser = new this.model(passengerDTO);

    return await newUser.save();
  }

  async getAllPassengers(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async getPassengerById(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async updatePassenger(
    id: string,
    passengerDTO: PassengerDTO,
  ): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
  }

  async deletePassenger(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Passenger deleted successfully' };
  }
}
