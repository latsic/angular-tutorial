import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'dns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames: Array<string> = ['Chris', 'Anna'];

  ngOnInit() {

    this.signupForm = new FormGroup({
      "userData": new FormGroup({
        "username": new FormControl("afa", [Validators.required, this.forbiddenNames.bind(this)]),
        "email": new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails])
      }),
      "gender": new FormControl("male"),
      "hobbies": new FormArray([new FormControl("test1", Validators.required)])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log("valueChange", value);
    //   }
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log("statusChange", status);
      }
    );

    this.signupForm.get("userData.email").statusChanges.subscribe(
      (status) => {
        console.log("statusChange email", status);
      }
    );

    
    this.signupForm.setValue({
      "userData": {
        "username": "max",
        "email": "test3@test.com"
      },
      "gender": "female",
      "hobbies": ["test2"]
    });

    this.signupForm.patchValue({
      "gender": "male",
      "hobbies": ["test3"]
    });

    this.signupForm.reset();
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }

  onAddHobby() {

    console.log("keys: ", Object.keys(this));

    console.log("onAddHobby");

    const control = new FormControl(null, Validators.required);

    (<FormArray>this.signupForm.get("hobbies")).push(control);

    console.log(this.signupForm);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {

    if(this.forbiddenUsernames.indexOf(control.value) >= 0) {
      return {"nameIsForbidden": true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === "test@test.com") {
          resolve({"emailIsForbidden": true});
        }
        else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  getKeys(object: Object) {
    return Object.keys(object);
  }
}
