import os
from dotenv import load_dotenv
from cognite.client import CogniteClient, ClientConfig
from cognite.client.credentials import OAuthClientCredentials

load_dotenv()


def get_cognite_client() -> CogniteClient:
    tenant_id = os.environ["CDF_TENANT_ID"]
    client_id = os.environ["CDF_CLIENT_ID"]
    client_secret = os.environ["CDF_CLIENT_SECRET"]
    project = os.environ["CDF_PROJECT"]
    cluster = os.environ["CDF_CLUSTER"]
    base_url = f"https://{cluster}.cognitedata.com"

    creds = OAuthClientCredentials(
        token_url=f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token",
        client_id=client_id,
        client_secret=client_secret,
        scopes=[f"{base_url}/.default"],
    )
    cnf = ClientConfig(
        client_name="cognite-sdk-demo-python",
        project=project,
        credentials=creds,
        base_url=base_url,
    )
    return CogniteClient(cnf)