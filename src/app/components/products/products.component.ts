import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { MainService } from 'src/app/services/main.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  state$!: Observable<object>;
  productsList: any;

  constructor(public router: Router,
    private mainService: MainService,
    public activatedRoute: ActivatedRoute,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    this.mainService.isShowAllProducts.emit(false);
    
    this.activatedRoute.params.subscribe(params => {
      let data = params['category'];
      this.getAllProducts(data);
    });
  }

  getAllProducts(category: any) {
    this.SpinnerService.show();
    this.mainService.getAllPerticularProducts(category).subscribe(res => {
      // console.log(res);
      this.productsList = res;
      this.SpinnerService.hide();
    }, error => {
      console.log(error);
    });
  }

  getProductDetail(pid: any) {
    // console.log("== pid ==>", pid);
    this.router.navigate(['/home/product-details', { 'productId': pid }]);
  }

}
