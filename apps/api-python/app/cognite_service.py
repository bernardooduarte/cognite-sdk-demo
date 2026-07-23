import os
from cognite.client.data_classes import AssetWrite, TimeSeriesWrite, EventWrite

USE_REAL_CDF = os.getenv("USE_REAL_CDF", "false").lower() == "true"


def _get_client():
    from .config import get_cognite_client
    return get_cognite_client()


def get_materials():
    if USE_REAL_CDF:
        return _get_client().assets.list(limit=5)
    return [
        AssetWrite(external_id="MAT-001", name='Steel Pipe 6"', description="Piping material", metadata={"category": "Piping", "unit": "meter"}),
        AssetWrite(external_id="MAT-002", name="Carbon Steel Flange", description="Fitting material", metadata={"category": "Fittings", "unit": "unit"}),
        AssetWrite(external_id="MAT-003", name='Industrial Valve 4"', description="Valve material", metadata={"category": "Valves", "unit": "unit"}),
        AssetWrite(external_id="MAT-004", name="Insulation Foam", description="Insulation material", metadata={"category": "Insulation", "unit": "kg"}),
        AssetWrite(external_id="MAT-005", name="Welding Electrode E6013", description="Consumable material", metadata={"category": "Consumables", "unit": "kg"}),
    ]


def get_clients():
    if USE_REAL_CDF:
        return _get_client().time_series.list(limit=5)
    return [
        TimeSeriesWrite(external_id="TS-CLI-001", name="Norlandia Energy - Activity", unit="orders/month", metadata={"industry": "Oil & Gas", "country": "Norway"}),
        TimeSeriesWrite(external_id="TS-CLI-002", name="Atlas Manufacturing Co. - Activity", unit="orders/month", metadata={"industry": "Manufacturing", "country": "Brazil"}),
        TimeSeriesWrite(external_id="TS-CLI-003", name="Greenfield Power - Activity", unit="orders/month", metadata={"industry": "Energy", "country": "USA"}),
    ]


def get_orders():
    if USE_REAL_CDF:
        return _get_client().events.list(limit=5)
    return [
        EventWrite(external_id="ORD-001", type="order", subtype="confirmed", description="Order for MAT-001", metadata={"clientId": "CLI-001", "materialId": "MAT-001", "quantity": "500"}, start_time=1748822400000),
        EventWrite(external_id="ORD-002", type="order", subtype="pending", description="Order for MAT-003", metadata={"clientId": "CLI-002", "materialId": "MAT-003", "quantity": "20"}, start_time=1750032000000),
        EventWrite(external_id="ORD-003", type="order", subtype="shipped", description="Order for MAT-004", metadata={"clientId": "CLI-003", "materialId": "MAT-004", "quantity": "1200"}, start_time=1750464000000),
    ]