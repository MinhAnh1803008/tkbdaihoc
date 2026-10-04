// Service worker của Thời Khóa Biểu.
// Khi bạn sửa trang (index.html...), hãy TĂNG số phiên bản VER để máy tự cập nhật.
const VER='tkb-v2';
const FONTS='tkb-fonts';
const CORE=['index.html','manifest.json','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','icons/apple-touch-icon.png','vendor/xlsx.full.min.js'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VER).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER&&k!==FONTS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    if(r.mode==='navigate'){
      // Trang chính: mở ngay bản đã lưu, đồng thời tải bản mới ở nền (hiện ở lần mở sau).
      e.respondWith(caches.match('index.html').then(hit=>{
        const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VER).then(c=>c.put('index.html',cp))}return res}).catch(()=>hit||Response.error());
        return hit||net;
      }));
      return;
    }
    // File đi kèm (biểu tượng, thư viện, ảnh nền bg.jpg...): dùng bản đã lưu, tải bản mới ở nền.
    e.respondWith(caches.match(r).then(hit=>{
      const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VER).then(c=>c.put(r,cp))}return res}).catch(()=>hit||Response.error());
      return hit||net;
    }));
    return;
  }
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(FONTS).then(c=>c.match(r).then(hit=>{
      const net=fetch(r).then(res=>{c.put(r,res.clone());return res}).catch(()=>hit||Response.error());
      return hit||net;
    })));
  }
});
