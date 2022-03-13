import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any;
  categoryName: any;
  selected: any;
  allProducts: any = [];
  showAllItems: boolean = true;
  selectedIndex: any;
  term:any;
  showVisibilitySubscription: Subscription = new Subscription;

  constructor(public router: Router, private mainService: MainService, private SpinnerService: NgxSpinnerService,private changeDetection:ChangeDetectorRef) {
 
   }

  ngOnInit(): void {
    this.showVisibilitySubscription = this.mainService.isShowAllProducts.subscribe((isShowProducts:boolean)=>{
      if(this.showAllItems !== isShowProducts){
        this.showAllItems = isShowProducts;
        this.changeDetection.detectChanges();
      }
    })
    this.getAllcategories();
    this.getAllOfTheProducts();

  }

  getAllcategories() {
    this.SpinnerService.show();
    this.mainService.getAllCategories().subscribe(res => {
      // console.log(res);
      this.categories = res;
      this.SpinnerService.hide();
    }, error => {
      console.log(error);
    });
  }


  getAllProducts(category: any, index:any) {
    this.selectedIndex = index;
    this.selected = category;
    this.router.navigate(['/home/products', { 'category': category }]);
  }


  isActive(item: any) {
    return this.selected === item;
  };

  

  getAllOfTheProducts() {
    this.SpinnerService.show();
    this.mainService.getAllProducts().subscribe(res => {
      // console.log(res);
      this.allProducts = res;
    }, error => {
      console.log(error);
    });
  }


}
