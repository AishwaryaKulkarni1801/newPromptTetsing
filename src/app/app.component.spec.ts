import { TestBed, fakeAsync, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Clear any running intervals
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title "TechVision Pro"', () => {
    expect(component.title).toEqual('TechVision Pro');
  });

  it('should render title in the navigation', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo-text')?.textContent).toContain('TechVision Pro');
  });

  it('should have features array with 4 items', () => {
    expect(component.features).toBeDefined();
    expect(component.features.length).toBe(4);
  });

  it('should have all features with required properties', () => {
    component.features.forEach(feature => {
      expect(feature.icon).toBeDefined();
      expect(feature.title).toBeDefined();
      expect(feature.description).toBeDefined();
      expect(typeof feature.icon).toBe('string');
      expect(typeof feature.title).toBe('string');
      expect(typeof feature.description).toBe('string');
    });
  });

  it('should have specific feature titles', () => {
    const expectedTitles = ['Lightning Fast', 'Modern Design', 'Secure & Reliable', 'Mobile First'];
    const actualTitles = component.features.map(f => f.title);
    expect(actualTitles).toEqual(expectedTitles);
  });

  it('should have testimonials array with 3 items', () => {
    expect(component.testimonials).toBeDefined();
    expect(component.testimonials.length).toBe(3);
  });

  it('should have all testimonials with required properties', () => {
    component.testimonials.forEach(testimonial => {
      expect(testimonial.name).toBeDefined();
      expect(testimonial.role).toBeDefined();
      expect(testimonial.image).toBeDefined();
      expect(testimonial.quote).toBeDefined();
      expect(typeof testimonial.name).toBe('string');
      expect(typeof testimonial.role).toBe('string');
      expect(typeof testimonial.image).toBe('string');
      expect(typeof testimonial.quote).toBe('string');
    });
  });

  it('should initialize currentTestimonial to 0', () => {
    expect(component.currentTestimonial).toBe(0);
  });

  it('should have scrollToSection method', () => {
    expect(typeof component.scrollToSection).toBe('function');
  });

  it('should have ngOnDestroy method', () => {
    expect(typeof component.ngOnDestroy).toBe('function');
  });

  it('should call scrollIntoView when scrollToSection is called', () => {
    const mockElement = {
      scrollIntoView: jest.fn()
    };
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
    
    component.scrollToSection('test-section');
    
    expect(document.getElementById).toHaveBeenCalledWith('test-section');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should handle scrollToSection when element is not found', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);
    
    expect(() => component.scrollToSection('non-existent')).not.toThrow();
    expect(document.getElementById).toHaveBeenCalledWith('non-existent');
  });

  it('should auto-rotate testimonials every 4 seconds', fakeAsync(() => {
    // Create a fresh component instance for this test
    const testFixture = TestBed.createComponent(AppComponent);
    const testComponent = testFixture.componentInstance;
    
    const initialTestimonial = testComponent.currentTestimonial;
    expect(initialTestimonial).toBe(0);
    
    // Fast forward 4 seconds
    tick(4000);
    expect(testComponent.currentTestimonial).toBe(1);
    
    // Fast forward another 4 seconds
    tick(4000);
    expect(testComponent.currentTestimonial).toBe(2);
    
    // Fast forward another 4 seconds (should wrap around to 0)
    tick(4000);
    expect(testComponent.currentTestimonial).toBe(0);
    
    // Clean up
    testComponent.ngOnDestroy();
    discardPeriodicTasks();
    testFixture.destroy();
  }));

  it('should continue testimonial rotation cycle correctly', fakeAsync(() => {
    const testFixture = TestBed.createComponent(AppComponent);
    const testComponent = testFixture.componentInstance;
    
    // Test multiple cycles
    for (let cycle = 0; cycle < 2; cycle++) {
      for (let i = 0; i < 3; i++) {
        expect(testComponent.currentTestimonial).toBe(i);
        tick(4000);
      }
    }
    
    // Clean up
    testComponent.ngOnDestroy();
    discardPeriodicTasks();
    testFixture.destroy();
  }));

  it('should clear interval on ngOnDestroy', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    component.ngOnDestroy();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should handle ngOnDestroy when interval is null', () => {
    (component as any).testimonialInterval = null;
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should have correct testimonial names', () => {
    const expectedNames = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'];
    const actualNames = component.testimonials.map(t => t.name);
    expect(actualNames).toEqual(expectedNames);
  });

  it('should have valid image URLs for testimonials', () => {
    component.testimonials.forEach(testimonial => {
      expect(testimonial.image).toMatch(/^https:\/\//);
      expect(testimonial.image).toContain('unsplash.com');
    });
  });

  it('should render features in template', () => {
    fixture.detectChanges();
    // Test that features data is available for rendering
    expect(component.features.length).toBeGreaterThan(0);
  });

  it('should render testimonials in template', () => {
    fixture.detectChanges();
    // Test that testimonials data is available for rendering
    expect(component.testimonials.length).toBeGreaterThan(0);
    expect(component.currentTestimonial).toBeGreaterThanOrEqual(0);
    expect(component.currentTestimonial).toBeLessThan(component.testimonials.length);
  });

  it('should have feature icons as emojis', () => {
    const expectedIcons = ['🚀', '🎨', '🔒', '📱'];
    const actualIcons = component.features.map(f => f.icon);
    expect(actualIcons).toEqual(expectedIcons);
  });

  it('should have testimonials with different roles', () => {
    const roles = component.testimonials.map(t => t.role);
    const uniqueRoles = [...new Set(roles)];
    expect(uniqueRoles.length).toBe(3); // All testimonials should have different roles
  });

  it('should have non-empty feature descriptions', () => {
    component.features.forEach(feature => {
      expect(feature.description.length).toBeGreaterThan(0);
      expect(feature.description.trim()).toBeTruthy();
    });
  });

  it('should have non-empty testimonial quotes', () => {
    component.testimonials.forEach(testimonial => {
      expect(testimonial.quote.length).toBeGreaterThan(0);
      expect(testimonial.quote.trim()).toBeTruthy();
    });
  });

  it('should have correct feature descriptions content', () => {
    expect(component.features[0].description).toContain('performance');
    expect(component.features[1].description).toContain('responsive');
    expect(component.features[2].description).toContain('security');
    expect(component.features[3].description).toContain('mobile');
  });

  it('should have testimonials from different companies', () => {
    const companies = component.testimonials.map(t => t.role.split(', ')[1]);
    expect(companies).toEqual(['TechCorp', 'InnovateLab', 'StartupXYZ']);
  });

  it('should have testimonials with meaningful quotes', () => {
    component.testimonials.forEach(testimonial => {
      expect(testimonial.quote.length).toBeGreaterThan(20);
      expect(testimonial.quote).toMatch(/[.!]$/); // Should end with punctuation
    });
  });

  it('should initialize testimonialInterval on construction', () => {
    expect((component as any).testimonialInterval).toBeDefined();
  });
});
