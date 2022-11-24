# Usando un custom Docker action ya se puede utilizar cualquier lenguaje de programación
# Se usa boto3, que dispone de métodos para hacer el upload a AWS S3 Bucket
import os
import boto3
from botocore.config import Config


def run():
    # Por cada input especificado en el fichero action.yml GitHub Actions genera una variable de entorno
    # que empieza con INPUT_ y el nombre del input también en mayúsculas.
    # Así los inputs están disponibles en el código que se ejecuta en el contenedor.
    bucket = os.environ['INPUT_BUCKET']
    bucket_region = os.environ['INPUT_BUCKET-REGION']
    dist_folder = os.environ['INPUT_DIST-FOLDER']

    configuration = Config(region_name=bucket_region)

    s3_client = boto3.client('s3', config=configuration)

    for root, subdirs, files in os.walk(dist_folder):
        for file in files:
            s3_client.upload_file(os.path.join(root, file), bucket, file)

    # Aquí se configura el output del action
    website_url = f'http://{bucket}.s3-website-{bucket_region}.amazonaws.com'
    print(f'::set-output name=website-url::{website_url}')


if __name__ == '__main__':
    run()
