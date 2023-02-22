import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme=document.querySelector('#theme')

  constructor() { }

  ngOnInit(): void {

    const url=localStorage.getItem('theme') || './assets/css/colors/purple-dark.css'

    // const url=`./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href',url)
    // localStorage.setItem('theme',url)


  }

}
