import { useMemo } from 'react'

export function useTruncate(str: string, maxLength: number, separator = '...') {
  return useMemo(() => {
    if (str.length <= maxLength) {
      return str;
    }
    
    const separatorLength = separator.length;
    const charsToShow = maxLength - separatorLength;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
  
    return (
      str.substring(0, frontChars) +
      separator +
      str.substring(str.length - backChars)
    );
  }, [str, maxLength, separator])
}
