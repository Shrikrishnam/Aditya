import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ViewChildren} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, Form } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {

  }

}


@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  @ViewChildren('firstname') firstnameRef: ElementRef;

  inrValue: number = 10000
  paisaValue: number = 10
  sub: any
  item: any

  fitnessObj: Fitness
  
  @Output() fitnessdata = new EventEmitter<Fitness>();
  fitnessForm: FormGroup;
  public obj: any = {};
  
  constructor(private fb: FormBuilder, private userService: UserService,private route: ActivatedRoute, private router: Router) {
    
   }


  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params: any)=>{
        this.item = +params['items'] || 0;

        console.log("passed object", this.item);
      }
    )
    

    this.fitnessForm = this.fb.group({
      firstname: ["", [
                      Validators.required,
                      Validators.pattern("^[a-zA-Z ]+$")
                  ]],
      lastname: ["", [
                     Validators.required,
                     Validators.pattern("^[a-zA-Z ]+$")
    ]],
      age: ["",[Validators.required, this.ageRangeValidator]],
      phonenumber: ["", [Validators.required, Validators.pattern("^((\\+91-?|0)?[0-9]{10}$)")]],
      email: ["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      streetaddress:["",[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]],
      city:["",[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]],
      state: ["",[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]],
      country: ["",[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]],
      pincode: ["", [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      packages: [1,[Validators.required]],
      trainerpreference: [""],
      physiotherapist: [""],
      inr: ["",[Validators.required, this.inrValidator]],
      paisa: ["", [Validators.required, this.paisaValidator]]

    });
  }
    


  onSubmit() { 
    this.obj = { ...this.fitnessForm.value, ...this.obj };
    this.fitnessForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
      this.fitnessForm.value
    );
      
    if (this.fitnessForm.valid) {
      this.fitnessdata.emit(
        this.fitnessObj = new Fitness(
          this.fitnessForm.value.packages,
          this.fitnessForm.value.paisa,
          this.fitnessForm.value.streetaddress,
          this.fitnessForm.value.city,
          this.fitnessForm.value.state,
          this.fitnessForm.value.country,
          this.fitnessForm.value.pincode,
          this.fitnessForm.value.phonenumber,
          this.fitnessForm.value.email,
          this.fitnessForm.value.firstname,
          this.fitnessForm.value.lastname,
          this.fitnessForm.value.age,
          this.fitnessForm.value.trainerpreference,
          this.fitnessForm.value.physiotherapist,
          this.fitnessForm.value.packages
        )
      );
        this.userService.postfitnessdata(this.fitnessObj).subscribe(
          response =>{
            console.log("successfully posted", response);
          }
        )
    }
  }


  ageRangeValidator(control: FormControl): {[key: string]: boolean}{
    

    if(control.value < 18 || control.value > 60){
      
      return { 'ageRangeValidator': true };
    }
    return null;
  }

  inrValidator(control: FormControl): {[key: string]: boolean}{
    

    if(control.value <= 0){
      
      return { 'inrValidator': true };
    }
    return null;
  }  

  paisaValidator(control: FormControl): {[key: string]: boolean}{
    

    if(control.value <= 0){
      
      return { 'paisaValidator': true };
    }
    return null;
  }
  
  checkFunction(){
    this.inrValue = this.fitnessForm.value.packages
  }

    
  }


