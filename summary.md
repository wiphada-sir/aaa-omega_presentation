# AAA Omega — Solar Cell E-Commerce & Service Platform
## Technical Presentation Summary

> โปรเจกต์ระบบขายแผงโซลาร์เซลล์และจัดการบริการ (ติดตั้ง / ล้าง / บำรุงรักษา)  
> พัฒนาด้วย React + Node.js + MongoDB

---

## 1. Scrum Agile Planning

### การแบ่ง Sprint

| Sprint | Repository | เป้าหมาย | ผลลัพธ์ |
|--------|-----------|----------|---------|
| **Sprint 1** | `jsd12_aaa-omega` | Business Planning + UI Prototype | HTML/CSS mockup ครบทุกหน้า, Business Canvas, Diagrams |
| **Sprint 2** | `jsd12_aaa-omega_sprint2` | Frontend React SPA | React App พร้อม Routing, Context, Cart, Admin |
| **Sprint 3** | `jsd12_aaa-omega_backend` | Backend REST API | Express API + MongoDB + Auth + Cloudinary |

### Sprint 1 — Business & Design
- ออกแบบ Business Canvas Model
- วาด Use Case Diagram และ ER Diagram
- ออกแบบ UI ด้วย HTML + Tailwind CSS ทุกหน้า (mockup)
- กำหนด MongoDB Document Structure เบื้องต้น

### Sprint 2 — Frontend
- Setup React + Vite + Tailwind CSS 4
- แปลง HTML prototype → React Components (HTML to JSX)
- ตั้งค่า React Router DOM (customer routes + admin routes)
- สร้าง Context API สำหรับ Auth และ Cart
- เชื่อมต่อ Backend API ผ่าน `fetch` + Cookie

### Sprint 3 — Backend
- Setup Express 5 + Mongoose
- ออกแบบ Mongoose Schema ทุก Collection
- สร้าง REST API ครบทุก Resource (Users, Products, Orders, Services, Carts)
- ระบบ JWT Authentication ผ่าน HttpOnly Cookie
- เชื่อมต่อ Cloudinary สำหรับรูปภาพ
- ตั้งค่า Security (Helmet, CORS, Rate Limit)

### User Stories (ตัวอย่าง)

| As a... | I want to... | So that... |
|---------|-------------|-----------|
| Customer | ดูสินค้าทั้งหมด | เลือกซื้อแผงโซลาร์เซลล์ |
| Customer | เพิ่มสินค้าลงตะกร้า | สั่งซื้อหลายรายการพร้อมกัน |
| Customer | จองบริการติดตั้ง | นัดหมายช่างมาติดตั้ง |
| Admin | จัดการ Order status | ติดตามสถานะการจัดส่ง |
| Admin | ดู Dashboard | เห็นภาพรวมยอดขายและงานบริการ |
| Staff | ดูข้อมูลลูกค้า | ให้บริการได้ถูกต้อง |

---

## 2. Business Model Canvas

### Key Partners
- ผู้ผลิตแผงโซลาร์เซลล์
- ช่างติดตั้ง / ทีมบริการ
- ผู้ให้บริการ Payment Gateway

### Key Activities
- จำหน่ายสินค้าโซลาร์เซลล์ Online
- บริการติดตั้ง (Install)
- บริการล้างทำความสะอาด (Clean)
- บริการบำรุงรักษา (Maintenance)
- จัดการ Order และ Schedule ทีมช่าง

### Key Resources
- ระบบ E-Commerce (Web App)
- ทีมช่างบริการ
- สต็อกสินค้า

### Value Propositions
- ซื้อสินค้าโซลาร์เซลล์พร้อมบริการครบจบที่เดียว
- จองนัดหมายช่างออนไลน์ได้ตลอด 24 ชั่วโมง
- ติดตามสถานะออเดอร์และงานบริการ real-time

### Customer Segments
- **Customer** — บุคคลทั่วไปที่ต้องการซื้อโซลาร์เซลล์
- **Staff** — พนักงานขาย / ช่างบริการ
- **Admin** — ผู้ดูแลระบบ / เจ้าของธุรกิจ

### Channels
- เว็บไซต์ E-Commerce (Desktop + Mobile)
- Admin Dashboard สำหรับจัดการภายใน

### Revenue Streams
- ขายสินค้า (Solar Panel, Inverter, ฯลฯ)
- ค่าบริการติดตั้ง / ล้าง / บำรุงรักษา

### Cost Structure
- ต้นทุนสินค้า (COGS)
- ค่าแรงทีมช่าง
- ค่า Cloud Infrastructure (Hosting, DB, Storage)

---

## 3. Use Case Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      AAA Omega System                    │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐  ┌─────────────┐  │
│  │   <<Actor>>  │   │   <<Actor>>  │  │  <<Actor>>  │  │
│  │   Customer   │   │    Staff     │  │    Admin    │  │
│  └──────┬───────┘   └──────┬───────┘  └──────┬──────┘  │
│         │                  │                 │         │
│   ┌─────┴──────┐     ┌─────┴─────┐     ┌────┴──────┐   │
│   │ ดูสินค้า  │     │ ดูออเดอร์ │     │จัดการ    │   │
│   │ เพิ่มตะกร้า│     │ ดูลูกค้า │     │สินค้า    │   │
│   │ Checkout   │     │ ดูบริการ │     │จัดการ    │   │
│   │ จองบริการ  │     └───────────┘     │ออเดอร์   │   │
│   │ ดูประวัติ  │                       │จัดการ    │   │
│   │ แก้โปรไฟล์│                       │บริการ    │   │
│   └────────────┘                       │จัดการ    │   │
│                                        │ผู้ใช้    │   │
│                                        │เปลี่ยน   │   │
│                                        │Role      │   │
│                                        └──────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Use Cases แบ่งตาม Actor

**Customer**
- สมัครสมาชิก / เข้าสู่ระบบ
- ดูรายการสินค้า / รายละเอียดสินค้า
- เพิ่ม / แก้ไข / ลบสินค้าในตะกร้า
- Checkout และชำระเงิน
- จองบริการ (ติดตั้ง / ล้าง / บำรุงรักษา)
- ดูประวัติการสั่งซื้อ
- แก้ไขข้อมูลส่วนตัวและที่อยู่

**Staff**
- ดูรายการออเดอร์ทั้งหมด
- ดูรายละเอียดลูกค้า
- ดูตารางนัดหมายบริการ

**Admin** (รวม Staff + เพิ่มเติม)
- เพิ่ม / แก้ไข / ลบสินค้า
- อัปเดตสถานะออเดอร์
- จัดการนัดหมายบริการ
- จัดการบัญชีผู้ใช้ทั้งหมด
- เปลี่ยน Role ผู้ใช้

---

## 4. ER Diagram

### Entity Relationship

```
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│    USER     │        │    ORDER    │        │   PRODUCT   │
├─────────────┤        ├─────────────┤        ├─────────────┤
│ userNumber  │──┐     │ orderNumber │    ┌───│ productNumber│
│ firstName   │  │ 1:N │ totalPrice  │ N:N│   │ name        │
│ lastName    │  └────▶│ status      │◀───┘   │ sku         │
│ email       │        │ paymentMethod│       │ brand       │
│ password    │        │ items[]     │        │ category    │
│ role        │        │ customer{}  │        │ price       │
│ isActive    │        │ orderNote   │        │ salePrice   │
│ address{}   │        │ internalNote│        │ stock       │
│ shippingAddr│        └─────────────┘        │ specs[]     │
│ serviceAddr │                               │ image{}     │
└──────┬──────┘        ┌─────────────┐        └─────────────┘
       │               │   SERVICE   │
       │ 1:1           ├─────────────┤        ┌─────────────┐
       ▼               │serviceNumber│        │    CART     │
┌─────────────┐        │ orderNumber │        ├─────────────┤
│    CART     │        │ serviceType │        │ userNumber  │──(1:1 User)
├─────────────┤        │ status      │        │ items[]     │
│ userNumber  │        │ appointmentAt│       │  ├ productNumber│
│ items[]     │        │ team        │        │  └ quantity │
│  ├ productN │        │ customer{}  │        └─────────────┘
│  └ quantity │        │ images[]    │
└─────────────┘        └─────────────┘

                       ┌─────────────┐
                       │   COUNTER   │
                       ├─────────────┤
                       │ _id (name)  │  ← "user", "product",
                       │ seq         │     "order_2025", "service_2025"
                       └─────────────┘
```

### ความสัมพันธ์ระหว่าง Entity

| From | Relationship | To | หมายเหตุ |
|------|-------------|-----|---------|
| User | 1:1 | Cart | 1 user มีได้ 1 cart เท่านั้น |
| User | 1:N | Order | 1 user สั่งได้หลายออเดอร์ |
| User | 1:N | Service | 1 user นัดหมายได้หลายครั้ง |
| Order | N:N (embedded) | Product | ราคา ณ เวลาซื้อถูก snapshot ไว้ใน Order |
| Service | 0:1 | Order | บริการอาจมี orderNumber อ้างอิง |
| Counter | — | All | ทำหน้าที่ generate เลขลำดับ |

---

## 5. System Design Diagram

### Architecture Overview

```
                         INTERNET
                            │
              ┌─────────────┴──────────────┐
              │                            │
        ┌─────▼──────┐              ┌──────▼─────┐
        │  FRONTEND   │              │  BACKEND   │
        │  (Vercel)   │              │ (Railway / │
        │             │              │  Render)   │
        │  React 19   │◀────────────▶│  Express 5 │
        │  Vite 8     │  REST API    │  Node.js   │
        │  Tailwind 4 │  + Cookie    │            │
        └─────────────┘              └──────┬─────┘
                                            │
                          ┌─────────────────┼─────────────────┐
                          │                 │                 │
                   ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
                   │  MongoDB    │  │ Cloudinary  │  │  .env vars  │
                   │  Atlas      │  │ (Images)    │  │  JWT_SECRET │
                   │             │  │             │  │  BCRYPT etc │
                   │ Collections:│  │ Product img │  └─────────────┘
                   │ - users     │  │ Service img │
                   │ - products  │  └─────────────┘
                   │ - orders    │
                   │ - services  │
                   │ - carts     │
                   │ - counters  │
                   └─────────────┘
```

### Request Flow (Authentication)

```
Browser                    Express Server               MongoDB
   │                            │                          │
   │── POST /api/v1/users/login ──▶                        │
   │   { email, password }      │── findOne({ email }) ──▶ │
   │                            │◀── user document ─────── │
   │                            │                          │
   │                            │  bcrypt.compare()        │
   │                            │  jwt.sign({ id })        │
   │                            │  res.cookie("accessToken")│
   │◀── 200 OK { user data } ───│                          │
   │    Set-Cookie: accessToken │                          │
   │                            │                          │
   │── GET /api/v1/users/profile ▶ (Cookie sent auto)      │
   │                            │  jwt.verify(cookie)      │
   │                            │── findById(req.user.id) ▶│
   │◀── 200 OK { user data } ───│◀── user document ─────── │
```

### Middleware Stack (Per Request)

```
[Request]
    │
    ▼
[Helmet]        ← Security Headers
    │
    ▼
[CORS]          ← Allow whitelisted origins + credentials
    │
    ▼
[Rate Limiter]  ← Max 100 req / 15 min (prod)
    │
    ▼
[express.json]  ← Parse JSON body
    │
    ▼
[cookieParser]  ← Parse cookies
    │
    ▼
[Router /api/v1/*]
    │
    ├── [authenticate]  ← verify JWT from cookie → req.user
    │
    ├── [authorize]     ← check role from DB
    │
    ▼
[Controller]    ← Business Logic
    │
    ▼
[Error Handler] ← Centralized 500 / 404
```

---

## 6. React Components Diagram

### Provider Tree (main.jsx)

```
<AdminAuthProvider>       ← Admin JWT state
  <AuthProvider>          ← Customer JWT state
    <MessageProvider>     ← Admin: users/products/orders/services data
      <CartProvider>      ← Cart state
        <App />           ← Router
```

### Customer-Side Component Tree

```
App (Router)
├── HomePage
│   ├── HeaderSection
│   ├── HeaderSectionAuth
│   ├── HeroSection
│   ├── ProductHighlight
│   │   └── ProductCard
│   ├── CalculatorSection    ← คำนวณขนาดโซลาร์
│   ├── TestimonialSection
│   ├── FaqSection
│   └── FooterSection
│
├── AllProductsPage
│   ├── Header + HeaderSectionAuth
│   ├── FilterSection
│   ├── Products
│   │   └── ProductCard (×N)
│   └── FooterSection
│
├── ProductDetailPage
│   ├── Header + HeaderSectionAuth
│   ├── Product             ← รายละเอียด + ปุ่ม Add to Cart
│   └── FooterSection
│
├── CartPage
│   ├── CartItem (×N)       ← แต่ละแถวสินค้า
│   └── OrderSummary        ← สรุปยอด
│
├── CheckoutPage
│   ├── Header + HeaderSectionAuth
│   ├── AddressForm
│   ├── ShippingOption
│   ├── OrderSummary
│   └── FooterSection
│
├── PaymentPage
│   ├── PaymentOption       ← เลือกช่องทางชำระ
│   ├── WalletItem
│   └── ModalConfirm
│
├── LoginPage / RegisterPage
├── UserProfilePage
└── ServicesPage / ContactPage / TestimonialsPage
```

### Admin-Side Component Tree

```
App (Router /admin)
└── AdminProtectedRoute     ← guard: redirect ถ้า !isAdmin
    └── AdminLayout
        ├── admin/Header
        ├── admin/Sidebar
        └── <Outlet>        ← เปลี่ยนตาม route
            ├── AdminHome
            │   ├── StatCard (×6)          ← ยอดขาย, งานรอ ฯลฯ
            │   ├── Table (orders latest)
            │   │   └── StatusOrder (select)
            │   └── Table (services latest)
            │       └── StatusService (select)
            │
            ├── AdminProducts
            │   └── ProductForm            ← Create / Edit
            │
            ├── AdminOrders
            │   └── AdminOrderItem         ← รายละเอียด + internal note
            │
            ├── AdminServices
            │   └── AdminServiceForm       ← Create / Edit นัดหมาย
            │
            └── AdminUsers
                ├── AdminUserDetail        ← ดูประวัติลูกค้า
                ├── AdminUserForm          ← Create / Edit
                └── AdminUserOrderDetail   ← ออเดอร์ของลูกค้าคนนั้น
```

### Context → Component Data Flow

```
MessageProvider (Admin Data)
    │
    ├── users[]   ──────────▶ AdminUsers, AdminUserDetail, AdminUserForm
    ├── products[] ─────────▶ AdminProducts, AdminProductForm
    ├── orders[]  ──────────▶ AdminHome, AdminOrders, AdminOrderItem
    └── services[] ─────────▶ AdminHome, AdminServices, AdminServiceForm

AuthProvider (Customer Auth)
    │
    └── user, login(), logout() ──▶ HeaderSection, LoginPage, RegisterPage
                                     UserProfilePage, CartPage

CartProvider (Cart State)
    │
    └── cartItems[], addToCart() ──▶ ProductDetailPage, CartPage
                                     CheckoutPage, HeaderSection (badge)
```

---

## 7. API Spec

### Base URL
```
Production: https://<backend-domain>/api/v1
Local:      http://localhost:8888/api/v1
```

### Response Format (Standard)
```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "error": "Error message" }
```

---

### 7.1 Users API

#### `POST /users/register`
```json
Request:  { "firstName": "สมชาย", "lastName": "ใจดี", "phone": "0812345678",
            "email": "user@example.com", "password": "secret123" }
Response: { "success": true, "data": { "_id": "...", "userNumber": 1, "email": "..." } }
```

#### `POST /users/login`
```json
Request:  { "email": "user@example.com", "password": "secret123" }
Response: { "success": true, "data": { "userNumber": 1, "role": "customer", ... } }
          + Set-Cookie: accessToken=<jwt>; HttpOnly; Secure
```

#### `POST /users/logout` — `[Auth]`
```json
Response: { "success": true, "message": "Logged out successfully" }
          + Clear-Cookie: accessToken
```

#### `GET /users/profile` — `[Auth]`
```json
Response: { "success": true, "data": { userNumber, firstName, email, role, address{}, ... } }
```

#### `PUT /users/profile` — `[Auth]`
```json
Request:  { "firstName": "...", "address": { "addressLine": "...", "province": "..." } }
Response: { "success": true, "data": { ...updated user... } }
```

#### `PATCH /users/profile/password` — `[Auth]`
```json
Request:  { "currentPassword": "old", "newPassword": "new123456" }
Response: { "success": true, "message": "Password updated successfully" }
```

#### `GET /users` — `[Auth][Staff|Admin]`
```json
Response: { "success": true, "data": [ ...users array... ] }
```

#### `PATCH /users/:id/role` — `[Auth][Admin]`
```json
Request:  { "role": "staff" }
Response: { "success": true, "data": { ...updated user... } }
```

---

### 7.2 Products API

#### `GET /products`
```json
Response: { "success": true, "data": [ ...products sorted by productNumber desc... ] }
```

#### `GET /products/number/:productNumber`
```json
Response: { "success": true, "data": { productNumber, name, sku, price, stock, ... } }
```

#### `POST /products`
```json
Request:  { "name": "Solar Panel 400W", "sku": "sp-400w", "category": "panel",
            "warranty": 10, "price": 8500, "stock": 50 }
Response: { "success": true, "data": { "productNumber": 1, ... } }
```

#### `PUT /products/:id`
```json
Request:  { "price": 7900, "stock": 45 }
Response: { "success": true, "data": { ...updated product... } }
```

#### `DELETE /products/:id`
```json
Response: { "success": true, "data": true, "message": "Product deleted successfully" }
```

---

### 7.3 Orders API

#### `GET /orders`
```json
Response: { "success": true, "data": [ ...orders sorted by orderNumber desc... ] }
```

#### `POST /orders`
```json
Request:  {
  "totalPrice": 17000,
  "paymentMethod": "bank_transfer",
  "items": [{ "productNumber": 1, "name": "Solar Panel 400W", "priceAtPurchase": 8500, "quantity": 2 }],
  "customer": { "userNumber": 5, "firstName": "สมชาย", "phone": "0812345678",
                "shippingAddress": { "addressLine": "123 ถ.สุขุมวิท", "province": "กรุงเทพฯ" } }
}
Response: { "success": true, "data": { "orderNumber": "ORD20250001", ... } }
```

#### `PATCH /orders/:id/status`
```json
Request:  { "status": "paid" }
// status: open → paid → preparing → shipping → delivered | cancelled
```

#### `PATCH /orders/:id/internal-note`
```json
Request:  { "internalNote": "ลูกค้าต้องการรับสินค้าช่วงเช้า" }
```

---

### 7.4 Services API

#### `POST /services`
```json
Request:  {
  "appointmentAt": "2025-07-15T09:00:00",
  "serviceType": "install",
  "title": "ติดตั้งแผง 10 แผ่น",
  "customer": { "firstName": "สมชาย", "phone": "0812345678",
                "serviceAddress": { "addressLine": "...", "province": "เชียงใหม่" } }
}
Response: { "success": true, "data": { "serviceNumber": "SV20250001", ... } }
```

#### `PATCH /services/:id/status`
```json
Request:  { "status": "scheduled" }
// status: request_received → scheduled → in_progress → completed | rescheduled | cancelled
```

---

### 7.5 Carts API — `[Auth]`

#### `GET /carts`
```json
Response: {
  "items": [{ "productNumber": 1, "quantity": 2, "name": "Solar Panel 400W",
               "price": 8500, "image": "https://..." }],
  "total": 17000
}
```

#### `POST /carts/add`
```json
Request:  { "productNumber": 1, "quantity": 2 }
```

#### `PUT /carts/update`
```json
Request:  { "productNumber": 1, "quantity": 3 }
```

#### `DELETE /carts/remove/:productNumber`
```json
Response: { "message": "ลบสินค้าออกจากตะกร้าสำเร็จ", "cart": { ... } }
```

---

## 8. Data Schemas / Models

### User Schema
```js
const userSchema = new mongoose.Schema({
  userNumber:      { type: Number, unique: true, immutable: true },   // Auto-increment
  firstName:       { type: String, maxlength: 200 },
  lastName:        { type: String, maxlength: 200 },
  company:         { type: String, maxlength: 200 },
  taxId:           { type: String },
  phone:           { type: String },
  phone2:          { type: String },
  email:           { type: String, unique: true, required: true, lowercase: true },
  password:        { type: String, required: true, minlength: 8, maxlength: 72, select: false },
  role:            { type: String, enum: ["customer", "staff", "admin"], default: "customer" },
  isActive:        { type: Boolean, default: true },
  address:         { label, addressLine, subdistrict, district, province, postcode },
  shippingAddress: { label, addressLine, subdistrict, district, province, postcode },
  serviceAddress:  { label, addressLine, subdistrict, district, province, postcode },
  lastLoginAt:     { type: Date }
}, { timestamps: true });

// Pre-save hooks:
// 1. Auto-increment userNumber ด้วย Counter
// 2. Hash password ด้วย bcrypt (12 rounds)
```

### Product Schema
```js
const productSchema = new mongoose.Schema({
  productNumber: { type: Number, unique: true, immutable: true },   // Auto-increment
  name:          { type: String, required: true, maxlength: 200 },
  sku:           { type: String, required: true, unique: true, lowercase: true },
  brand:         { type: String },
  category:      { type: String, required: true },
  warranty:      { type: Number, required: true },                   // ปี
  description:   { type: String, maxlength: 4000 },
  specs:         [{ label: String, value: String }],                 // สเปคสินค้า
  features:      [String],
  image:         { url: String, cloudinaryId: String },
  gallery:       [{ url: String, cloudinaryId: String }],
  tags:          [String],
  price:         { type: Number, required: true, min: 0 },
  salePrice:     { type: Number, min: 0 },
  stock:         { type: Number, required: true, min: 0 },
  stockMin:      { type: Number, min: 0 },
  isActive:      { type: Boolean, default: true }
}, { timestamps: true });
```

### Order Schema
```js
const orderSchema = new mongoose.Schema({
  orderNumber:   { type: String, unique: true, immutable: true },    // "ord20250001"
  totalPrice:    { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: ["bank_transfer", "cash", "card", "qr"] },
  status:        { type: String, enum: ["open","paid","preparing","shipping","delivered","cancelled"] },
  items: [{
    productNumber:    { type: Number, required: true },
    name:             { type: String },
    sku:              { type: String },
    priceAtPurchase:  { type: Number },                              // snapshot ราคา ณ วันสั่ง
    quantity:         { type: Number, required: true, min: 1 }
  }],
  orderNote:     { type: String },
  internalNote:  { type: String },                                   // หมายเหตุภายในสำหรับ staff
  customer: {
    userNumber, firstName, lastName, company, taxId,
    phone, phone2, email,
    shippingAddress: { label, addressLine, subdistrict, district, province, postcode }
  }
}, { timestamps: true });

// Pre-save: generate orderNumber = "ord" + year + padStart(4, "0")
```

### Service Schema
```js
const serviceSchema = new mongoose.Schema({
  serviceNumber:  { type: String, unique: true, immutable: true },   // "sv20250001"
  orderNumber:    { type: String },
  appointmentAt:  { type: String, required: true },
  serviceType:    { type: String, enum: ["install", "clean", "maintenance"], required: true },
  team:           { type: String },
  status:         { type: String, enum: ["request_received","scheduled","in_progress",
                                          "completed","rescheduled","cancelled"] },
  title:          { type: String, maxlength: 200 },
  description:    { type: String, maxlength: 4000 },
  images:         [{ url: String, cloudinaryId: String }],
  internalNote:   { type: String },
  customer: {
    userNumber, firstName, lastName, company, taxId,
    phone, phone2, email,
    serviceAddress: { label, addressLine, subdistrict, district, province, postcode }
  }
}, { timestamps: true });
```

### Cart Schema
```js
const cartSchema = new mongoose.Schema({
  userNumber: { type: Number, unique: true, immutable: true },  // 1 user = 1 cart
  items: [{
    productNumber: { type: Number, required: true },
    quantity:      { type: Number, required: true, min: 1 }
  }]
}, { timestamps: true });

// Cart Logic (Controller):
// GET  → join กับ Product collection เพื่อดึง name, price, image
// POST → upsert: ถ้ามีสินค้าแล้วให้บวกจำนวน ถ้าไม่มีให้ push ใหม่
```

### Counter Schema (Auto-increment Pattern)
```js
const counterSchema = new mongoose.Schema({
  _id: String,   // ชื่อ sequence: "user", "product", "order_2025", "service_2025"
  seq: Number    // ค่าปัจจุบัน
});

// getNextSequence("user") → findOneAndUpdate + $inc + upsert → return seq
// ทุก Schema เรียกใน pre("save") hook เพื่อ assign ID ก่อนบันทึก
```

---

## 9. How the Team Use AI to Learn and Develop Software

### บทบาทของ AI ในการพัฒนา Project

#### 1. วางแผนและออกแบบระบบ
- ใช้ AI สร้าง Business Model Canvas และอธิบายโครงสร้างธุรกิจ
- ใช้ AI แนะนำ Tech Stack ที่เหมาะสมกับ requirements
- ใช้ AI ออกแบบ Database Schema และ API Contract
- ใช้ AI เขียน Diagram ในรูปแบบ text เพื่อทำเป็น Mermaid / Excalidraw

#### 2. เรียนรู้ Concept ใหม่ผ่าน Code จริง
- ถาม AI อธิบาย Pattern เช่น HttpOnly Cookie vs localStorage, JWT Flow
- ใช้ AI อธิบาย Mongoose Schema, Middleware, Error Handler ทีละส่วน
- ให้ AI เขียน code ตัวอย่างพร้อมอธิบายว่าทำไมถึงเขียนแบบนั้น

```
ตัวอย่าง prompt ที่ใช้จริง:
"อธิบาย HttpOnly Cookie vs localStorage ว่าต่างกันยังไง
 และช่วยเขียน Express middleware สำหรับ authenticate JWT จาก Cookie"
```

#### 3. Debug และแก้ปัญหา
- Copy error message ให้ AI วิเคราะห์หาต้นเหตุ
- ให้ AI เปรียบเทียบ code ก่อน/หลังและชี้จุดที่ผิด
- ใช้ AI ตรวจสอบ edge case ที่นักพัฒนาอาจมองข้าม

#### 4. แปลง HTML Prototype → React Component
- ใช้ AI แนะนำวิธีแยก HTML page ออกเป็น Component
- ให้ AI ช่วยเขียน JSX จาก HTML ต้นฉบับพร้อม Logic

```
ตัวอย่าง: cart.html → CartPage.jsx + CartItem.jsx + OrderSummary.jsx
          payment.html → PaymentPage.jsx + PaymentOption.jsx + ModalConfirm.jsx
```

#### 5. Code Review และ Best Practices
- ให้ AI Review code ก่อน commit เพื่อหา bug และ security issue
- AI แนะนำ Pattern ที่ดีกว่า เช่น Centralized Error Handler แทน try-catch ทุก route

#### 6. เขียน API Documentation
- ใช้ AI สรุป API Spec จาก code จริง
- ให้ AI เขียน `.rest` file สำหรับทดสอบ API

### สิ่งที่ทีมเรียนรู้จากการใช้ AI

| ด้าน | สิ่งที่เรียนรู้ |
|------|---------------|
| **Security** | HttpOnly Cookie, bcrypt rounds, Helmet headers, CORS credentials |
| **Architecture** | Module-based structure, Separation of concerns, Middleware pattern |
| **React** | Context API, Custom Hooks, Component composition |
| **MongoDB** | Schema design, Pre-save hooks, Aggregation, Auto-increment pattern |
| **Express** | Centralized error handling, Rate limiting, Route versioning (/v1) |

### หลักการใช้ AI อย่างมีประสิทธิภาพ

1. **อย่า copy-paste โดยไม่เข้าใจ** — ให้ AI อธิบาย code ที่สร้างขึ้นทุกครั้ง
2. **ตรวจสอบ output เสมอ** — AI อาจเสนอ solution ที่ไม่เหมาะกับ context
3. **ใช้ AI เป็น pair programmer** — โต้ตอบ ถาม ปรับ ไม่ใช่รอคำตอบเดียว
4. **เรียน concept ผ่าน code จริง** — ให้ AI สอนแบบ hands-on ไม่ใช่แค่ทฤษฎี
5. **บันทึก pattern ที่ดี** — นำ pattern ที่ AI แนะนำมาใช้ซ้ำในส่วนอื่น

---

## Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 19 |
| | Vite | 8 |
| | React Router DOM | 7 |
| | Tailwind CSS | 4 |
| | Axios | 1.17 |
| **Backend** | Node.js (ESM) | — |
| | Express | 5 |
| | Mongoose | 9 |
| | bcrypt | 6 |
| | jsonwebtoken | 9 |
| **Database** | MongoDB Atlas | — |
| **Storage** | Cloudinary | 2 |
| **Security** | Helmet, CORS, Rate Limit | — |
| **Deploy** | Vercel (Frontend) | — |
| | Railway / Render (Backend) | — |

---

*สรุปโดย Claude Code — 11 มิถุนายน 2025*
