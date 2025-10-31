import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'TechVision Pro';
  private testimonialInterval: any;
  
  features = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Built with cutting-edge technology for optimal performance and speed.'
    },
    {
      icon: '🎨',
      title: 'Modern Design',
      description: 'Beautiful, responsive UI that adapts to any device and screen size.'
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee.'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Optimized for mobile devices with progressive web app capabilities.'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: 'This solution transformed our workflow and increased productivity by 300%.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO, InnovateLab',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'The best investment we made this year. Exceptional quality and support.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager, StartupXYZ',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'User-friendly interface with powerful features. Highly recommended!'
    }
  ];

  currentTestimonial = 0;

  constructor() {
    // Auto-rotate testimonials
    this.testimonialInterval = setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 4000);
  }

  ngOnDestroy() {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
