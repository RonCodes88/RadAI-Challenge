# --- Unit tests below ---

import pytest
from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_search_by_applicant():
    resp = client.get("/search/applicant", params={"name": "sisig"})
    assert resp.status_code == 200
    data = resp.json()
    assert any("Sisig" in t["Applicant"] for t in data)

def test_search_by_applicant_with_status():
    resp = client.get("/search/applicant", params={"name": "sisig", "status": "APPROVED"})
    assert resp.status_code == 200
    data = resp.json()
    assert all(t["Status"] == "APPROVED" for t in data)

def test_search_by_street():
    resp = client.get("/search/street", params={"street": "SANSOME"})
    assert resp.status_code == 200
    data = resp.json()
    assert any("SANSOME" in t["Address"].upper() for t in data)

def test_search_nearest_default():
    resp = client.get("/search/nearest", params={"lat": 37.78, "lon": -122.40})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) <= 5
    assert all(t["Status"] == "APPROVED" for t in data)

def test_search_nearest_all_status():
    resp = client.get("/search/nearest", params={"lat": 37.78, "lon": -122.40, "status": ""})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) <= 5