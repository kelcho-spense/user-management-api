## deploy your API to Azure using Azure Container Registry (ACR)
To deploy your API to Azure using Azure Container Registry (ACR), follow these steps:

- Create a Dockerfile

Add a Dockerfile to your project's root directory:
    
```Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 8000

CMD ["npm", "start"]
```

- Build the Docker image

Build the image locally:

```sh
az acr create --resource-group <resource-group> --name <acr-name> --sku Basic
```

- Log in to Azure and ACR

Log in to Azure:

```sh
az login
``` 
- Log in to your ACR:

```sh
az acr login --name <acr-name>
```
- Tag and push the image to ACR

Tag the image:

```sh
docker tag user-management-api:latest <acr-name>.azurecr.io/user-management-api:latest
```
Push the image:
    
```sh
docker push <acr-name>.azurecr.io/user-management-api:latest
```

- Deploy to Azure Container Instances

Create a container instance:

```sh
az container create \
  --resource-group <resource-group> \
  --name user-management-api \
  --image <acr-name>.azurecr.io/user-management-api:latest \
  --registry-login-server <acr-name>.azurecr.io \
  --registry-username <acr-username> \
  --registry-password <acr-password> \
  --ports 8000 \
  --environment-variables \
    NODE_ENV=PRODUCTION \
    AZURE_COSMOS_DB_ENDPOINT=<your-endpoint> \
    AZURE_COSMOS_DB_KEY=<your-key> \
    AZURE_COSMOS_DB_DATABASE_NAME=<your-db-name>
```

- Verify the deployment

Check the container's status:

```sh
az container show --resource-group <resource-group> --name user-management-api --query "instanceView.state"
```
Get the public IP address:
    
```sh
az container show --resource-group <resource-group> --name user-management-api --query "ipAddress.ip" --output tsv
```

**Replace placeholders like `<resource-group>` and `<acr-name> `with your actual resource group and ACR name.**