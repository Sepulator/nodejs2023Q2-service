import { Collection } from 'src/data/data.service';

export const transformKey = (key: Collection) => {
  const letters = key.split('');
  letters[0] = letters[0].toUpperCase();
  letters.splice(letters.length - 1);
  return letters.join('');
};
