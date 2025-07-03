/**
 * Format avatar URL từ database để có thể hiển thị đúng
 * @param url - URL từ database (có thể là "./avatars/2.jpg", "/avatars/2.jpg", hoặc full URL)
 * @returns URL đã được format để hiển thị đúng
 */
export function formatAvatarUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  
  // Nếu là URL đầy đủ (http/https) thì giữ nguyên
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  
  // Nếu bắt đầu bằng "./" thì loại bỏ "./" và thêm "/" vào đầu
  if (url.startsWith("./")) {
    return "/" + url.substring(2);
  }
  
  // Nếu bắt đầu bằng "/" thì giữ nguyên
  if (url.startsWith("/")) {
    return url;
  }
  
  // Trường hợp khác, coi như đường dẫn tương đối từ public, thêm "/" vào đầu
  return "/" + url;
} 