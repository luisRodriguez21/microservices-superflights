import { Controller } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMSG } from '../common/constants';

@Controller()
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @MessagePattern(PassengerMSG.CREATE)
  create(@Payload() passengerDTO: PassengerDTO) {
    return this.passengerService.createPassenger(passengerDTO);
  }

  @MessagePattern(PassengerMSG.FIND_ALL)
  getAllPassengers() {
    return this.passengerService.getAllPassengers();
  }

  @MessagePattern(PassengerMSG.FIND_ONE)
  getPassengerById(@Payload() id: string) {
    return this.passengerService.getPassengerById(id);
  }

  @MessagePattern(PassengerMSG.UPDATE)
  updatePassenger(@Payload() payload: any) {
    return this.passengerService.updatePassenger(
      payload.id,
      payload.passengerDTO,
    );
  }

  @MessagePattern(PassengerMSG.DELETE)
  deletePassenger(@Payload() id: string) {
    return this.passengerService.deletePassenger(id);
  }
}
