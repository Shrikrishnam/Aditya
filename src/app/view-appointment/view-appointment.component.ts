import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  fitnessData: any;

  constructor(private userService: UserService, private router: Router) {
      this.getfitness();
   }

  headers = ["Sl NO","Name","Address", "City", "Package", "Trainer Preference", "Phone"];

  ngOnInit() {

  }
  
  getfitness() {
    this.userService.getfitnessdata().subscribe((response)=>{
      this.fitnessData = response;
  });
    
  }
  edit(item){
    console.log("object in view", item);
    this.router.navigate(["place-fitness-trainer-appointment"], {queryParams: {items: item}});
  }

  delete(id, tableIndex){
    console.log("id", id);

        this.userService.deletefitnessdata(id).subscribe((response)=>{
          console.log("Deletion successfull",id);
        })
        this.fitnessData.splice(tableIndex,1);


  }
}
