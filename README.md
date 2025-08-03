# Personalized Horoscope API

A Node.js backend service that generates personalized daily horoscopes based on zodiac signs.

## Features Implemented ✅

- **User Authentication**: JWT-based signup/login
- **Auto Zodiac Detection**: Calculates zodiac sign from birthdate
- **Daily Horoscope**: GET /horoscope/today with caching
- **History API**: GET /horoscope/history (last 7 days)
- **Rate Limiting**: 5 requests per minute
- **Data Persistence**: PostgreSQL with TypeORM

## Quick Start

### Prerequisites

- Node.js 16+
- PostgreSQL running locally

### Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Run the server
npm run dev
```
