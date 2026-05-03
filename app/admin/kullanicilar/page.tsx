'use client';

import { useState } from 'react';
import { Search, MoreHorizontal, Mail, UserX, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const sampleUsers = [
  { id: '1', name: 'Ahmet Yilmaz', email: 'ahmet@email.com', role: 'user', joinedAt: '2026-01-15', favorites: 5 },
  { id: '2', name: 'Elif Demir', email: 'elif@email.com', role: 'admin', joinedAt: '2025-12-01', favorites: 12 },
  { id: '3', name: 'Mehmet Kaya', email: 'mehmet@email.com', role: 'user', joinedAt: '2026-02-20', favorites: 3 },
  { id: '4', name: 'Zeynep Ozturk', email: 'zeynep@email.com', role: 'user', joinedAt: '2026-03-10', favorites: 8 },
  { id: '5', name: 'Can Aksoy', email: 'can@email.com', role: 'user', joinedAt: '2026-04-05', favorites: 2 },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(sampleUsers);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' } : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Kullanicilar</h1>
        <p className="text-muted-foreground">Kayitli kullanicilari yonetin</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-sm text-muted-foreground">Toplam Kullanici</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
            <p className="text-sm text-muted-foreground">Admin</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-2xl font-bold">{users.reduce((acc, u) => acc + u.favorites, 0)}</p>
            <p className="text-sm text-muted-foreground">Toplam Favori</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Kullanici ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredUsers.length} kullanici
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanici Listesi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanici</TableHead>
                <TableHead className="hidden md:table-cell">Rol</TableHead>
                <TableHead className="hidden lg:table-cell">Katilim Tarihi</TableHead>
                <TableHead className="hidden lg:table-cell">Favoriler</TableHead>
                <TableHead className="text-right">Islemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Admin' : 'Kullanici'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(user.joinedAt).toLocaleDateString('tr-TR')}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {user.favorites}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Islemler</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a href={`mailto:${user.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            E-posta Gonder
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleRole(user.id)}>
                          <Shield className="mr-2 h-4 w-4" />
                          Rol Degistir
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteUser(user.id)}
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Hesabi Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
