import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InjectNames } from "../../../core/inject-names";
import { GuestBookService } from "./guest-book.service";
import { testApiMessages, testMessage, testMessages } from "../guest-book.test-data.spec";

describe('GuestBookService', () => {

    let guestBookService: GuestBookService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    { provide: InjectNames.GuestBookApiUrl, useValue: 'testGuestBook' }
                ]
            })

        httpTestingController = TestBed.inject(HttpTestingController);
        guestBookService = TestBed.inject(GuestBookService);
    })

    it('should fetch messages', done => {
        guestBookService.fetchMessages().subscribe(
            result => {
                expect(result).toEqual(testMessages);
                done();
            });

        const apiRequest = httpTestingController.expectOne("testGuestBook");
        expect(apiRequest.request.method).toBe("GET");
        apiRequest.flush(testApiMessages, { status: 200, statusText: "OK" });
    })

    it('should return empty array when http returns null', (done) => {
        guestBookService.fetchMessages().subscribe(
            result => {
                expect(result).toEqual([]);
                done();
            });

        const apiRequest = httpTestingController.expectOne("testGuestBook");
        expect(apiRequest.request.method).toBe("GET");
        apiRequest.flush(null, { status: 200, statusText: "OK" });
    })

    it('should create message', (done) => {
        guestBookService.addMessage(testMessage).subscribe(
            (result) => {
                expect(result).toEqual({ ...testMessage, id: '3' });
                done();
            });

        const getRequest = httpTestingController.expectOne("testGuestBook");
        expect(getRequest.request.method).toBe("POST");
        getRequest.flush({ name: '3' }, { status: 200, statusText: "OK" });
    })
})