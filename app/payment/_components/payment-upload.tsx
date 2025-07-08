'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileImage, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentUploadProps {
  onSubmit: (file: File) => Promise<void>;
  isSubmitting: boolean;
}

export function PaymentUpload({ onSubmit, isSubmitting }: PaymentUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'application/pdf',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Tipe file tidak didukung', {
          description: 'Silakan upload file JPG, PNG, WebP, atau PDF',
        });
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('Ukuran file terlalu besar', {
          description: 'Maksimal ukuran file adalah 5MB',
        });
        return;
      }

      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast.success('File berhasil dipilih!', {
        description: `${file.name} siap untuk dikirim`,
        duration: 3000,
      });
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      toast.error('Silakan upload bukti pembayaran terlebih dahulu');
      return;
    }

    await onSubmit(uploadedFile);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Bukti Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Bukti Transfer *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="payment-proof"
            />
            <label htmlFor="payment-proof" className="cursor-pointer">
              {uploadPreview ? (
                <div className="space-y-3">
                  {uploadedFile?.type.startsWith('image/') ? (
                    <Image
                      src={uploadPreview}
                      alt="Bukti pembayaran"
                      width={200}
                      height={200}
                      className="mx-auto rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <FileImage className="h-12 w-12 text-gray-400" />
                      <span className="text-sm text-gray-600">PDF File</span>
                    </div>
                  )}
                  <p className="text-sm text-green-600 font-medium">
                    {uploadedFile?.name}
                  </p>
                  <Button variant="outline" size="sm">
                    Ganti File
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <FileImage className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="font-medium text-gray-700">
                      Klik untuk upload bukti pembayaran
                    </p>
                    <p className="text-sm text-gray-500">
                      Format: JPG, PNG, PDF - maksimal 5MB
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>

        <Button
          className="w-full bg-pink-600 hover:bg-pink-700"
          onClick={handleSubmit}
          disabled={!uploadedFile || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Mengirim...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Kirim Bukti Pembayaran
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
