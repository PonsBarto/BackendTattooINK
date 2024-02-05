import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Artists } from "../../models/Artist";

export class ArtistFactory extends BaseFactory<Artists> {
  protected generateSpecifics(artist: Artists): Artists {
    (artist.portfolio = faker.image.urlLoremFlickr()),
      faker.image.urlLoremFlickr(),
      faker.image.urlLoremFlickr();

    return artist;
  }
}
