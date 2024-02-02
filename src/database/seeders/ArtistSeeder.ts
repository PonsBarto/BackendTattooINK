import { AppDataSource } from "../data-source";
import { ArtistFactory } from "../factories/ArtistFactory";
import { Artists } from "../../models/Artist";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";
import { Admin } from "typeorm";

export const artistSeeder = async () => {
  try {
    await AppDataSource.initialize();

    const count = 10;

    await seedArtistsWithUser(count);

    console.log("Seeding artist successfully completed");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await AppDataSource.destroy();
  }
};

export const seedArtistsWithUser = async (count: number) => {
  const artistRepository = AppDataSource.getRepository(Artists);
  const artistFactory = new ArtistFactory(artistRepository);

  const users = await seedUsersWithRoles({
    roles: [UserRoles.ADMIN],
    count: count,
  });

  const artist = artistFactory.createMany(count);

  artist.forEach((artist, index) => {
    artist.users = users[index];
  });

  await artistRepository.save(artist);

  return artist;
};
