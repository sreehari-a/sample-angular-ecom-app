import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/common/loader-service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  constructor(private loaderService: LoaderService) {
   }

  ngOnInit(): void {
  }

}
