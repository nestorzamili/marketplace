'use client';

import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

interface ShippingAddressFormProps {
  shippingAddress: ShippingAddress;
  onAddressChange: (field: keyof ShippingAddress, value: string) => void;
}

export function ShippingAddressForm({
  shippingAddress,
  onAddressChange,
}: ShippingAddressFormProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-pink-600" />
          Alamat Pengiriman
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nama Lengkap *
            </Label>
            <Input
              id="name"
              value={shippingAddress.name}
              onChange={(e) => onAddressChange('name', e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Nomor Telepon *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) => onAddressChange('phone', e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Alamat Lengkap *
          </Label>
          <Input
            id="address"
            value={shippingAddress.address}
            onChange={(e) => onAddressChange('address', e.target.value)}
            placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan"
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              Kota *
            </Label>
            <Input
              id="city"
              value={shippingAddress.city}
              onChange={(e) => onAddressChange('city', e.target.value)}
              placeholder="Nama kota"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="province"
              className="text-sm font-medium text-gray-700"
            >
              Provinsi *
            </Label>
            <Input
              id="province"
              value={shippingAddress.province}
              onChange={(e) => onAddressChange('province', e.target.value)}
              placeholder="Nama provinsi"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="postalCode"
              className="text-sm font-medium text-gray-700"
            >
              Kode Pos *
            </Label>
            <Input
              id="postalCode"
              value={shippingAddress.postalCode}
              onChange={(e) => onAddressChange('postalCode', e.target.value)}
              placeholder="12345"
              className="h-11"
              maxLength={5}
            />
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">* Wajib diisi</div>
      </CardContent>
    </Card>
  );
}
