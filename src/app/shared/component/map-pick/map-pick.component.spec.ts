import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPickComponent } from './map-pick.component';

describe('MapPickComponent', () => {
  let component: MapPickComponent;
  let fixture: ComponentFixture<MapPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
