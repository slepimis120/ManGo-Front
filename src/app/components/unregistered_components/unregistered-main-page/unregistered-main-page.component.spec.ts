import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredMainPageComponent } from './unregistered-main-page.component';

describe('UnregisteredMainPageComponent', () => {
  let component: UnregisteredMainPageComponent;
  let fixture: ComponentFixture<UnregisteredMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
