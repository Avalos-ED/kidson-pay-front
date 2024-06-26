import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDialogComponent } from './play-dialog.component';

describe('PlayDialogComponent', () => {
  let component: PlayDialogComponent;
  let fixture: ComponentFixture<PlayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
