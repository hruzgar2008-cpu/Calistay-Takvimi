'use client';

import { Search, SlidersHorizontal, X, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities, levels } from '@/lib/data';

interface EventFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  level: string;
  onLevelChange: (value: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onClearFilters: () => void;
}

export function EventFilters({
  search,
  onSearchChange,
  city,
  onCityChange,
  level,
  onLevelChange,
  viewMode,
  onViewModeChange,
  onClearFilters,
}: EventFiltersProps) {
  const hasActiveFilters = search || city !== 'Tum Sehirler' || level !== 'hepsi';

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Etkinlik ara..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filtrele:</span>
          </div>
          
          <Select value={city} onValueChange={onCityChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sehir" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={level} onValueChange={onLevelChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Seviye" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Temizle
            </Button>
          )}

          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Izgara Gorunumu</span>
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Liste Gorunumu</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
