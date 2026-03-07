import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isPremium: boolean;
}

export interface Notification {
  id: string;
  icon: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userSubject = new BehaviorSubject<User | null>(this.loadUser());
  private readonly notificationsSubject = new BehaviorSubject<Notification[]>(this.getDefaultNotifications());

  getUser$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  login(email: string, _password: string): { success: boolean; error?: string } {
    if (!email.trim()) return { success: false, error: 'Email is required' };
    const user: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      isPremium: false
    };
    localStorage.setItem('musico_user', JSON.stringify(user));
    this.userSubject.next(user);
    return { success: true };
  }

  signup(name: string, email: string, _password: string): { success: boolean; error?: string } {
    if (!name.trim()) return { success: false, error: 'Name is required' };
    if (!email.trim()) return { success: false, error: 'Email is required' };
    const user: User = {
      id: Date.now().toString(),
      name: name.trim(),
      email,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      isPremium: false
    };
    localStorage.setItem('musico_user', JSON.stringify(user));
    this.userSubject.next(user);
    return { success: true };
  }

  logout(): void {
    localStorage.removeItem('musico_user');
    this.userSubject.next(null);
  }

  getNotifications$(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  get unreadCount(): number {
    return this.notificationsSubject.value.filter(n => !n.read).length;
  }

  markAsRead(id: string): void {
    const notifications = this.notificationsSubject.value.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(notifications);
  }

  markAllAsRead(): void {
    const notifications = this.notificationsSubject.value.map(n => ({ ...n, read: true }));
    this.notificationsSubject.next(notifications);
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }

  private loadUser(): User | null {
    const stored = localStorage.getItem('musico_user');
    return stored ? JSON.parse(stored) : null;
  }

  private getDefaultNotifications(): Notification[] {
    return [
      { id: '1', icon: 'celebration', title: 'Welcome to Musico!', message: 'Explore 210+ songs across 20 genres', time: 'Just now', read: false },
      { id: '2', icon: 'album', title: 'New Releases', message: 'Check out the latest trending tracks', time: '5m ago', read: false },
      { id: '3', icon: 'playlist_add', title: 'Create Playlists', message: 'Organize your favorite music into playlists', time: '1h ago', read: false },
      { id: '4', icon: 'favorite', title: 'Like Songs', message: 'Tap the heart icon to save songs you love', time: '2h ago', read: true },
      { id: '5', icon: 'headphones', title: 'Premium Coming Soon', message: 'Ad-free listening and offline mode', time: '1d ago', read: true }
    ];
  }
}
