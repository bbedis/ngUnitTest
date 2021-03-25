import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService, mockActivateRoute, mockLocation;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivateRoute = {
      snapshot: {
        paramMap: {
          get: () => '3'
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivateRoute},
        {provide: Location, useValue: mockLocation},
        {provide: HeroService, useValue: mockHeroService}
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
  });

  it('should render hero name in h2 tag', () => {
    // act
    fixture.detectChanges();

    // assert
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SuperDude'.toUpperCase());
  });

  it('should call updateHero when save is called', fakeAsync(() => {
    // arrange
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    // act
    fixture.componentInstance.save();
    flush();

    // assert
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});
