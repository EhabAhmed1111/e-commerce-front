import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { VendorsResponse } from '../../../core/models/data';
import { JwtService } from '../../../core/services/auth/jwt/jwt.service';

@Component({
  selector: 'app-vendor',
  imports: [],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss'
})
export class VendorComponent {
constructor(private userService: UserService, private jwtService: JwtService) {}
totalNumberOfVendors: number = 0;
vendorList: VendorsResponse[] = [];
role: string|null = '';
isConfirmPopupIsOpen: boolean = false;
idOfVendorToDelete: string = "";

ngOnInit(): void {
  this.userService.getAllVendors().subscribe((res) => {
    this.vendorList = res.data.vendorResponses;
    this.totalNumberOfVendors = res.data.totalNumberOfVendors;
    this.role = this.jwtService.getRoleFromToken();
  })
}
toggleDeleteVendorConfirmationPopup(id: string = "") {
  this.isConfirmPopupIsOpen = !this.isConfirmPopupIsOpen;
  this.idOfVendorToDelete = id;
}

deleteVendor(id: string) {
  this.userService.deleteUserById(id).subscribe(() => {
    this.vendorList = this.vendorList.filter((vendor) => vendor.id !== id);
    this.isConfirmPopupIsOpen = false;
  })
}
}
