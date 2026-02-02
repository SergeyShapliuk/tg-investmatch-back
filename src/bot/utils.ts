import fs from 'fs/promises';
import path from 'path';

export const checkFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const getFileSize = async (filePath: string): Promise<number> => {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
};

export const isAllowedImage = (filePath: string): boolean => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(filePath).toLowerCase();
  return allowedExtensions.includes(ext);
};

export const maskToken = (token: string): string => {
  if (token.length <= 8) return '***';
  return `${token.substring(0, 4)}...${token.substring(token.length - 4)}`;
};
