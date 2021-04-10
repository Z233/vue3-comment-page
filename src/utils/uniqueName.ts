import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';

const config: Config = {
  dictionaries: [adjectives, animals],
  separator: ' ',
  style: 'capital'
}

export default function getRandomName() {
   return uniqueNamesGenerator(config);
}