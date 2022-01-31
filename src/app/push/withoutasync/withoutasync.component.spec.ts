import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutasyncComponent } from './withoutasync.component';

describe('WithoutasyncComponent', () => {
  let component: WithoutasyncComponent;
  let fixture: ComponentFixture<WithoutasyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutasyncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutasyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
