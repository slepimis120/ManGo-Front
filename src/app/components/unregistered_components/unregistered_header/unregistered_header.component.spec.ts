import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredHeaderComponent } from './unregistered_header.component';

describe('HeaderComponent', () => {
  let component: UnregisteredHeaderComponent;
  let fixture: ComponentFixture<UnregisteredHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
