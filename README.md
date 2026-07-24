# Cognite SDK Demo

A small monorepo comparing the Cognite Python SDK and the Cognite JavaScript SDK side by side, solving the exact same problem with each.

I work with Cognite Data Fusion at my job (Oil & Gas and Manufacturing clients), and wanted a side project to dig into both SDKs without touching anything client-related. The app manages three generic industrial concepts — **materials**, **clients**, and **orders** — nothing here is tied to a real company or dataset, everything is fictional and safe to share publicly.

## Table of contents

- [What it does](#what-it-does)
- [Why it's simulated instead of connected to a real CDF project](#why-its-simulated-instead-of-connected-to-a-real-cdf-project)
- [Project structure](#project-structure)
- [Running it locally](#running-it-locally)
- [Tech stack](#tech-stack)
- [Live demo](#live-demo)

## What it does

It's a React app (Material UI) with two backends behind it, one in Python and one in Node. Both expose the exact same three endpoints (`/materials`, `/clients`, `/orders`), but one is built with FastAPI + `cognite-sdk` and the other with Express + `@cognite/sdk`.

The frontend has a toggle in the top bar to switch which backend it's pulling from — watch the network tab to confirm it's really hitting a different service each time.

## Why it's simulated instead of connected to a real CDF project

I originally tried connecting both SDKs to Cognite's public Open Industrial Data project (a free dataset Cognite makes available for learning). It authenticates fine, but the shared credentials don't have read access to assets, time series, or events on that project, so every call came back with a 403.

I could have opened a support ticket to get those permissions, but I liked a different approach better: instead of faking the actual Cognite API over HTTP (which would mean reverse engineering their exact request format), I write the data directly using the real SDK classes — `AssetWrite`, `EventWrite`, `TimeSeriesWrite` on the Python side, and plain typed objects like `ExternalAssetItem` on the JS side.

Both backends have a `USE_REAL_CDF` flag:

- **Off** (the default, so the demo always works): the code builds objects locally using those SDK classes and returns them.
- **On**: it calls a real `CogniteClient` instead.

The point was never to prove I can call an API — it was to prove I understand the SDK's data model on both sides — and this way the demo runs reliably for anyone who clones it.

## Project structure

```
cognite-sdk-demo/
├── apps/
│   ├── web/         React + Vite + TypeScript + MUI frontend
│   ├── api-python/  FastAPI backend using cognite-sdk (Python)
│   └── api-node/    Express backend using @cognite/sdk (JavaScript)
├── pnpm-workspace.yaml
└── README.md
```

## Running it locally

You'll need three terminals open at once.

**Python backend**
```bash
cd apps/api-python
python -m venv .venv
.venv\Scripts\Activate.ps1   # or source .venv/bin/activate on Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Node backend**
```bash
cd apps/api-node
pnpm install
pnpm dev
```

**Frontend**
```bash
cd apps/web
pnpm install
pnpm dev
```

Then open `http://localhost:5173` and flip the toggle between the Python SDK and the JavaScript SDK.

## Tech stack

- **Frontend:** React, TypeScript, Vite, Material UI, React Router
- **Python backend:** FastAPI, cognite-sdk, python-dotenv
- **JS backend:** Express, @cognite/sdk, tsx
- **Tooling:** pnpm workspaces, deployed on Vercel

## Live demo

[[link coming after deploy]](https://cdf-demo-web.vercel.app/)
