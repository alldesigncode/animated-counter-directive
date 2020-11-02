import { stagger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  data = [
    {
      title: 'Total Orders',
      color: 'lightpurple',
      amount: 313.12,
      percent: 45,
      iconName: 'icon-shop'
    },
    {
      title: 'Total Views',
      color: 'lightgrey',
      amount: 120.50,
      percent: 47,
      iconName: 'icon-shopping-cart'
    },
    {
      title: 'Conversation Rate',
      color: 'lightgreen',
      amount: 98.3,
      percent: 78,
      iconName: 'icon-bar-graph'
    },
    {
      title: 'Avg Orders',
      color: 'lightorange',
      amount: 260.32,
      percent: 64,
      iconName: 'icon-calendar'
    },
  ];

  @ViewChild('el', { static: false }) el: ElementRef<HTMLDivElement>;

  ngOnInit() {
  }

  ngAfterViewInit() {
    gsap.from(this.el.nativeElement.children, {
      delay: 1,
      autoAlpha: 0,
      y: -20,
      stagger: 0.10
    });
  }
}
