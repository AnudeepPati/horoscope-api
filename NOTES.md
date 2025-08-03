
---

```md
# 📘 Design Decisions

## TypeORM vs Prisma
- TypeORM chosen for its native decorator support and ease of use with TypeScript.
- `synchronize: true` enabled for rapid development (to be disabled in production).

## Horoscope Generation
- Generated using hardcoded messages with consistent daily results via date-seeded selection.
- Avoided external APIs for simplicity, speed, and reliability in demo context.

## JWT Auth
- Stateless and scalable.
- Token contains `userId` and `email`; expires in 24 hours.

## Rate Limiting
- `express-rate-limit` used to cap requests at 5/min per user.
- Prevents abuse while maintaining user experience.

---

# 🛠️ Improvements With More Time

### Short-Term
- Input validation with Joi or Yup
- Full test coverage with Jest
- Swagger-based API documentation
- Error handling middleware

### Production Readiness
- Replace mock data with real horoscope API
- Redis for caching frequent lookups
- Docker + CI/CD pipeline
- Logging with Winston or Pino
- Secure secret handling with Vault

---

# 📈 Scaling for Personalized Horoscopes

To move from generic zodiac-based to **personalized** horoscopes:

## Data Collection
- Capture user-specific metadata (interests, preferences, life events)

## Content Engine
- Use NLP + AI models to generate customized horoscopes
- Maintain tone/personality consistency per user

## Infrastructure
- Precompute daily horoscopes for active users
- Use Redis or edge caching for response speed
- Deploy a microservice for content generation
- Introduce time-series DB for behavioral insights

---