import { PrismaClient } from '@prisma/client';

export async function location(prisma: PrismaClient) {
  await prisma.$queryRaw`DELETE from location`;
  await prisma.$queryRaw`
    INSERT INTO location (id, user_id, name, coordinates, is_selected) VALUES 
    (1, 1, 'İskele', ST_MakePoint(27.52266281203532, 40.97404481118768), true), 
    (2, 1, 'İzmir', ST_MakePoint(27.13964143473462, 38.43389805430853), false), 
    (3, 1, 'Ankara', ST_MakePoint(32.8545049222855, 39.91972255563965), false), 
    (4, 2, 'Ankara', ST_MakePoint(32.863583, 39.921633), true), 
    (5, 2, 'Rakoçzi Müzesi', ST_MakePoint(27.510051853211717, 40.97400651552194), false), 
    (6, 2, 'Tekira', ST_MakePoint(27.503774216394596, 40.97763230767281), false),
    (7, 3, 'Nusratlı', ST_MakePoint(27.441427840521293, 40.95312954570596), true), 
    (8, 3, 'Perşembe Pazarı', ST_MakePoint(27.503875286717655, 40.976654713719626), false)
  `;
  await prisma.$queryRaw`SELECT setval(pg_get_serial_sequence('location', 'id'), coalesce(max(id)+1, 1), false) FROM location;`;
  // await prisma.$queryRaw`SELECT setval('location_id_seq', (SELECT max(id) FROM location))`;
}
