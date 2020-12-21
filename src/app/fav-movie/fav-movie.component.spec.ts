import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavMovieComponent } from './fav-movie.component';

describe('FavMovieComponent', () => {
  let component: FavMovieComponent;
  let fixture: ComponentFixture<FavMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    // component.title = 'Test Title';

    expect(component.title).toBe('Mis Favoritas');
  });
});
