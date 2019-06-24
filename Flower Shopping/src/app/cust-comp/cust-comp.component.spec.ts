import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCompComponent } from './cust-comp.component';

describe('CustCompComponent', () => {
  let component: CustCompComponent;
  let fixture: ComponentFixture<CustCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
