import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService, User, Notification } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  notifications: Notification[] = [];
  unreadCount = 0;
  navVisible = true;
  private lastScrollY = 0;
  private destroy$ = new Subject<void>();

  constructor(public userService: UserService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const currentY = window.scrollY;
    this.navVisible = currentY < 60 || currentY < this.lastScrollY;
    this.lastScrollY = currentY;
  }

  ngOnInit(): void {
    this.userService.getUser$().pipe(takeUntil(this.destroy$)).subscribe(u => this.user = u);
    this.userService.getNotifications$().pipe(takeUntil(this.destroy$)).subscribe(n => {
      this.notifications = n;
      this.unreadCount = n.filter(x => !x.read).length;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get userInitial(): string {
    return this.user ? this.user.name.charAt(0).toUpperCase() : '?';
  }

  markAsRead(id: string): void {
    this.userService.markAsRead(id);
  }

  markAllAsRead(): void {
    this.userService.markAllAsRead();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
