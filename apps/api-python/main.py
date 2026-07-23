from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.cognite_service import get_materials, get_clients, get_orders

app = FastAPI(title="Cognite SDK Demo - Python API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/materials")
def materials():
    return [a.dump(camel_case=True) for a in get_materials()]


@app.get("/clients")
def clients():
    return [t.dump(camel_case=True) for t in get_clients()]


@app.get("/orders")
def orders():
    return [e.dump(camel_case=True) for e in get_orders()]