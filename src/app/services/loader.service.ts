import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  isLoading: boolean = false;

  constructor() { }

  /**
   * This method is used to display Loader Spinner
   */
  showLoader(){
    this.isLoading = true;
  }
  
  /**
   * This method is used to hide Loader Spinner
   */
  hideLoader() {
    this.isLoading = false;
  }
}
