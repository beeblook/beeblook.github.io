import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HashService {
  constructor() {}

  getKursByGrupa(str: string) {
    return str.length == 2 ? str.charAt(1) : str;
  }

  getHash(str: string) {
    var hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  // prettier-ignore
  charTable() {
  return {"Й":"J","Ц":"C","У":"U","К":"K","Е":"E","Н":"N","Г":"G",
  "З":"Z","Х":"H","й":"j","ц":"ts","у":"u",
  "к":"k","е":"e","н":"n","г":"g","з":"z","х":"h","ъ":"'",
  "Ф":"F","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"X",
  "Э":"E","ф":"f","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d",
  "ж":"x","С":"S","М":"M","И":"I","Т":"T","Б":"B",
  "ч":"ch","с":"s","м":"m","и":"i","т":"t","б":"b"};
  }

  crypt(str: string) {
    const charTable: any = this.charTable();
    return str
      .split('')
      .map(function (char) {
        return charTable[char] || char;
      })
      .join('');
  }
  decrypt(str: string) {
    const charTable: any = Object.entries(this.charTable()).reduce(
      (accObj, chars) => {
        return { ...accObj, [chars[1]]: chars[0] };
      },
      {}
    );
    return str
      .split('')
      .map(function (char) {
        return charTable[char] || char;
      })
      .join('');
  }
}
