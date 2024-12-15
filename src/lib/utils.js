import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const avatarFullName = (fullName) => {
  if(!fullName.includes(' ')) {
    return fullName[0];
  }
  // Split the name by spaces
  const words = fullName.split(' ');

  // Get the first character of the first word
  const firstChar = words[0][0];

  // Get the first character of the last word
  const lastChar = words[words.length - 1][0];

  // Concatenate the characters and return
  return firstChar + lastChar;
}
