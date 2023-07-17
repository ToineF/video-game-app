export default function tagsData() {
  const tags = `Singleplayer/Mutliplayer/RPG/Co-op/Open World/First-Person/2D/Third Person/Sci-fi/Horror/FPS/Fantasy/Funny/Gore/Difficult/Classic/Exploration/Sandbox/Female Protagonist/Survival/Comedy/Violent/Slealth/Action RPG/Pixel Graphics/Tactical/Third-Person Shooter/Action-Adventure/Retro/Dark/Anime/Space/Zombies/Point & Click/PvP/Nudity/Hack and Slash/War/Turn-Based/Post-apocalytpic/Survival Horror/Family Friendly/Short/Cute/Mystery/Mature/Side Scroller/Historical/Physics/Crafting/Dark Fantasy/Futuristic/Team-Based/Cinematic/Colorful/Realistic/Isometric/Roguelike/Aliens/Fast-Paced/RTS/Medieval/VR/Military/Turn-Based Strategy/Parkour /Competitive/Golf/JRPG/Metroidvania/Football/Visual Novel`;
  const tagsArray = tags.split("/").sort((a, b) => a > b);
  return tagsArray;
}
