# Pokedex Production Deployment

This setup deploys the Pokedex API and frontend on Render, then connects the live demo to your portfolio project card.

## 1) Deploy both services with Blueprint

1. Push this repo to GitHub.
2. In Render, click New + and select Blueprint.
3. Choose this repository.
4. Render reads `render.yaml` at repo root and creates:
   - `pokedex-api`
   - `pokedex-frontend`

## 2) Configure environment values

Set these values in Render:

### Service: `pokedex-api`
- `CORS_ORIGINS`
  - `https://<your-pokedex-frontend-domain>`

### Service: `pokedex-frontend`
- `REACT_APP_API_URL`
  - `https://<your-pokedex-api-domain>`

Redeploy both services after setting vars.

## 3) Wire live demo into portfolio

In the portfolio app environment, set:

- `REACT_APP_POKEDEX_DEMO_URL=https://<your-pokedex-frontend-domain>`

For local testing, copy `portfolio/.env.example` to `portfolio/.env` and set the value.

## 4) Verify

1. Open your portfolio Projects section.
2. Confirm the Pokedex iframe appears.
3. Confirm Launch Live Demo opens your deployed frontend.
4. In the deployed Pokedex app, verify API-backed pages load.

## Notes

- Backend defaults are in `portfolio/Projects/Pokedex/backend/.env.example`.
- If CORS fails, ensure the frontend origin exactly matches one of the comma-separated values in `CORS_ORIGINS`.
