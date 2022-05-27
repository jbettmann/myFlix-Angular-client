import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss'],
})
export class SynopsisViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Image: any;
      Title: string;
      Release: string;
      Description: string;
    }
  ) {}

  // called once Angular is done crating component. Lifecycle hook.
  // similar to componentDidMount or useEffect()
  ngOnInit(): void {}
}
