import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecart';
  public totalItem : number = 0;

  constructor(public router: Router, private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    });
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }

  goToMyProfilePage(){
    this.router.navigate(['/my-profile']);
  }

 
 
  goToHome(){
    this.mainService.isShowAllProducts.emit(true);
    this.router.navigate(['/home']);    
  }


}
