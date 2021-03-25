import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let mockMessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });
  })

  describe('getHero', () => {
    it('should call get with the correct URL',
    inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController)  => {
      service.getHero(4).subscribe();
      // service.getHero(3).subscribe();

      const req = controller.expectOne('api/heroes/4');
      req.flush({id: 4, name: 'SuperDude', strength: 100});

      controller.verify();
    }));
  });
});
