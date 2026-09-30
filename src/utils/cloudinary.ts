/// <reference types="vite/client" />

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

/**
 * Upload an image to Cloudinary and return its permanent HTTPS URL.
 * Throws an Error with a user-facing (Vietnamese) message on any failure.
 * No base64 fallback: base64 images bloat the single Firestore document past its 1 MiB limit.
 */
export async function uploadImage(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'abl79ylj';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ThangvaNgoc';

  if (!file.type.startsWith('image/')) {
    throw new Error(`"${file.name}" không phải là file ảnh.`);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`Ảnh "${file.name}" lớn hơn 10MB, hãy chọn ảnh nhỏ hơn.`);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  let res: Response;
  try {
    res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
  } catch {
    throw new Error('Không kết nối được máy chủ ảnh, hãy kiểm tra mạng và thử lại.');
  }

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.secure_url) {
    throw new Error(`Tải ảnh lên thất bại (${data?.error?.message || `HTTP ${res.status}`}).`);
  }
  return data.secure_url;
}
