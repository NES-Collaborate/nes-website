import { Property } from "@/types/entities"
import { AxiosInstance } from "axios"

export const fetchBens = async (
  client: AxiosInstance,
  q: string
): Promise<Property[]> => {
  const res = await client.get("/admin/property", {
    params: {
      q,
    },
  })
  return res.data.properties
}

export const createProperty = async (
  client: AxiosInstance,
  property: Omit<Property, "id">
): Promise<Property> => {
  const res = await client.post("/admin/property", property)
  return res.data.property
}

export const updateProperty = async (
  client: AxiosInstance,
  property: Property
): Promise<Property> => {
  const res = await client.put(`/admin/property/${property.id}`, property)
  return res.data.property
}

export const deleteProperty = async (
  client: AxiosInstance,
  propertyId: number
): Promise<void> => {
  await client.delete(`/admin/property/${propertyId}`)
}
