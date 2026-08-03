// Centralised, optimised Pexels image URLs.
const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const media = {
  // Portraits
  heroPortrait: px(17007128, 1100, 1400),
  pearlPortrait: px(33466154, 1000, 1250),
  flawlessPortrait: px(10176348, 1100, 1400),
  mirrorFace: px(15783145, 900, 1200),

  // Interiors
  salonInterior: px(13068379, 1400, 950),
  reception: px(7195809, 1200, 820),

  // Services
  browDesign: px(5178001, 900, 1150),
  microblading: px(8826403, 1200, 850),
  facial: px(3985329, 1200, 820),
  facial2: px(3985323, 1200, 820),
  tattoo: px(34155039, 900, 1150),
  tattooArtist: px(12509430, 1200, 850),

  // Avatars
  avatar1: px(35367077, 240, 240),
  avatar2: px(10960202, 240, 240),
  avatar3: px(38366748, 240, 240),
  avatar4: px(590479, 240, 240),
  avatar5: px(10426587, 240, 240),
  avatar6: px(28280965, 240, 240),
};

export const avatars = [
  media.avatar1,
  media.avatar2,
  media.avatar3,
  media.avatar4,
  media.avatar5,
  media.avatar6,
];
