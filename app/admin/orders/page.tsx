"use client"

import useSWR from "swr"
import OrderCard from "@/components/order/OrderCard"
import Heading from "@/components/ui/Heading"
import { OrderWithProducts } from "@/src/types"
import { useEffect } from "react"

export default function Page() {
  const url = "/admin/orders/api"
  const fetcher = () => fetch(url).then(res => res.json())
  const { data, error, isLoading, mutate } = useSWR<OrderWithProducts[]>(url, fetcher, {
    revalidateOnFocus: false
  })

  useEffect(() => {
    const channel = new BroadcastChannel("order-channel")

    channel.onmessage = (event) => {
      if (event.data === "new-order") {
        mutate()
      }
    }

    return () => channel.close()
  }, [mutate])

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>
  if (error) return <p className="text-center mt-10 text-red-500">Error al cargar órdenes</p>

  if(data) return (
    <>
      <Heading>Administrar Órdenes</Heading>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map(order => (
            <OrderCard key={order.id} order={order} mutate={mutate} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No hay órdenes pendientes.</p>
      )}
    </>
  )
}
