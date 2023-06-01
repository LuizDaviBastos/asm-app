import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vendly-logo',
  templateUrl: './vendly-logo.component.html',
  styleUrls: ['./vendly-logo.component.scss']
})
export class VendlyLogoComponent implements OnInit {
  
  @Input('innerStyle') innerStyle: string;

  constructor() { }

  ngOnInit() { }

}