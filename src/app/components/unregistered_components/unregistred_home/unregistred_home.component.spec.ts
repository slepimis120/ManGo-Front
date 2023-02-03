import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredHomeComponent } from './unregistred_home.component';

describe('HomeComponent', () => {
  let component: UnregisteredHomeComponent;
  let fixture: ComponentFixture<UnregisteredHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
