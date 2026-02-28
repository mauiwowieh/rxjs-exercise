import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SelectionState } from '../models/selection-state.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Save state to localStorage with error handling.
   * Silently fails on quota exceeded or other storage errors.
   */
  save(key: string, state: SelectionState): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      // Handle QuotaExceededError, SecurityError, etc.
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`[StorageService] Failed to save state for key "${key}": ${errorMessage}`);

      // If quota exceeded, attempt to clear old data and retry
      if (error instanceof DOMException && error.code === 22) {
        try {
          this.clearOldestKeys();
          localStorage.setItem(key, JSON.stringify(state));
        } catch (retryError) {
          console.error(`[StorageService] Failed to save state even after clearing space`);          }
      }
    }
  }

  /**
   * Load state from localStorage with error handling.
   * Returns null if key doesn't exist or data is corrupted.
   * Stays synchronous: localStorage is synchronous, and the store reads
   * persisted state during initial signal setup.
   */
  load(key: string): SelectionState | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as unknown;
      // Basic type guard: ensure it has the expected shape
      if (this.isValidSelectionState(parsed)) {
        return parsed;
      }

      console.warn(`[StorageService] Corrupted data for key "${key}", removing...`);
      this.safeRemoveItem(key);
      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`[StorageService] Failed to load state for key "${key}": ${errorMessage}`);
      this.safeRemoveItem(key);
      return null;
    }
  }

  private isValidSelectionState(obj: unknown): obj is SelectionState {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    const state = obj as Record<string, unknown>;
    return (
      Array.isArray(state.boxes) &&
      typeof state.activeBoxId === 'number' &&
      state.boxes.every((box: unknown) => 
        typeof box === 'object' && 
        box !== null && 
        'id' in box && 
        'selectedOptionId' in box
      )
    );
  }

  private safeRemoveItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Silently ignore removal errors
    }
  }

  private clearOldestKeys(): void {
    // Clear all storage keys to free up space (aggressive approach)
    // In production, you might want a more sophisticated cleanup strategy
    try {
      const keysToKeep = new Set<string>();
      // Keep only the most recent state per container
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('rxjs-selection:')) {
          keysToKeep.add(key);
        }
      }
      // Remove everything else
      const allKeys = Object.keys(localStorage);
      for (const key of allKeys) {
        if (!keysToKeep.has(key)) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('[StorageService] Failed to clear old keys');
    }
  }
}
