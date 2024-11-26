import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InjectNames } from '../../../core/inject-names';
import { UsersService } from './users.service';
import { testUsers } from '../blog.test-data.spec';

describe('UserService', () => {

    let userService: UsersService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    { provide: InjectNames.BlogBaseApiUrl, useValue: 'blogUrl' }
                ]
            }).compileComponents();

        httpTestingController = TestBed.inject(HttpTestingController);
        userService = TestBed.inject(UsersService);
    });

    it('should fetch users', (done) => {
        userService.fetchUsers().subscribe(
            (result) => {
                expect(result).toEqual(testUsers);
                done();
            });

        const postRequest = httpTestingController.expectOne('blogUrl/users');
        expect(postRequest.request.method).toBe('GET');
        postRequest.flush(testUsers,
            {
                status: 200, statusText: 'OK'
            });
    });
})