import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed, inject } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ConfigService } from './config.service';

describe('Service: Config', () => {
  let service: ConfigService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClientStub = () => ({
      get: (arg: any) => ({
        subscribe: () => ({
          next: (d: any) => d({}),
          error: (e: any) => e({})
        })
      })
    })

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: HttpClient, useFactory: httpClientStub }
      ]
    });

    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = new ConfigService(httpSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should make expected success calls', () => {
    spyOn(httpSpy, 'get').and.returnValues(of('data'));
    service.loadStoreConfig();
    expect(httpSpy.get).toHaveBeenCalled();
  })

  it('should make expected fail calls', () => {
    spyOn(httpSpy, 'get').and.returnValues(throwError('e'));
    service.loadStoreConfig();
    expect(httpSpy.get).toHaveBeenCalled();
  })
});
