import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = {
  dictionaries: [names],
  separator: ' ',
  style: 'capital'
}

export default function getRandomName() {
   return uniqueNamesGenerator(config);
}