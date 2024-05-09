import { Injectable } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root'
})
export class NotiflixService {

  constructor() { }

  report(status: string, title: string, message: string) {
    if (status == 'success') {
      Report.success(
        title,
        message,
        'Okay',
      );
    } else {
      Report.failure(
        title,
        message,
        'Okay',
      );
    }
  }

  notify(status: string, message: string) {
    if (status == 'success') {
      Notify.success(message);
    } else {
      Notify.failure(message);
    }

  }

  loadingOn() {
    Loading.init({
      svgColor: '#727CF5',
      cssAnimation: true,
      cssAnimationDuration: 360,

    });
    Loading.hourglass();
  }

  loadingOff() {
    Loading.remove();
  }

  loadingOffAfterDelay(delay: number) {
    Loading.remove(delay);
  }

  confirm(status: string, title: string, message: string) {
    Confirm.show(
      title,
      message,
      'Oui',
      'Non',
      () => {
      // alert('Thank you.');
      },
      () => {
      // alert('If you say so...');
      },
      {
      },
      );
  }
}
