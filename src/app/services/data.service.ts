import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { withCache } from '@ngneat/cashew';

import alasql from 'alasql';
import { HashService } from './hash.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  alasql = alasql;

  baseURL = '/assets/data.json';
  // 'https://script.google.com/macros/s/AKfycbzHm3AysJY-Yur8xt_rAqUcdkZ6KyrPnFJTqNV8WhuvD5J4FOrGeslq77qlAykiwFYU/exec';

  // prettier-ignore
  constructor(
    private http: HttpClient,
    private hashService: HashService
  ) {}

  getData(): Observable<any> {
    return this.http.get(this.baseURL, {
      context: withCache({
        version: 'v1',
        key: 'api',
      }),
    });
  }

  getStudentOptions() {
    return this.getData().pipe(
      map((data) => {
        return alasql('SELECT [0] FROM ?', [data]).map((obj: any) => {
          const fakultet = {
            name: obj[0],
            link: this.hashService.crypt(obj[0]),
            kafedry: {},
          };

          fakultet.kafedry = alasql(`SELECT [0] FROM ? GROUP BY [0]`, [
            data[fakultet.name],
          ]).map((obj: any) => {
            const kafedra = {
              name: obj[0],
              link: this.hashService.crypt(obj[0]),
              kursy: {},
            };

            kafedra.kursy = alasql(
              `SELECT [1] FROM ? WHERE [0] = '${kafedra.name}' GROUP BY [1]`,
              [data[fakultet.name]]
            ).map((obj: any) => {
              const kurs = {
                name: obj[1],
                grupy: {},
              };

              const grupy = alasql(
                `SELECT [2] FROM ? WHERE [0] = '${kafedra.name}' AND [1] = ${kurs.name} GROUP BY [2]`,
                [data[fakultet.name]]
              ).map((obj: any) => {
                return {
                  name: obj[2],
                };
              });

              kurs.grupy = grupy;

              return kurs;
            });

            return kafedra;
          });

          return fakultet;
        });
      })
    );
  }

  getStudentRozklad(student: any) {
    return this.getData().pipe(
      map((data) => {
        return alasql(
          `SELECT
          [0] as kafedra,
          [1] as kurs,
          [2] as grupa,
          [3] as den,
          [4] as para,
          [5] as predmet,
          [6] as vykladach,
          [7] as audytoriya
          FROM ? WHERE [0]='${student.kafedra}' AND [2]=${student.grupa} `,
          [data[student.fakultet]]
        ).reduce((result: [any], item: any) => {
          if (typeof result[item.den] == 'undefined') {
            result[item.den] = {
              name: item.den,
              pary: [],
            };
          }
          result[item.den].pary.push(item);
          return result;
        }, []);
      })
    );
  }
}
