import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create and instantiate', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the SelectionPageComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const selectionPage = compiled.querySelector('selection-page');
    expect(selectionPage).toBeTruthy();
  });

  it('should use OnPush change detection', () => {
    const metadata = (AppComponent as any).ɵcmp;
    expect(metadata.changeDetection).toBe(ChangeDetectionStrategy.OnPush);
  });
});

import { ChangeDetectionStrategy } from '@angular/core';
