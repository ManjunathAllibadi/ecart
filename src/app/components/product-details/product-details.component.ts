import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { NgxSpinnerService } from "ngx-spinner"; 


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:any;
  count:any

  constructor(public router: Router, 
              private mainService:MainService, 
              public activatedRoute: ActivatedRoute,
              private SpinnerService: NgxSpinnerService
              ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let data = params['productId'];
      this.getProductDetails(data);
  });

  }

  getProductDetails(pid:any){
    this.SpinnerService.show();
     this.mainService.getProductDetails(pid).subscribe(res=>{
      // console.log(res);
      this.product = res;
      this.SpinnerService.hide(); 

    },error=>{
      console.log(error);
    });
  }

  addItemToCart(){
    this.mainService.addtoCart(this.product);
  }

}
