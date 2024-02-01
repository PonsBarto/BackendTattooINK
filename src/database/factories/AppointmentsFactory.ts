import { faker } from "@faker-js/faker";
import { Appointment } from "../../models/Appointment";
import { BaseFactory } from "./BaseFactory";

export class AppointmentFactory extends BaseFactory<Appointment> {
  protected generateSpecifics(appointment: Appointment): Appointment {
    appointment.hour = faker.string.alpha();
    return appointment;
  }
}
