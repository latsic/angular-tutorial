import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  defaultQuestion: string = "teacher";
  answer: string = "";

  genders: Array<string> = ["male", "female"];

  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: ""
  };

  submitted = false;

  @ViewChild("f")
  myForm: NgForm;
  
  suggestUserName() {

    console.log("aha");

    const suggestedName = 'Superuser';

    // this.myForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ""
    //   },
    //   secret: "pet",
    //   questionAnswer: "ddd",
    //   genderChoice: "male"
    // });

    this.myForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

  }

  // onSubmit(form: NgForm): void {
  //   console.log("submitted")
  //   console.log(form);
  // }

  onSubmit(): void {
    console.log(this.myForm);

    this.submitted = true;

    this.user.username = this.myForm.value.userData.username;
    this.user.email = this.myForm.value.userData.email;
    this.user.secretQuestion = this.myForm.value.secret;
    this.user.answer = this.myForm.value.questionAnswer;
    this.user.gender = this.myForm.value.genderChoice;

    this.myForm.reset();
  }
}
