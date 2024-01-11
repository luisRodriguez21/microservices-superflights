import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { Observable } from 'rxjs';
import { FLightMSG, PassengerMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly cientProxy: ClientProxySuperFlights) {}
  private _clientProxyFlights = this.cientProxy.clientProxyFlights();
  private _clientProxyPassengers = this.cientProxy.clientProxyPassengers();

  @Post()
  create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
    return this._clientProxyFlights.send(FLightMSG.CREATE, flightDTO);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlights.send(FLightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlights.send(FLightMSG.FIND_ONE, id);
  }

  @Put(':id')
  edit(
    @Param('id') id: string,
    @Body() flightDTO: FlightDTO,
  ): Observable<IFlight> {
    return this._clientProxyFlights.send(FLightMSG.FIND_ONE, {
      id,
      flightDTO,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlights.send(FLightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    console.log('flightId: ', flightId);
    console.log('passengerId: ', passengerId);

    const passenger = await this._clientProxyPassengers
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise();
    console.log('passenger: ', passenger);

    if (!passenger)
      throw new HttpException('Passenger does not exist', HttpStatus.NOT_FOUND);

    return this._clientProxyFlights.send(FLightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
