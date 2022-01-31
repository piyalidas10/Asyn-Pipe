import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {NumberService} from '../number.service';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncComponent implements OnInit {
  mutableValue$ = this.numSrv.mutableValue$;
  immutableValue$ = this.numSrv.immutableValue$;
  constructor(private numSrv: NumberService) { 

  }

  ngOnInit(): void {
  }

}
