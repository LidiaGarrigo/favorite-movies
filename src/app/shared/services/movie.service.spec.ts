import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Movie } from '../interfaces/movie';
import { environment } from '../../../environments/environment';

import { MovieService } from './movie.service';
import { HttpErrorResponse } from '@angular/common/http';



const favoriteMoviesStub = [
  {title:'Borat'},
  {title:'tenet'},
  {title:'Campeones'}
]

describe('MovieService', () => {
  let service: MovieService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MovieService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    http.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return favorite movies',()=>{
    let result: Movie[];
    let errorAPI;

    service.getMovies$().subscribe(data => result = data, error=> errorAPI = error);

    const req = http.expectOne(environment.api_url);

    expect(req.request.method).toBe('GET');

    req.flush(favoriteMoviesStub);

    http.verify();

    expect(result).toEqual(favoriteMoviesStub);
    expect(errorAPI).toBeUndefined();


  })

  it('should return error when api returns error',()=>{

    let result: Movie[];
    let errorAPI;

    service.getMovies$().subscribe(data => fail('API fails with error'), (error: HttpErrorResponse)=>
/*       expect(error.status) */
      errorAPI = error);

    const req = http.expectOne(environment.api_url);

    req.flush('error 404, not-found',{status:404, statusText:'Not found'});


    expect(result).toBeUndefined();
    expect(errorAPI).toBeDefined();

  });

  it('should create a movie',()=>{

    const mockMovie:Movie = {title: 'No country for old men'};

    service.createMovie$({title: 'No country for old men'}).subscribe(
      data => expect(data.title).toEqual('No country for old men')
    )

    const req = http.expectOne(environment.api_url);

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('content-type')).toBe('application/json');

    req.flush(mockMovie);

  })

});
