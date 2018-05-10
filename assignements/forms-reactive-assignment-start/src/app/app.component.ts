import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;

  projectStates: Array<string> = ['Stable', 'Critical', 'Finished']
  submitted: boolean = false;

  ngOnInit() {

    this.projectForm = new FormGroup({
      "projectName": new FormControl(null, [Validators.required], [this.forbiddenName2]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "projectState": new FormControl("Critical")
    });

    //this.projectForm.get("projectState").setValue("Critical");
  }

  forbiddenName(control: FormControl): {[s: string]: boolean} {
    
    if(control.value === "Test"){
      return {"forbiddenName": true}
    }
    return null;
  }

  forbiddenName2(control: FormControl): Promise<any> | Observable<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {

        if(control.value === "Test"){
          resolve({"forbiddenName": true});
        }
        else{
          return resolve(null);
        }
      }, 1500);

    });
  }

  onSubmit(): void {
    this.submitted = true;
  }
}
