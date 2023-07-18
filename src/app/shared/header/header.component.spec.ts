import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with navbarOpen set to false', () => {
    expect(component.navbarOpen).toBeFalse();
  });

  it('should toggle navbarOpen value when toggleNavbar is called', () => {
    expect(component.navbarOpen).toBeFalse();
    component.toggleNavbar();
    expect(component.navbarOpen).toBeTrue();
    component.toggleNavbar();
    expect(component.navbarOpen).toBeFalse();
  });
});
