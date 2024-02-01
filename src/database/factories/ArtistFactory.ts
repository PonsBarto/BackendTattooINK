import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Artists } from "../../models/Artist";

export class ArtistFactory extends BaseFactory<Artists> {
  protected generateSpecifics(artist: Artists): Artists {
    (artist.portfolio = faker.image.urlLoremFlickr()),
      faker.image.urlLoremFlickr(),
      faker.image.urlLoremFlickr(); // 'https://loremflickr.com/640/480?lock=1234']

    return artist;
  }
}
