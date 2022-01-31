import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NumberService } from '../number.service';

@Component({
  selector: 'app-withoutasync',
  templateUrl: './withoutasync.component.html',
  styleUrls: ['./withoutasync.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutasyncComponent implements OnInit {
  mutableValue = this.numSrv.mutableValue;
  immutableValue = this.numSrv.immutableValue;
  constructor(private numSrv: NumberService) { 
  }

  ngOnInit(): void {
  }

}
