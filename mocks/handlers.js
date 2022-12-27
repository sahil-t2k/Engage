// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/api/signin/user', (req, res, ctx) => {
   return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({"id": "user0019", "name": "Client Engage", "email": "client@engage.com", "password": "$2a$10$ncupFPMMHJN.ECjgeLiyruWZsKcsVLUUMuIQLVnFtW7jyjZ33AH7O", "salt": "$2a$10$ncupFPMMHJN.ECjgeLiyru", "user_type": 2})
    )
  }),

  // Handles a GET /user request
  rest.get('/user', null),
]