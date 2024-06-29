import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService: AuthService = inject(AuthService)
  private router = inject(Router)
  public user = computed(() => this.authService.currentUser())

  // get user() {
  //   return this.authService.currentUser()
  // }

  logout(){
    this.authService.logout()
    // this.router.navigateByUrl('/auth/login')
  }
}
