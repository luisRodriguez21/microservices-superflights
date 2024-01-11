import { Controller } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FLightMSG } from '../common/constants';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FLightMSG.CREATE)
  createFlight(@Payload() flightDTO: FlightDTO) {
    return this.flightService.createFlight(flightDTO);
  }

  @MessagePattern(FLightMSG.FIND_ALL)
  getFlightsAll() {
    return this.flightService.getFlightsAll();
  }

  @MessagePattern(FLightMSG.FIND_ONE)
  getFlightById(@Payload() id: string) {
    return this.flightService.getFlightById(id);
  }

  @MessagePattern(FLightMSG.UPDATE)
  updateFligh(@Payload() payload: any) {
    return this.flightService.updateFligh(payload.id, payload.flightDTO);
  }

  @MessagePattern(FLightMSG.DELETE)
  deleteFlight(@Payload() id: string) {
    return this.flightService.deleteFlight(id);
  }

  @MessagePattern(FLightMSG.ADD_PASSENGER)
  addPassenger(@Payload() payload: any) {
    return this.flightService.assginPassengerToFlight(
      payload.flightId,
      payload.passengerId,
    );
  }
}
