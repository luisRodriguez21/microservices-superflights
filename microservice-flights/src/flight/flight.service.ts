import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';

export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  createFlight(flightDTO: FlightDTO) {
    const newFlight = new this.model(flightDTO);
    return newFlight.save();
  }

  getFlightsAll(): Promise<IFlight[]> {
    return this.model.find().populate('passengers');
  }

  getFlightById(id: string): Promise<IFlight> {
    return this.model.findById(id).populate('passengers');
  }

  async updateFligh(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

  async deleteFlight(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Flight deleted successfully' };
  }

  async assginPassengerToFlight(
    flightId: string,
    passengerId: string,
  ): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
