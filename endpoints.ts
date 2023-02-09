import { addEndpoint, getSdk, ResponseError } from "@qelos/plugin-play";
import { ObjectId } from "mongodb";
import { displayData, resourceName, resourceNamePlural, routeParamKey, storedData } from "./shared/config";

const apiPrefix = "/api/" + resourceNamePlural;
const encryptedKey = process.env.RESOURCES_ENC_KEY || "managed-" + resourceNamePlural;

const resourceProps = Object.keys(storedData);
const resourcePublicProps: string[] = Object.keys(displayData);

function getPublicData(resource) {
  return resourcePublicProps.reduce((result, key) => {
    result[key] = resource[key];
    return result;
  }, { _id: resource._id });
}

function getPermittedData(data: any = {}) {
  return resourceProps.reduce((result, key) => {
    if (typeof data[key] !== "undefined") {
      result[key] = data[key];
    }
    return result;
  }, {});
}

async function getList(userId) {
  let vms;
  try {
    vms = await getSdk().users.getEncryptedData(userId, encryptedKey);
  } catch {
    return [];
  }
  return vms || [];
}

addEndpoint(apiPrefix, {
  method: "GET",
  async handler(req) {
    // @ts-ignore
    const userId = req.user._id as string;
    const items = await getList(userId);

    return items.map(getPublicData);
  }
});

addEndpoint(apiPrefix, {
  method: "POST",
  async handler(req) {
    // @ts-ignore
    const userId = req.user._id as string;
    // @ts-ignore
    const items = await getList(userId);

    const _id = new ObjectId();

    const resource = { _id, ...getPermittedData(req.body || {}) };
    items.push(resource);
    await getSdk().users.setEncryptedData(userId, encryptedKey, items);

    return getPublicData(resource);
  }
});

addEndpoint(apiPrefix + "/:" + routeParamKey, {
  method: "DELETE",
  async handler(req) {
    // @ts-ignore
    const userId = req.user._id as string;
    // @ts-ignore
    const resourceId = req.params[routeParamKey] as string;
    // @ts-ignore
    const vms = await getList(userId);

    await getSdk().users.setEncryptedData(
      userId,
      encryptedKey,
      vms.filter(({ _id }) => _id !== resourceId)
    );

    return {
      _id: resourceId
    };
  }
});

addEndpoint(apiPrefix + "/:" + routeParamKey, {
  method: "PUT",
  async handler(req) {
    // @ts-ignore
    const userId = req.user._id as string;
    // @ts-ignore
    const resourceId = req.params[routeParamKey] as string;
    const vms = await getList(userId);
    // @ts-ignore
    const body = getPermittedData(req.body || {});

    const resource = vms.find(vm => vm._id === resourceId);

    if (!resource) {
      throw new ResponseError(resourceName + " not found", 404);
    }

    Object.entries(body)
      .forEach(([key, value]) => {
        if (typeof value !== "undefined") {
          resource[key] = value;
        }
      });

    await getSdk().users.setEncryptedData(userId, encryptedKey, vms);

    return getPublicData(resource);
  }
});