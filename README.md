# KHOUNKHAM ENERGY — Company Profile Website

Full-stack company profile website for **KHOUNKHAM ENERGY SOLE CO., LTD** (ບໍລິສັດ ຄູນຄໍາ ພະລັງງານ ຈຳກັດຜູ້ດຽວ).

## Tech Stack

- **Frontend:** Nuxt 3 + Vue 3 + TailwindCSS + i18n (Lao/English/Chinese)
- **Backend:** Express + Apollo Server (GraphQL) + TypeORM + MySQL
- **DevOps:** Docker Compose + Nginx + GitHub Actions

## Quick Start

### With Docker (recommended)

```bash
docker-compose up --build
```

Visit: `http://localhost`

### Manual Development

**Backend:**
```bash
cd backend
npm install
# Make sure MySQL is running with the config in .env
npm run dev
# Seed initial data:
npm run seed
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Admin Access

- URL: `/admin/login`
- Default credentials: `admin` / `admin123`

## API

- REST: `http://localhost:4000/api/v1/*`
- GraphQL: `http://localhost:4000/graphql`

## Project Structure

```
├── frontend/          # Nuxt 3
├── backend/           # Express + Apollo + TypeORM
├── nginx/             # Reverse proxy config
├── docker-compose.yml
└── .github/workflows/ # CI/CD
```
