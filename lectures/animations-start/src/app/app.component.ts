import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

import {
  trigger, state, style, animate, transition, keyframes, group
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': '#ff0000',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': '{{myColor}}',
        transform: 'translateX(100px)'
      }), {params: {myColor: '#00ff00'}}),
      transition('normal <=> highlighted', animate(300))
      // transition('highlighted => normal', animate(800)),
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': '#ff0000',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'green',
        transform: 'translateX(200px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(300)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange',
          borderRadius: '0px'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
    // trigger('list2', [
    //   // state('in', style({
    //   //   opacity: 1,
    //   //   transform: 'translateX(0)'
    //   // })),
    //   transition('void => *', [
    //     style({
    //       opacity: 0,
    //       transform: 'translateY(-100px) rotate(90deg)',
    //     }),
    //     animate(1000)
    //   ]),
    //   transition('* => void', [
    //     style({
    //       transform: 'scaleY(1)',
    //     }),
    //     animate(2000, style({
    //       transform: 'scaleY(0.0)'
    //     }))
    //   ])
    // ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
       animate(2000, keyframes([
         style({
           transform: 'translateX(-400px)',
           opacity: 1,
           offset: 0
         }),
         style({
           transform: 'translateX(-20px)',
           opacity: 0.9,
           offset: 0.5
         }),
         style({
          transform: 'translateX(-20px)',
          opacity: 1.0,
          offset: 1
         })
       ]))
      ]),
      transition('* => void', [
        group([
          style({
            transform: 'scaleY(1)',
          }),
          animate(2000, style({
            transform: 'scaleY(0.0)',
          })),
          animate(400, style({
            'background-color': 'blue'
          }))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  myColor = '#0000ff';
  anotherColor = '#000000';

  // @ViewChild('list1Elem')
  // list1Elem: ElementRef;

    constructor(private renderer: Renderer2) {
    }

    onShrink() {
      // console.log("dddd");
      this.wildState = 'shrunken';
    }

    onAnimate() {

      this.myColor = '#0000ff';

      this.state = this.state === 'normal'
        ? 'highlighted'
        : 'normal';

      this.wildState = this.wildState === 'normal'
        ? 'highlighted'
        : 'normal';
    }

    onAnimationStart(event) {
      console.log(event);
    }

    onAnimationDone(event) {
      console.log(event);
    }

    onAdd(item) {
      this.list.push(item);
    }

    onDelete(item: string) {
      // this.renderer.re
      const itemIndex = this.list.indexOf(item);
      if (itemIndex >= 0) {
        this.list.splice(itemIndex, 1);
      }
    }
}
