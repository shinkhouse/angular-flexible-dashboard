import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDashboardComponent } from './create-new-dashboard.component';

describe('CreateNewDashboardComponent', () => {
  let component: CreateNewDashboardComponent;
  let fixture: ComponentFixture<CreateNewDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
