import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private snakebar: MatSnackBar) { }

  log(msg: any) {
    if (!environment.production) {
      console.log(msg);
    }
  }

  notify(msg: string) {
    this.snakebar.open(msg, 'ok', { duration: 4000 });
  }

}
