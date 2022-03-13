import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseUrl = "https://fakestoreapi.com/products/";

  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);

  isShowAllProducts = new EventEmitter<boolean>(true);


  constructor(private http: HttpClient) { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
  }

  getAllCategories() {
    return this.http.get(this.baseUrl + 'categories');
  }

  getAllPerticularProducts(param: any) {
    return this.http.get(this.baseUrl + 'category/' + param)
  }

  getProductDetails(param: any) {
    return this.http.get(this.baseUrl + param);
  }

  getAllProducts() {
    return this.http.get(this.baseUrl);
  }

}

