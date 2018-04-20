import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("f")
  myForm: NgForm;

  formData = {
    mail: "",
    mode: "",
    pwdVal: ""
  };

  modes: Array<string> = ["Basic", "Advanced", "Default"];
  selectedMode: string = "Advanced";

  onSubmit() {

    this.formData.mail = this.myForm.value.email;
    this.formData.mode = this.myForm.value.mode;
    this.formData.pwdVal = this.myForm.value.password;
  }

  pwdIsEmpty() {

    let a: Element = document.querySelector("#pwd1");
    //console.log("a", a);
    //console.log("a", a.value);

  }

  ngOnInit() {
    console.log(this.myForm);
  }
}
