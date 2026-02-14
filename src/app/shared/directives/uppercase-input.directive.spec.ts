import { describe, it, expect, beforeEach } from 'vitest';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UppercaseInputDirective } from './uppercase-input.directive';

@Component({
  standalone: true,
  imports: [UppercaseInputDirective],
  template: `<input type="text" appUppercaseInput value="test" />`
})
class TestComponent {}

describe('UppercaseInputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(input).toBeTruthy();
  });

  it('should transform input to uppercase', () => {
    input.value = 'hello';
    input.setSelectionRange(5, 5);
    
    const event = new InputEvent('input', { bubbles: true });
    Object.defineProperty(event, 'target', { value: input, enumerable: true });
    
    input.dispatchEvent(event);
    
    expect(input.value).toBe('HELLO');
  });
});